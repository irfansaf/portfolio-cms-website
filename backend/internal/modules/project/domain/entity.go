package domain

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Project struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Slug         string         `gorm:"uniqueIndex;not null" json:"slug"`
	Title        string         `gorm:"not null" json:"title"`
	Description  string         `json:"description"`
	ImgSrc       string         `json:"img_src"`
	Role         string         `json:"role"`
	Technologies pq.StringArray `gorm:"type:text[]" json:"technologies"`
	Overview     string         `json:"overview"`
	Outcomes     string         `json:"outcomes"`
	Gallery      pq.StringArray `gorm:"type:text[]" json:"gallery"`
	Links        pq.StringArray `gorm:"type:text[]" json:"links"`
}

func (Project) TableName() string {
	return "projects"
}
