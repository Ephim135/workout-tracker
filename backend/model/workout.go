package model

import (
	"time"

	"gorm.io/gorm"
)

type Exercise struct {
	gorm.Model
    Name         string   `json:"name" db:"name"`          // Name of the exercise (e.g., "Bench Press")
    Description  string   `json:"description" db:"description"` // Detailed explanation of the exercise
    TargetMuscles string `json:"target_muscles" db:"target_muscles"` // Muscles worked (e.g., ["chest", "triceps"])
    Instructions string   `json:"instructions" db:"instructions"` // Step-by-step guide on how to perform the exercise
    ImageURL     string   `json:"image_url" db:"image_url"` // URL of an exercise image (optional)
}

type Workout struct {
	gorm.Model
	UserID      uint            `gorm:"not null" json:"userId"`               // Who performed it
	StartedAt   time.Time       `gorm:"not null" json:"startedAt"`            // When they started
	EndedAt     *time.Time      `json:"ended_at"`                              // Optional, null if still in progress
	Status      string          `gorm:"type:varchar(20);default:'in_progress'" json:"status"` // "in_progress", "completed", "abandoned"
	Notes       string          `gorm:"type:text" json:"notes"`                // Optional summary or notes
	ExerciseEntries []ExerciseEntry `gorm:"foreignKey:WorkoutID" json:"exercise_entries"` // The actual performed exercises
}

type ExerciseEntry struct {
	gorm.Model
	UserID      uint            `gorm:"not null" json:"user_id"`               // Who performed it
	WorkoutID uint `gorm:"not null" json:"workout_id"` // Links to Workout
	ExerciseID uint `gorm:"not null" json:"exercise_id"` // Links to Exercise
	Sets []WorkoutSet `gorm:"foreignKey:ExerciseEntryID" json:"sets"` // Links to WorkoutSet
}

type WorkoutSet struct {
	gorm.Model
	UserID      uint            `gorm:"not null" json:"user_id"`               // Who performed it
	ExerciseEntryID uint    `gorm:"not null" json:"exercise_entry_id"` // Links to ExerciseEntry
	SetNumber      int     `gorm:"not null" json:"set_number"`  // 1st, 2nd, etc.
	Reps           int     `gorm:"not null" json:"reps"`
	Weight         float64 `json:"weight"` // Weight lifted
	SetType        string  `gorm:"type:varchar(50);not null" json:"set_type"` // "warmup", "working", "dropset"
	Completed      bool    `gorm:"default:false" json:"completed"` // Checkbox for completion
}

