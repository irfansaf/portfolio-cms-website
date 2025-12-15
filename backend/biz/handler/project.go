package handler

import (
	"backend/biz/dal/model"
	"backend/biz/service"
	"context"
	"net/http"
	"strconv"

	"github.com/cloudwego/hertz/pkg/app"
)

type ProjectHandler struct {
	svc *service.ProjectService
}

func NewProjectHandler() *ProjectHandler {
	return &ProjectHandler{svc: service.NewProjectService()}
}

func (h *ProjectHandler) GetProjects(ctx context.Context, c *app.RequestContext) {
	projects, err := h.svc.GetAllProjects()
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) GetProject(ctx context.Context, c *app.RequestContext) {
	slug := c.Param("slug")
	project, err := h.svc.GetProjectBySlug(slug)
	if err != nil {
		c.JSON(http.StatusNotFound, map[string]string{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, project)
}

func (h *ProjectHandler) CreateProject(ctx context.Context, c *app.RequestContext) {
	var project model.Project
	if err := c.BindAndValidate(&project); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateProject(&project); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, project)
}

func (h *ProjectHandler) UpdateProject(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var project model.Project
	if err := c.BindAndValidate(&project); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateProject(uint(id), &project); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, project)
}

func (h *ProjectHandler) DeleteProject(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteProject(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, map[string]string{"message": "Project deleted"})
}
