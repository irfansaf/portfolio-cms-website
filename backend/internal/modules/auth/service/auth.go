package service

import (
	"context"
	"errors"

	"backend/internal/core/utils"
	"backend/internal/modules/user/domain"
	"backend/internal/modules/user/port"

	"gorm.io/gorm"
)

type AuthService struct {
	userRepo port.UserRepository
}

func NewAuthService(userRepo port.UserRepository) *AuthService {
	return &AuthService{
		userRepo: userRepo,
	}
}

func (s *AuthService) Register(ctx context.Context, username, email, password string) error {
	// Check if user exists
	if _, err := s.userRepo.FindByEmailOrUsername(ctx, email, username); err == nil {
		return errors.New("username or email already exists")
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return err
	}

	newUser := domain.User{
		Username: username,
		Email:    email,
		Password: hashedPassword,
	}

	return s.userRepo.Create(ctx, &newUser)
}

func (s *AuthService) Login(ctx context.Context, email, password string) (string, error) {
	user, err := s.userRepo.FindByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", errors.New("invalid credentials")
		}
		return "", err
	}

	if !utils.CheckPasswordHash(password, user.Password) {
		return "", errors.New("invalid credentials")
	}

	return utils.GenerateToken(user.ID)
}
