package repository

import (
	"backend/internal/core/db"
	"backend/internal/modules/project/domain"
	"backend/internal/modules/project/port"
	"context"
)

type PostgresProjectRepository struct{}

var _ port.ProjectRepository = (*PostgresProjectRepository)(nil)

func NewPostgresProjectRepository() *PostgresProjectRepository {
	return &PostgresProjectRepository{}
}

func (r *PostgresProjectRepository) Create(ctx context.Context, project *domain.Project) error {
	return db.DB.WithContext(ctx).Create(project).Error
}

func (r *PostgresProjectRepository) FindAll(ctx context.Context) ([]domain.Project, error) {
	var projects []domain.Project
	err := db.DB.WithContext(ctx).Order("created_at desc").Find(&projects).Error
	return projects, err
}

func (r *PostgresProjectRepository) FindBySlug(ctx context.Context, slug string) (*domain.Project, error) {
	var project domain.Project
	err := db.DB.WithContext(ctx).Where("slug = ?", slug).First(&project).Error
	return &project, err
}

func (r *PostgresProjectRepository) FindByID(ctx context.Context, id uint) (*domain.Project, error) {
	var project domain.Project
	err := db.DB.WithContext(ctx).First(&project, id).Error
	return &project, err
}

func (r *PostgresProjectRepository) Update(ctx context.Context, project *domain.Project) error {
	return db.DB.WithContext(ctx).Save(project).Error
}

func (r *PostgresProjectRepository) Delete(ctx context.Context, id uint) error {
	return db.DB.WithContext(ctx).Delete(&domain.Project{}, id).Error
}
