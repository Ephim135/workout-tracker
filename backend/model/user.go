package model

import "gorm.io/gorm"

// User struct
type User struct {
	gorm.Model
	Username string `gorm:"type:varchar(255);uniqueIndex;not null" json:"username"`
	Email    string `gorm:"type:varchar(255);uniqueIndex;not null" json:"email"`
	Password string `gorm:"type:text;not null" json:"password"`
	Names    string `gorm:"type:text" json:"names"`
}