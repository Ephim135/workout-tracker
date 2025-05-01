package model

import "gorm.io/gorm"

type WorkoutSet struct {
	gorm.Model
	ExerciseEntryID uint    `gorm:"not null" json:"exercise_entry_id"` // Links to ExerciseEntry
	SetNumber      int     `gorm:"not null" json:"set_number"`  // 1st, 2nd, etc.
	Reps           int     `gorm:"not null" json:"reps"`
	Weight         float64 `json:"weight"` // Weight lifted
	SetType        string  `gorm:"type:varchar(50);not null" json:"set_type"` // "warmup", "working", "dropset"
	Completed      bool    `gorm:"default:false" json:"completed"` // Checkbox for completion
}