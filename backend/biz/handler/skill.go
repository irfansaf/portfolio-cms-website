package handler

import (
	"backend/biz/dal/model"
	"backend/biz/service"
	"context"
	"net/http"
	"strconv"

	"github.com/cloudwego/hertz/pkg/app"
)

type SkillHandler struct {
	svc *service.SkillService
}

func NewSkillHandler() *SkillHandler {
	return &SkillHandler{svc: service.NewSkillService()}
}

func (h *SkillHandler) GetSkills(ctx context.Context, c *app.RequestContext) {
	skills, err := h.svc.GetAllSkills()
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, skills)
}

func (h *SkillHandler) CreateSkill(ctx context.Context, c *app.RequestContext) {
	var skill model.Skill
	if err := c.BindAndValidate(&skill); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateSkill(&skill); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, skill)
}

func (h *SkillHandler) UpdateSkill(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var skill model.Skill
	if err := c.BindAndValidate(&skill); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateSkill(uint(id), &skill); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, skill)
}

func (h *SkillHandler) DeleteSkill(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteSkill(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, map[string]string{"message": "Skill deleted"})
}
