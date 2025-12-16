package middleware

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"
	"golang.org/x/time/rate"
)

func RateLimiter() app.HandlerFunc {
	// 1000 requests per minute
	// rate.Limit is types as tokens per second.
	// 1000 req/min = 16.66 req/sec
	limiter := rate.NewLimiter(rate.Limit(1000.0/60.0), 50)

	return func(c context.Context, ctx *app.RequestContext) {
		if !limiter.Allow() {
			ctx.AbortWithMsg("Too Many Requests", 429)
			return
		}
		ctx.Next(c)
	}
}
