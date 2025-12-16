package service

import (
	"context"
	"errors"

	"backend/internal/modules/auth/service"
	"backend/internal/modules/system/repository"
	userRepo "backend/internal/modules/user/port"
)

type SystemService struct {
	systemRepo *repository.PostgresSystemRepository
	userRepo   userRepo.UserRepository
	authSvc    *service.AuthService
}

func NewSystemService(
	systemRepo *repository.PostgresSystemRepository,
	userRepo userRepo.UserRepository,
	authSvc *service.AuthService,
) *SystemService {
	return &SystemService{
		systemRepo: systemRepo,
		userRepo:   userRepo,
		authSvc:    authSvc,
	}
}

type SystemStatus struct {
	Initialized bool   `json:"initialized"`
	SiteName    string `json:"site_name"`
}

func (s *SystemService) GetStatus(ctx context.Context) (*SystemStatus, error) {
	count, err := s.userRepo.Count(ctx)
	if err != nil {
		return nil, err
	}

	siteName, _ := s.systemRepo.GetConfig(ctx, "site_name")
	if siteName == "" {
		siteName = "Portfolio"
	}

	return &SystemStatus{
		Initialized: count > 0,
		SiteName:    siteName,
	}, nil
}

func (s *SystemService) Setup(ctx context.Context, siteName, username, email, password string) error {
	// 1. Ensure not initialized
	count, err := s.userRepo.Count(ctx)
	if err != nil {
		return err
	}
	if count > 0 {
		return errors.New("system already initialized")
	}

	// 2. Create Admin User
	if err := s.authSvc.Register(ctx, username, email, password); err != nil {
		return err
	}

	// 3. Set Site Name
	if err := s.systemRepo.SetConfig(ctx, "site_name", siteName); err != nil {
		return err
	}

	return nil
}
