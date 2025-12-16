package service

import (
	"context"
	"time"

	"backend/internal/modules/project/domain"
	"backend/internal/modules/project/port"
)

type ProjectService struct {
	repo port.ProjectRepository
}

func NewProjectService(repo port.ProjectRepository) *ProjectService {
	return &ProjectService{repo: repo}
}

func (s *ProjectService) CreateProject(ctx context.Context, project *domain.Project) error {
	if project.CreatedAt.IsZero() {
		project.CreatedAt = time.Now()
	}
	return s.repo.Create(ctx, project)
}

func (s *ProjectService) GetAllProjects(ctx context.Context) ([]domain.Project, error) {
	return s.repo.FindAll(ctx)
}

func (s *ProjectService) GetProjectBySlug(ctx context.Context, slug string) (*domain.Project, error) {
	return s.repo.FindBySlug(ctx, slug)
}

func (s *ProjectService) UpdateProject(ctx context.Context, id uint, input *domain.Project) error {
	project, err := s.repo.FindByID(ctx, id)
	if err != nil {
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
	// CreatedAt is not updated

	return s.repo.Update(ctx, project)
}

func (s *ProjectService) DeleteProject(ctx context.Context, id uint) error {
	return s.repo.Delete(ctx, id)
}
