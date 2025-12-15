package main

import (
	"context"
	"fmt"

	"backend/biz/dal/pg"
	"backend/biz/router"
	"backend/pkg/configs"
	"backend/pkg/middleware"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/app/server"
	"github.com/cloudwego/hertz/pkg/common/utils"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
	"github.com/hertz-contrib/cors"
	"github.com/hertz-contrib/gzip"
)

func main() {
	// 1. Load Env
	configs.Init()

	// 2. Init DB
	pg.Init()

	// 3. Init Hertz
	h := server.Default(server.WithHostPorts(":8888"))

	// 4. Middleware
	h.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"}, // Allow frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	h.Use(gzip.Gzip(gzip.DefaultCompression))
	h.Use(middleware.SecurityHeaders())
	h.Use(middleware.RateLimiter())

	// 5. Routes
	h.GET("/ping", func(c context.Context, ctx *app.RequestContext) {
		ctx.JSON(consts.StatusOK, utils.H{"message": "pong"})
	})

	router.Register(h)

	// 6. Spin up
	fmt.Println("Server running on http://localhost:8888")
	h.Spin()
}
