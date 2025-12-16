package port

import (
	"backend/internal/modules/resume/domain"
	"context"
)

type ExperienceRepository interface {
	Create(ctx context.Context, exp *domain.Experience) error
	FindAll(ctx context.Context) ([]domain.Experience, error)
	FindByID(ctx context.Context, id uint) (*domain.Experience, error)
	Update(ctx context.Context, exp *domain.Experience) error
	Delete(ctx context.Context, id uint) error
}

type SkillRepository interface {
	Create(ctx context.Context, skill *domain.Skill) error
	FindAll(ctx context.Context) ([]domain.Skill, error)
	FindByID(ctx context.Context, id uint) (*domain.Skill, error)
	Update(ctx context.Context, skill *domain.Skill) error
	Delete(ctx context.Context, id uint) error
}
