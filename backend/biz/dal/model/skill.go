package model

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Skill struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Category  string         `json:"category"`
	Items     pq.StringArray `gorm:"type:text[]" json:"items"`
}

func (Skill) TableName() string {
	return "skills"
}
