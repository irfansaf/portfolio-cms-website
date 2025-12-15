package handler

import (
	"backend/biz/dal/model"
	"backend/biz/service"
	"context"
	"net/http"
	"strconv"

	"github.com/cloudwego/hertz/pkg/app"
)

type DiaryHandler struct {
	svc *service.DiaryService
}

func NewDiaryHandler() *DiaryHandler {
	return &DiaryHandler{svc: service.NewDiaryService()}
}

func (h *DiaryHandler) GetDiaries(ctx context.Context, c *app.RequestContext) {
	// Check if user is authenticated to decide visibility
	// For now, we assume public access unless '/admin' path or auth middleware check (simplified here)
	isAuth := c.GetBool("isAuthenticated") // Set by JWT middleware if present

	entries, err := h.svc.GetAllDiaries(isAuth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, entries)
}

func (h *DiaryHandler) GetDiary(ctx context.Context, c *app.RequestContext) {
	slug := c.Param("slug")
	entry, err := h.svc.GetDiaryBySlug(slug)
	if err != nil {
		c.JSON(http.StatusNotFound, map[string]string{"error": "Diary entry not found"})
		return
	}
	c.JSON(http.StatusOK, entry)
}

func (h *DiaryHandler) CreateDiary(ctx context.Context, c *app.RequestContext) {
	var entry model.DiaryEntry
	if err := c.BindAndValidate(&entry); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}
	if err := h.svc.CreateDiary(&entry); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, entry)
}

func (h *DiaryHandler) UpdateDiary(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}

	var entry model.DiaryEntry
	if err := c.BindAndValidate(&entry); err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	if err := h.svc.UpdateDiary(uint(id), &entry); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, entry)
}

func (h *DiaryHandler) DeleteDiary(ctx context.Context, c *app.RequestContext) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
		return
	}
	if err := h.svc.DeleteDiary(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, map[string]string{"message": "Diary deleted"})
}
