package model

import (
	"time"

	"gorm.io/gorm"
)

type RefreshToken struct {
	gorm.Model
	UserID      uint      `gorm:"not null;index"`  // Foreign key
	HashedToken string    `gorm:"type:varchar(255);not null"`
	ExpiresAt   time.Time `gorm:"not null"`
}
