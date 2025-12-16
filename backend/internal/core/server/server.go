package server

import (
	"backend/internal/core/server/middleware"

	"github.com/cloudwego/hertz/pkg/app/server"
	"github.com/hertz-contrib/cors"
	"github.com/hertz-contrib/gzip"
)

func NewServer() *server.Hertz {
	h := server.Default(server.WithHostPorts(":8888"))

	// Middleware
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

	return h
}
