package model

import "gorm.io/gorm"

type Workout struct {
	gorm.Model
	UserID    uint      `gorm:"not null" json:"user_id"` // Links to User
	Name      string    `gorm:"type:varchar(255);not null" json:"name"` // Name of workout
	ExerciseEntry []ExerciseEntry `gorm:"foreignKey:WorkoutID" json:"exercise_entry"`
}