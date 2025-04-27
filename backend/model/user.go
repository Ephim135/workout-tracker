package model

import (
	"gorm.io/gorm"
)

// User struct
type User struct {
	gorm.Model
	Username string `gorm:"type:varchar(255);uniqueIndex;not null" json:"username"`
	Email    string `gorm:"type:varchar(255);uniqueIndex;not null" json:"email"`
	Password string `gorm:"type:text;not null" json:"password"`
	Names    string `gorm:"type:text" json:"names"`

	// Profile info
	Age    int     `gorm:"type:int" json:"age"`
	Gender string  `gorm:"type:varchar(50)" json:"gender"`
	Height int `gorm:"type:int" json:"height"`
	Weight int `gorm:"type:float" json:"weight"`
	Goal   string  `gorm:"type:text" json:"goal"`
}