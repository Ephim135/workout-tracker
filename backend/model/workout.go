package model

import (
	"time"

	"gorm.io/gorm"
)

type Workout struct {
	gorm.Model
	UserID      uint            `gorm:"not null" json:"user_id"`               // Who performed it
	StartedAt   time.Time       `gorm:"not null" json:"started_at"`            // When they started
	EndedAt     *time.Time      `json:"ended_at"`                              // Optional, null if still in progress
	Status      string          `gorm:"type:varchar(20);default:'in_progress'" json:"status"` // "in_progress", "completed", "abandoned"
	Notes       string          `gorm:"type:text" json:"notes"`                // Optional summary or notes
	ExerciseEntries []ExerciseEntry `gorm:"foreignKey:WorkoutID" json:"exercise_entries"` // The actual performed exercises
}
