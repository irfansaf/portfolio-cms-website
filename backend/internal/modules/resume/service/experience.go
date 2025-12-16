package service

import (
	"backend/internal/modules/resume/domain"
	"backend/internal/modules/resume/port"
	"context"
)

type ExperienceService struct {
	repo port.ExperienceRepository
}

func NewExperienceService(repo port.ExperienceRepository) *ExperienceService {
	return &ExperienceService{repo: repo}
}

func (s *ExperienceService) GetAllExperiences(ctx context.Context) ([]domain.Experience, error) {
	return s.repo.FindAll(ctx)
}

func (s *ExperienceService) CreateExperience(ctx context.Context, exp *domain.Experience) error {
	return s.repo.Create(ctx, exp)
}

func (s *ExperienceService) UpdateExperience(ctx context.Context, id uint, exp *domain.Experience) error {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	exp.ID = existing.ID
	return s.repo.Update(ctx, exp)
}

func (s *ExperienceService) DeleteExperience(ctx context.Context, id uint) error {
	return s.repo.Delete(ctx, id)
}
