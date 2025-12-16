package service

import (
	"backend/biz/dal/model"
	"backend/biz/dal/pg"

	"gorm.io/gorm"
)

type SocialLinkService struct{}

func NewSocialLinkService() *SocialLinkService {
	return &SocialLinkService{}
}

func (s *SocialLinkService) GetAllSocialLinks() ([]model.SocialLink, error) {
	var links []model.SocialLink
	if err := pg.DB.Find(&links).Error; err != nil {
		return nil, err
	}
	return links, nil
}

func (s *SocialLinkService) CreateSocialLink(link *model.SocialLink) error {
	return pg.DB.Create(link).Error
}

func (s *SocialLinkService) UpdateSocialLink(id uint, link *model.SocialLink) error {
	link.ID = id
	return pg.DB.Model(&model.SocialLink{Model: gorm.Model{ID: uint(id)}}).Updates(link).Error
}

func (s *SocialLinkService) DeleteSocialLink(id uint) error {
	return pg.DB.Delete(&model.SocialLink{}, id).Error
}
