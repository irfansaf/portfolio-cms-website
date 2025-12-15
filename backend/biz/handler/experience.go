package handler

import (
	"backend/biz/dal/model"
	"backend/biz/service"
	"context"
	"net/http"
	"strconv"

	"github.com/cloudwego/hertz/pkg/app"
)

type ExperienceHandler struct {
	svc *service.ExperienceService
}

func NewExperienceHandler() *ExperienceHandler {
	return &ExperienceHandler{svc: service.NewExperienceService()}
}

func (h *ExperienceHandler) GetExperiences(ctx context.Context, c *app.RequestContext) {
	exps, err := h.svc.GetAllExperiences()
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, exps)
}

func (h *ExperienceHandler) CreateExperience(ctx context.Context, c *app.RequestContext) {
	var exp model.Experience
	if err := c.BindAndValidate(&exp); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateExperience(&exp); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, exp)
}

func (h *ExperienceHandler) UpdateExperience(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var exp model.Experience
	if err := c.BindAndValidate(&exp); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateExperience(uint(id), &exp); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, exp)
}

func (h *ExperienceHandler) DeleteExperience(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteExperience(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, map[string]string{"message": "Experience deleted"})
}
