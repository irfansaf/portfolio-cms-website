package domain

import (
	"time"

	"gorm.io/gorm"
)

type DiaryEntry struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	Slug       string         `gorm:"uniqueIndex;not null" json:"slug"`
	Title      string         `gorm:"not null" json:"title"`
	Excerpt    string         `json:"excerpt"`
	Content    string         `json:"content"`
	Date       time.Time      `json:"date"`
	Visibility string         `gorm:"default:'public'" json:"visibility"` // 'public' | 'private'
}

func (DiaryEntry) TableName() string {
	return "diary_entries"
}
