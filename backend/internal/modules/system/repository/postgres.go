package repository

import (
	"backend/internal/core/db"
	"backend/internal/modules/system/domain"
	"context"
)

type PostgresSystemRepository struct{}

func NewPostgresSystemRepository() *PostgresSystemRepository {
	return &PostgresSystemRepository{}
}

func (r *PostgresSystemRepository) GetConfig(ctx context.Context, key string) (string, error) {
	var config domain.SystemConfig
	if err := db.DB.WithContext(ctx).Where("key = ?", key).First(&config).Error; err != nil {
		return "", err
	}
	return config.Value, nil
}

func (r *PostgresSystemRepository) SetConfig(ctx context.Context, key, value string) error {
	var config domain.SystemConfig
	// Check if exists
	err := db.DB.WithContext(ctx).Where("key = ?", key).First(&config).Error
	if err == nil {
		// Update
		config.Value = value
		return db.DB.WithContext(ctx).Save(&config).Error
	}
	// Create
	newConfig := domain.SystemConfig{Key: key, Value: value}
	return db.DB.WithContext(ctx).Create(&newConfig).Error
}
