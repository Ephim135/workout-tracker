package model

import (
	"time"

	"gorm.io/gorm"
)

type WorkoutStatus string

const (
    StatusActive    WorkoutStatus = "active"
    StatusCompleted WorkoutStatus = "completed"
)

type Workout struct {
	gorm.Model
	UserID      uint            `gorm:"not null" json:"userId"`               // Who performed it
	StartedAt   time.Time       `gorm:"not null" json:"startedAt"`            // When they started
	EndedAt     *time.Time      `json:"endedAt"`                              // Optional, null if still in progress
	Status      WorkoutStatus          `gorm:"type:varchar(20);default:'active'" json:"status"` // "in_progress", "completed", "abandoned"
	ExerciseEntries []ExerciseEntry `gorm:"foreignKey:WorkoutID" json:"exerciseEntries"` // The actual performed exercises
}

type ExerciseEntry struct {
	gorm.Model
	WorkoutID uint `gorm:"not null" json:"workoutId"` // Links to Workout
	ExerciseID uint `gorm:"not null" json:"exerciseId"` // Links to Exercise
	Sets []WorkoutSet `gorm:"foreignKey:ExerciseEntryID" json:"sets"` // Links to WorkoutSet
}

type WorkoutSet struct {
	gorm.Model
	ExerciseEntryID uint    `gorm:"not null" json:"exerciseEntryId"` // Links to ExerciseEntry
	SetNumber      int     `gorm:"not null" json:"setNumber"`  // 1st, 2nd, etc.
	Reps           int     `gorm:"not null" json:"reps"`
	Weight         float64 `json:"weight"` // Weight lifted
	SetType        string  `gorm:"type:varchar(50);not null" json:"setType"` // "warmup", "working", "dropset"
	Completed      bool    `gorm:"default:false" json:"completed"` // Checkbox for completion
}

type Exercise struct {
	gorm.Model
    Name         string   `gorm:"unique;not null" json:"name"`          // Name of the exercise (e.g., "Bench Press")
    Description  string   `json:"description"` // Detailed explanation of the exercise
    TargetMuscles string `json:"target_muscles"` // Muscles worked (e.g., ["chest", "triceps"])
    Instructions string   `json:"instructions"` // Step-by-step guide on how to perform the exercise
    ImageURL     string   `json:"image_url"` // URL of an exercise image (optional)
}