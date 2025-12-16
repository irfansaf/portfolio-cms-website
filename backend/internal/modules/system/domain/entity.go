package domain

import "gorm.io/gorm"

type SystemConfig struct {
	gorm.Model
	Key   string `gorm:"uniqueIndex;not null" json:"key"`
	Value string `json:"value"`
}

func (SystemConfig) TableName() string {
	return "system_configs"
}
