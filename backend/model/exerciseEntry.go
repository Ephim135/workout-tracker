package model

import "gorm.io/gorm"

type ExerciseEntry struct {
	gorm.Model
	WorkoutID uint `gorm:"not null" json:"workout_id"` // Links to Workout
	ExerciseID uint `gorm:"not null" json:"exercise_id"` // Links to Exercise
	Sets []WorkoutSet `gorm:"foreignKey:ExerciseEntryID" json:"sets"` // Links to WorkoutSet
}
