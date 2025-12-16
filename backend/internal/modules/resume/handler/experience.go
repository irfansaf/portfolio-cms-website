package handler

import (
	"context"
	"net/http"
	"strconv"

	"backend/internal/modules/resume/domain"
	"backend/internal/modules/resume/repository"
	"backend/internal/modules/resume/service"

	"github.com/cloudwego/hertz/pkg/app"
)

type ExperienceHandler struct {
	svc *service.ExperienceService
}

func NewExperienceHandler() *ExperienceHandler {
	repo := repository.NewPostgresExperienceRepository()
	svc := service.NewExperienceService(repo)
	return &ExperienceHandler{svc: svc}
}

func (h *ExperienceHandler) GetExperiences(c context.Context, ctx *app.RequestContext) {
	exps, err := h.svc.GetAllExperiences(c)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, exps)
}

func (h *ExperienceHandler) CreateExperience(c context.Context, ctx *app.RequestContext) {
	var exp domain.Experience
	if err := ctx.BindAndValidate(&exp); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateExperience(c, &exp); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, exp)
}

func (h *ExperienceHandler) UpdateExperience(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var exp domain.Experience
	if err := ctx.BindAndValidate(&exp); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateExperience(c, uint(id), &exp); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, exp)
}

func (h *ExperienceHandler) DeleteExperience(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteExperience(c, uint(id)); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, map[string]string{"message": "Experience deleted"})
}
