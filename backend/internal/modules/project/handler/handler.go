package handler

import (
	"context"
	"net/http"
	"strconv"

	"backend/internal/modules/project/domain"
	"backend/internal/modules/project/repository"
	"backend/internal/modules/project/service"

	"github.com/cloudwego/hertz/pkg/app"
)

type ProjectHandler struct {
	svc *service.ProjectService
}

func NewProjectHandler() *ProjectHandler {
	repo := repository.NewPostgresProjectRepository()
	svc := service.NewProjectService(repo)
	return &ProjectHandler{svc: svc}
}

func (h *ProjectHandler) GetProjects(c context.Context, ctx *app.RequestContext) {
	projects, err := h.svc.GetAllProjects(c)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) GetProject(c context.Context, ctx *app.RequestContext) {
	slug := ctx.Param("slug")
	project, err := h.svc.GetProjectBySlug(c, slug)
	if err != nil {
		ctx.JSON(http.StatusNotFound, map[string]string{"error": "Project not found"})
		return
	}
	ctx.JSON(http.StatusOK, project)
}

func (h *ProjectHandler) CreateProject(c context.Context, ctx *app.RequestContext) {
	var project domain.Project
	if err := ctx.BindAndValidate(&project); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	// TODO: Handle BeforeCreate hook equivalent if not implicit in GORM or Service
	if err := h.svc.CreateProject(c, &project); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, project)
}

func (h *ProjectHandler) UpdateProject(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var project domain.Project
	if err := ctx.BindAndValidate(&project); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateProject(c, uint(id), &project); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, project)
}

func (h *ProjectHandler) DeleteProject(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteProject(c, uint(id)); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, map[string]string{"message": "Project deleted"})
}
