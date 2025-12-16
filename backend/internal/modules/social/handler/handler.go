package handler

import (
	"context"
	"net/http"
	"strconv"

	"backend/internal/modules/social/domain"
	"backend/internal/modules/social/repository"
	"backend/internal/modules/social/service"

	"github.com/cloudwego/hertz/pkg/app"
)

type SocialLinkHandler struct {
	svc *service.SocialLinkService
}

func NewSocialLinkHandler() *SocialLinkHandler {
	repo := repository.NewPostgresSocialLinkRepository()
	svc := service.NewSocialLinkService(repo)
	return &SocialLinkHandler{svc: svc}
}

func (h *SocialLinkHandler) GetSocialLinks(c context.Context, ctx *app.RequestContext) {
	links, err := h.svc.GetAllSocialLinks(c)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, links)
}

func (h *SocialLinkHandler) CreateSocialLink(c context.Context, ctx *app.RequestContext) {
	var link domain.SocialLinkGorm
	if err := ctx.BindAndValidate(&link); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateSocialLink(c, &link); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, link)
}

func (h *SocialLinkHandler) UpdateSocialLink(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var link domain.SocialLinkGorm
	if err := ctx.BindAndValidate(&link); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateSocialLink(c, uint(id), &link); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, link)
}

func (h *SocialLinkHandler) DeleteSocialLink(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteSocialLink(c, uint(id)); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, map[string]string{"message": "Social link deleted"})
}
