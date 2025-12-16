package domain

import (
	"gorm.io/gorm"
)

type SocialLink struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt int64          `json:"created_at"` // Using generic type or just rely on embedded
	UpdatedAt int64          `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Platform  string         `gorm:"type:varchar(100);not null" json:"platform"`
	Url       string         `gorm:"type:varchar(255);not null" json:"url"`
	Icon      string         `gorm:"type:varchar(50);not null" json:"icon"`
	IsActive  bool           `gorm:"default:true" json:"is_active"`
}

// For now, embedding gorm.Model is easiest to match existing behavior accurately
type SocialLinkGorm struct {
	gorm.Model
	Platform string `gorm:"type:varchar(100);not null" json:"platform"`
	Url      string `gorm:"type:varchar(255);not null" json:"url"`
	Icon     string `gorm:"type:varchar(50);not null" json:"icon"`
	IsActive bool   `gorm:"default:true" json:"is_active"`
}

func (SocialLinkGorm) TableName() string {
	return "social_links"
}
