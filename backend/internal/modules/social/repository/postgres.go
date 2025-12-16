package repository

import (
	"backend/internal/core/db"
	"backend/internal/modules/social/domain"
	"backend/internal/modules/social/port"
	"context"
)

type PostgresSocialLinkRepository struct{}

var _ port.SocialLinkRepository = (*PostgresSocialLinkRepository)(nil)

func NewPostgresSocialLinkRepository() *PostgresSocialLinkRepository {
	return &PostgresSocialLinkRepository{}
}

func (r *PostgresSocialLinkRepository) Create(ctx context.Context, link *domain.SocialLinkGorm) error {
	return db.DB.WithContext(ctx).Create(link).Error
}

func (r *PostgresSocialLinkRepository) FindAll(ctx context.Context) ([]domain.SocialLinkGorm, error) {
	var links []domain.SocialLinkGorm
	if err := db.DB.WithContext(ctx).Find(&links).Error; err != nil {
		return nil, err
	}
	return links, nil
}

func (r *PostgresSocialLinkRepository) FindByID(ctx context.Context, id uint) (*domain.SocialLinkGorm, error) {
	var link domain.SocialLinkGorm
	if err := db.DB.WithContext(ctx).First(&link, id).Error; err != nil {
		return nil, err
	}
	return &link, nil
}

func (r *PostgresSocialLinkRepository) Update(ctx context.Context, link *domain.SocialLinkGorm) error {
	return db.DB.WithContext(ctx).Save(link).Error
}

func (r *PostgresSocialLinkRepository) Delete(ctx context.Context, id uint) error {
	return db.DB.WithContext(ctx).Delete(&domain.SocialLinkGorm{}, id).Error
}
