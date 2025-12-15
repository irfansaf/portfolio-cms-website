package service

import (
	"backend/biz/dal/model"
	"backend/biz/dal/pg"
)

type ProjectService struct{}

func NewProjectService() *ProjectService {
	return &ProjectService{}
}

func (s *ProjectService) CreateProject(project *model.Project) error {
	return pg.DB.Create(project).Error
}

func (s *ProjectService) GetAllProjects() ([]model.Project, error) {
	var projects []model.Project
	err := pg.DB.Order("created_at desc").Find(&projects).Error
	return projects, err
}

func (s *ProjectService) GetProjectBySlug(slug string) (*model.Project, error) {
	var project model.Project
	err := pg.DB.Where("slug = ?", slug).First(&project).Error
	return &project, err
}

func (s *ProjectService) UpdateProject(id uint, input *model.Project) error {
	var project model.Project
	if err := pg.DB.First(&project, id).Error; err != nil {
		return err
	}
	// Update fields
	project.Title = input.Title
	project.Slug = input.Slug
	project.Description = input.Description
	project.ImgSrc = input.ImgSrc
	project.Role = input.Role
	project.Technologies = input.Technologies
	project.Overview = input.Overview
	project.Outcomes = input.Outcomes
	project.Gallery = input.Gallery
	project.Links = input.Links

	return pg.DB.Save(&project).Error
}

func (s *ProjectService) DeleteProject(id uint) error {
	return pg.DB.Delete(&model.Project{}, id).Error
}
