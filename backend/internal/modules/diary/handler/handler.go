package handler

import (
	"context"
	"net/http"
	"strconv"

	"backend/internal/modules/diary/domain"
	"backend/internal/modules/diary/repository"
	"backend/internal/modules/diary/service"

	"github.com/cloudwego/hertz/pkg/app"
)

type DiaryHandler struct {
	svc *service.DiaryService
}

func NewDiaryHandler() *DiaryHandler {
	repo := repository.NewPostgresDiaryRepository()
	svc := service.NewDiaryService(repo)
	return &DiaryHandler{svc: svc}
}

func (h *DiaryHandler) GetDiaries(c context.Context, ctx *app.RequestContext) {
	isAuth := ctx.GetBool("isAuthenticated") // Set by JWT middleware

	entries, err := h.svc.GetAllDiaries(c, isAuth)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, entries)
}

func (h *DiaryHandler) GetDiary(c context.Context, ctx *app.RequestContext) {
	slug := ctx.Param("slug")
	entry, err := h.svc.GetDiaryBySlug(c, slug)
	if err != nil {
		ctx.JSON(http.StatusNotFound, map[string]string{"error": "Diary entry not found"})
		return
	}
	ctx.JSON(http.StatusOK, entry)
}

func (h *DiaryHandler) CreateDiary(c context.Context, ctx *app.RequestContext) {
	var entry domain.DiaryEntry
	if err := ctx.BindAndValidate(&entry); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateDiary(c, &entry); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, entry)
}

func (h *DiaryHandler) UpdateDiary(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var entry domain.DiaryEntry
	if err := ctx.BindAndValidate(&entry); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateDiary(c, uint(id), &entry); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, entry)
}

func (h *DiaryHandler) DeleteDiary(c context.Context, ctx *app.RequestContext) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteDiary(c, uint(id)); err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, map[string]string{"message": "Diary deleted"})
}
