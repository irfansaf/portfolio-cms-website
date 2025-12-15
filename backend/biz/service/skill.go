package service

import (
	"backend/biz/dal/model"
	"backend/biz/dal/pg"
)

type SkillService struct{}

func NewSkillService() *SkillService {
	return &SkillService{}
}

func (s *SkillService) GetAllSkills() ([]model.Skill, error) {
	var skills []model.Skill
	if err := pg.DB.Find(&skills).Error; err != nil {
		return nil, err
	}
	return skills, nil
}

func (s *SkillService) CreateSkill(skill *model.Skill) error {
	return pg.DB.Create(skill).Error
}

func (s *SkillService) UpdateSkill(id uint, skill *model.Skill) error {
	skill.ID = id
	return pg.DB.Model(&model.Skill{ID: id}).Updates(skill).Error
}

func (s *SkillService) DeleteSkill(id uint) error {
	return pg.DB.Delete(&model.Skill{}, id).Error
}
