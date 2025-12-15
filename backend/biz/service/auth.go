package service

import (
	"context"
	"errors"

	"backend/biz/dal/model"
	"backend/biz/dal/pg"
	"backend/pkg/utils"

	"gorm.io/gorm"
)

type AuthService struct{}

func NewAuthService() *AuthService {
	return &AuthService{}
}

func (s *AuthService) Register(ctx context.Context, username, email, password string) error {
	// Check if user exists
	var existingUser model.User
	if err := pg.DB.Where("email = ? OR username = ?", email, username).First(&existingUser).Error; err == nil {
		return errors.New("username or email already exists")
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return err
	}

	newUser := model.User{
		Username: username,
		Email:    email,
		Password: hashedPassword,
	}

	return pg.DB.Create(&newUser).Error
}

func (s *AuthService) Login(ctx context.Context, email, password string) (string, error) {
	var user model.User
	if err := pg.DB.Where("email = ?", email).First(&user).Error; err != nil {
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
