package domain

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Experience struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Title       string         `json:"title"`
	Company     string         `json:"company"`
	StartDate   time.Time      `json:"start_date"`
	EndDate     *time.Time     `json:"end_date"`    // Pointer to allow null (nil) for "Present"
	Description string         `json:"description"` // HTML content
}

func (Experience) TableName() string {
	return "experiences"
}

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
