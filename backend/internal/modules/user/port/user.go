package port

import (
	"backend/internal/modules/user/domain"
	"context"
)

type UserRepository interface {
	Create(ctx context.Context, user *domain.User) error
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
	FindByUsername(ctx context.Context, username string) (*domain.User, error)
	FindByEmailOrUsername(ctx context.Context, email, username string) (*domain.User, error)
	Count(ctx context.Context) (int64, error)
}
