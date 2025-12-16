package repository

import (
	"backend/internal/core/db"
	"backend/internal/modules/resume/domain"
	"backend/internal/modules/resume/port"
	"context"
)

type PostgresExperienceRepository struct{}

var _ port.ExperienceRepository = (*PostgresExperienceRepository)(nil)

func NewPostgresExperienceRepository() *PostgresExperienceRepository {
	return &PostgresExperienceRepository{}
}

func (r *PostgresExperienceRepository) Create(ctx context.Context, exp *domain.Experience) error {
	return db.DB.WithContext(ctx).Create(exp).Error
}

func (r *PostgresExperienceRepository) FindAll(ctx context.Context) ([]domain.Experience, error) {
	var experiences []domain.Experience
	if err := db.DB.WithContext(ctx).Order("start_date desc").Find(&experiences).Error; err != nil {
		return nil, err
	}
	return experiences, nil
}

func (r *PostgresExperienceRepository) FindByID(ctx context.Context, id uint) (*domain.Experience, error) {
	var exp domain.Experience
	if err := db.DB.WithContext(ctx).First(&exp, id).Error; err != nil {
		return nil, err
	}
	return &exp, nil
}

func (r *PostgresExperienceRepository) Update(ctx context.Context, exp *domain.Experience) error {
	return db.DB.WithContext(ctx).Save(exp).Error
}

func (r *PostgresExperienceRepository) Delete(ctx context.Context, id uint) error {
	return db.DB.WithContext(ctx).Delete(&domain.Experience{}, id).Error
}
