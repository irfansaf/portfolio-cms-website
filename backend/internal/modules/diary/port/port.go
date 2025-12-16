package port

import (
	"backend/internal/modules/diary/domain"
	"context"
)

type DiaryRepository interface {
	Create(ctx context.Context, entry *domain.DiaryEntry) error
	FindAll(ctx context.Context, includePrivate bool) ([]domain.DiaryEntry, error)
	FindBySlug(ctx context.Context, slug string) (*domain.DiaryEntry, error)
	FindByID(ctx context.Context, id uint) (*domain.DiaryEntry, error)
	Update(ctx context.Context, entry *domain.DiaryEntry) error
	Delete(ctx context.Context, id uint) error
}
