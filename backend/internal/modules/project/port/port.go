package port

import (
	"backend/internal/modules/project/domain"
	"context"
)

type ProjectRepository interface {
	Create(ctx context.Context, project *domain.Project) error
	FindAll(ctx context.Context) ([]domain.Project, error)
	FindBySlug(ctx context.Context, slug string) (*domain.Project, error)
	FindByID(ctx context.Context, id uint) (*domain.Project, error)
	Update(ctx context.Context, project *domain.Project) error
	Delete(ctx context.Context, id uint) error
}
