package repository

import (
	"backend/internal/core/db"
	"backend/internal/modules/user/domain"
	"backend/internal/modules/user/port"
	"context"
)

type PostgresUserRepository struct{}

// Ensure implementation
var _ port.UserRepository = (*PostgresUserRepository)(nil)

func NewPostgresUserRepository() *PostgresUserRepository {
	return &PostgresUserRepository{}
}

func (r *PostgresUserRepository) Create(ctx context.Context, user *domain.User) error {
	return db.DB.WithContext(ctx).Create(user).Error
}

func (r *PostgresUserRepository) FindByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	if err := db.DB.WithContext(ctx).Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *PostgresUserRepository) FindByUsername(ctx context.Context, username string) (*domain.User, error) {
	var user domain.User
	if err := db.DB.WithContext(ctx).Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *PostgresUserRepository) FindByEmailOrUsername(ctx context.Context, email, username string) (*domain.User, error) {
	var user domain.User
	if err := db.DB.WithContext(ctx).Where("email = ? OR username = ?", email, username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
