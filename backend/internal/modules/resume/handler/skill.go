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

type SkillHandler struct {
	svc *service.SkillService
}

func NewSkillHandler() *SkillHandler {
	repo := repository.NewPostgresSkillRepository()
	svc := service.NewSkillService(repo)
	return &SkillHandler{svc: svc}
}

func (h *SkillHandler) GetSkills(c context.Context, ctx *app.RequestContext) {
	skills, err := h.svc.GetAllSkills(c)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, skills)
}

func (h *SkillHandler) CreateSkill(c context.Context, ctx *app.RequestContext) {
	var skill domain.Skill
	if err := ctx.BindAndValidate(&skill); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateSkill(c, &skill); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, skill)
}

func (h *SkillHandler) UpdateSkill(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var skill domain.Skill
	if err := ctx.BindAndValidate(&skill); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateSkill(c, uint(id), &skill); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, skill)
}

func (h *SkillHandler) DeleteSkill(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteSkill(c, uint(id)); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, map[string]string{"message": "Skill deleted"})
}
