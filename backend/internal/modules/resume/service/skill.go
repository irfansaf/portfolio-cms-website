package service

import (
	"backend/internal/modules/resume/domain"
	"backend/internal/modules/resume/port"
	"context"
)

type SkillService struct {
	repo port.SkillRepository
}

func NewSkillService(repo port.SkillRepository) *SkillService {
	return &SkillService{repo: repo}
}

func (s *SkillService) GetAllSkills(ctx context.Context) ([]domain.Skill, error) {
	return s.repo.FindAll(ctx)
}

func (s *SkillService) CreateSkill(ctx context.Context, skill *domain.Skill) error {
	return s.repo.Create(ctx, skill)
}

func (s *SkillService) UpdateSkill(ctx context.Context, id uint, skill *domain.Skill) error {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	skill.ID = existing.ID
	return s.repo.Update(ctx, skill)
}

func (s *SkillService) DeleteSkill(ctx context.Context, id uint) error {
	return s.repo.Delete(ctx, id)
}
