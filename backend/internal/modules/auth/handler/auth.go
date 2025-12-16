package handler

import (
	"context"

	"backend/internal/modules/auth/service"
	userRepo "backend/internal/modules/user/repository"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
)

type AuthHandler struct {
	svc *service.AuthService
}

func NewAuthHandler() *AuthHandler {
	// Dependency Injection (Manual for now)
	repo := userRepo.NewPostgresUserRepository()
	svc := service.NewAuthService(repo)

	return &AuthHandler{
		svc: svc,
	}
}

type RegisterRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *AuthHandler) Register(c context.Context, ctx *app.RequestContext) {
	var req RegisterRequest
	if err := ctx.BindAndValidate(&req); err != nil {
		ctx.JSON(consts.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.Register(c, req.Username, req.Email, req.Password); err != nil {
		ctx.JSON(consts.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	ctx.JSON(consts.StatusCreated, map[string]string{"message": "User registered successfully"})
}

func (h *AuthHandler) Login(c context.Context, ctx *app.RequestContext) {
	var req LoginRequest
	if err := ctx.BindAndValidate(&req); err != nil {
		ctx.JSON(consts.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	token, err := h.svc.Login(c, req.Email, req.Password)
	if err != nil {
		ctx.JSON(consts.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	ctx.JSON(consts.StatusOK, map[string]string{"token": token})
}
