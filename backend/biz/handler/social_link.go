package handler

import (
	"backend/biz/dal/model"
	"backend/biz/service"
	"context"
	"net/http"
	"strconv"

	"github.com/cloudwego/hertz/pkg/app"
)

type SocialLinkHandler struct {
	svc *service.SocialLinkService
}

func NewSocialLinkHandler() *SocialLinkHandler {
	return &SocialLinkHandler{svc: service.NewSocialLinkService()}
}

func (h *SocialLinkHandler) GetSocialLinks(ctx context.Context, c *app.RequestContext) {
	links, err := h.svc.GetAllSocialLinks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, links)
}

func (h *SocialLinkHandler) CreateSocialLink(ctx context.Context, c *app.RequestContext) {
	var link model.SocialLink
	if err := c.BindAndValidate(&link); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateSocialLink(&link); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, link)
}

func (h *SocialLinkHandler) UpdateSocialLink(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var link model.SocialLink
	if err := c.BindAndValidate(&link); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateSocialLink(uint(id), &link); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, link)
}

func (h *SocialLinkHandler) DeleteSocialLink(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteSocialLink(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, map[string]string{"message": "Social link deleted"})
}
