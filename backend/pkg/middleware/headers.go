package middleware

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"
)

func SecurityHeaders() app.HandlerFunc {
	return func(c context.Context, ctx *app.RequestContext) {
		ctx.Header("X-Content-Type-Options", "nosniff")
		ctx.Header("X-Frame-Options", "DENY")
		ctx.Header("X-XSS-Protection", "1; mode=block")
		ctx.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		ctx.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		ctx.Header("Content-Security-Policy", "default-src 'self';")

		ctx.Next(c)
	}
}
