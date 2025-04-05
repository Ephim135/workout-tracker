package model

import "gorm.io/gorm"

type Exercise struct {
	gorm.Model
    Name         string   `json:"name" db:"name"`          // Name of the exercise (e.g., "Bench Press")
    Description  string   `json:"description" db:"description"` // Detailed explanation of the exercise
    TargetMuscles string `json:"target_muscles" db:"target_muscles"` // Muscles worked (e.g., ["chest", "triceps"])
    Instructions string   `json:"instructions" db:"instructions"` // Step-by-step guide on how to perform the exercise
    ImageURL     string   `json:"image_url" db:"image_url"` // URL of an exercise image (optional)
}