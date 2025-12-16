package service

import (
	"backend/internal/modules/social/domain"
	"backend/internal/modules/social/port"
	"context"
)

type SocialLinkService struct {
	repo port.SocialLinkRepository
}

func NewSocialLinkService(repo port.SocialLinkRepository) *SocialLinkService {
	return &SocialLinkService{repo: repo}
}

func (s *SocialLinkService) GetAllSocialLinks(ctx context.Context) ([]domain.SocialLinkGorm, error) {
	return s.repo.FindAll(ctx)
}

func (s *SocialLinkService) CreateSocialLink(ctx context.Context, link *domain.SocialLinkGorm) error {
	return s.repo.Create(ctx, link)
}

func (s *SocialLinkService) UpdateSocialLink(ctx context.Context, id uint, link *domain.SocialLinkGorm) error {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	link.ID = existing.ID
	return s.repo.Update(ctx, link)
}

func (s *SocialLinkService) DeleteSocialLink(ctx context.Context, id uint) error {
	return s.repo.Delete(ctx, id)
}
