package model

import (
	"gorm.io/gorm"
)

type SocialLink struct {
	gorm.Model
	Platform string `gorm:"type:varchar(100);not null" json:"platform"`
	Url      string `gorm:"type:varchar(255);not null" json:"url"`
	Icon     string `gorm:"type:varchar(50);not null" json:"icon"` // lucide-react icon name
	IsActive bool   `gorm:"default:true" json:"is_active"`
}

func (SocialLink) TableName() string {
	return "social_links"
}
