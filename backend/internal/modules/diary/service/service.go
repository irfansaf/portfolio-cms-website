package service

import (
	"backend/internal/modules/diary/domain"
	"backend/internal/modules/diary/port"
	"context"
)

type DiaryService struct {
	repo port.DiaryRepository
}

func NewDiaryService(repo port.DiaryRepository) *DiaryService {
	return &DiaryService{repo: repo}
}

func (s *DiaryService) CreateDiary(ctx context.Context, entry *domain.DiaryEntry) error {
	return s.repo.Create(ctx, entry)
}

func (s *DiaryService) GetAllDiaries(ctx context.Context, includePrivate bool) ([]domain.DiaryEntry, error) {
	return s.repo.FindAll(ctx, includePrivate)
}

func (s *DiaryService) GetDiaryBySlug(ctx context.Context, slug string) (*domain.DiaryEntry, error) {
	return s.repo.FindBySlug(ctx, slug)
}

func (s *DiaryService) UpdateDiary(ctx context.Context, id uint, input *domain.DiaryEntry) error {
	entry, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}

	entry.Slug = input.Slug
	entry.Title = input.Title
	entry.Excerpt = input.Excerpt
	entry.Content = input.Content
	entry.Date = input.Date
	entry.Visibility = input.Visibility

	return s.repo.Update(ctx, entry)
}

func (s *DiaryService) DeleteDiary(ctx context.Context, id uint) error {
	return s.repo.Delete(ctx, id)
}
