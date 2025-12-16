package repository

import (
	"backend/internal/core/db"
	"backend/internal/modules/diary/domain"
	"backend/internal/modules/diary/port"
	"context"
)

type PostgresDiaryRepository struct{}

var _ port.DiaryRepository = (*PostgresDiaryRepository)(nil)

func NewPostgresDiaryRepository() *PostgresDiaryRepository {
	return &PostgresDiaryRepository{}
}

func (r *PostgresDiaryRepository) Create(ctx context.Context, entry *domain.DiaryEntry) error {
	return db.DB.WithContext(ctx).Create(entry).Error
}

func (r *PostgresDiaryRepository) FindAll(ctx context.Context, includePrivate bool) ([]domain.DiaryEntry, error) {
	var entries []domain.DiaryEntry
	query := db.DB.WithContext(ctx).Order("date desc")
	if !includePrivate {
		query = query.Where("visibility = ?", "public")
	}
	err := query.Find(&entries).Error
	return entries, err
}

func (r *PostgresDiaryRepository) FindBySlug(ctx context.Context, slug string) (*domain.DiaryEntry, error) {
	var entry domain.DiaryEntry
	err := db.DB.WithContext(ctx).Where("slug = ?", slug).First(&entry).Error
	return &entry, err
}

func (r *PostgresDiaryRepository) FindByID(ctx context.Context, id uint) (*domain.DiaryEntry, error) {
	var entry domain.DiaryEntry
	err := db.DB.WithContext(ctx).First(&entry, id).Error
	return &entry, err
}

func (r *PostgresDiaryRepository) Update(ctx context.Context, entry *domain.DiaryEntry) error {
	return db.DB.WithContext(ctx).Save(entry).Error
}

func (r *PostgresDiaryRepository) Delete(ctx context.Context, id uint) error {
	return db.DB.WithContext(ctx).Delete(&domain.DiaryEntry{}, id).Error
}
