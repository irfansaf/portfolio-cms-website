package handler

import (
	"context"
	"net/http"

	"backend/internal/modules/auth/service"
	"backend/internal/modules/system/repository"
	systemService "backend/internal/modules/system/service"
	userRepo "backend/internal/modules/user/repository"

	"github.com/cloudwego/hertz/pkg/app"
)

type SystemHandler struct {
	svc *systemService.SystemService
}

func NewSystemHandler() *SystemHandler {
	// Wiring
	sysRepo := repository.NewPostgresSystemRepository()
	usrRepo := userRepo.NewPostgresUserRepository()
	authSvc := service.NewAuthService(usrRepo)
	svc := systemService.NewSystemService(sysRepo, usrRepo, authSvc)

	return &SystemHandler{svc: svc}
}

func (h *SystemHandler) GetStatus(c context.Context, ctx *app.RequestContext) {
	status, err := h.svc.GetStatus(c)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, status)
}

type SetupRequest struct {
	SiteName string `json:"site_name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *SystemHandler) Setup(c context.Context, ctx *app.RequestContext) {
	var req SetupRequest
	if err := ctx.BindAndValidate(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.Setup(c, req.SiteName, req.Username, req.Email, req.Password); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, map[string]string{"message": "System setup complete"})
}
