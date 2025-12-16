package port

import (
	"backend/internal/modules/social/domain"
	"context"
)

type SocialLinkRepository interface {
	Create(ctx context.Context, link *domain.SocialLinkGorm) error
	FindAll(ctx context.Context) ([]domain.SocialLinkGorm, error)
	FindByID(ctx context.Context, id uint) (*domain.SocialLinkGorm, error)
	Update(ctx context.Context, link *domain.SocialLinkGorm) error
	Delete(ctx context.Context, id uint) error
}
