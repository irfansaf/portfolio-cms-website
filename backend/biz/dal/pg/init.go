package pg

import (
	"fmt"
	"log"

	"backend/biz/dal/model"

	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Init() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		viper.GetString("DB_HOST"),
		viper.GetString("DB_USER"),
		viper.GetString("DB_PASSWORD"),
		viper.GetString("DB_NAME"),
		viper.GetString("DB_PORT"),
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	if err := DB.AutoMigrate(&model.User{}, &model.Project{}, &model.DiaryEntry{}, &model.Skill{}, &model.Experience{}, &model.SocialLink{}); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	fmt.Println("Database connection established")
}
