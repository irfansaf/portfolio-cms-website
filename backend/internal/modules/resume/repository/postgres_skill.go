package repository

import (
	"backend/internal/core/db"
	"backend/internal/modules/resume/domain"
	"backend/internal/modules/resume/port"
	"context"
)

type PostgresSkillRepository struct{}

var _ port.SkillRepository = (*PostgresSkillRepository)(nil)

func NewPostgresSkillRepository() *PostgresSkillRepository {
	return &PostgresSkillRepository{}
}

func (r *PostgresSkillRepository) Create(ctx context.Context, skill *domain.Skill) error {
	return db.DB.WithContext(ctx).Create(skill).Error
}

func (r *PostgresSkillRepository) FindAll(ctx context.Context) ([]domain.Skill, error) {
	var skills []domain.Skill
	if err := db.DB.WithContext(ctx).Find(&skills).Error; err != nil {
		return nil, err
	}
	return skills, nil
}

func (r *PostgresSkillRepository) FindByID(ctx context.Context, id uint) (*domain.Skill, error) {
	var skill domain.Skill
	if err := db.DB.WithContext(ctx).First(&skill, id).Error; err != nil {
		return nil, err
	}
	return &skill, nil
}

func (r *PostgresSkillRepository) Update(ctx context.Context, skill *domain.Skill) error {
	return db.DB.WithContext(ctx).Save(skill).Error
}

func (r *PostgresSkillRepository) Delete(ctx context.Context, id uint) error {
	return db.DB.WithContext(ctx).Delete(&domain.Skill{}, id).Error
}
