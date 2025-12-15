package service

import (
	"backend/biz/dal/model"
	"backend/biz/dal/pg"
)

type ExperienceService struct{}

func NewExperienceService() *ExperienceService {
	return &ExperienceService{}
}

func (s *ExperienceService) GetAllExperiences() ([]model.Experience, error) {
	var experiences []model.Experience
	if err := pg.DB.Order("start_date desc").Find(&experiences).Error; err != nil {
		return nil, err
	}
	return experiences, nil
}

func (s *ExperienceService) CreateExperience(exp *model.Experience) error {
	return pg.DB.Create(exp).Error
}

func (s *ExperienceService) UpdateExperience(id uint, exp *model.Experience) error {
	exp.ID = id
	return pg.DB.Model(&model.Experience{ID: id}).Updates(exp).Error
}

func (s *ExperienceService) DeleteExperience(id uint) error {
	return pg.DB.Delete(&model.Experience{}, id).Error
}
