package handler

import (
	"github.com/gofiber/fiber/v2"
)

// Workout models (example)
type WorkoutSet struct {
	Reps     string `json:"reps"`
	Weight   string `json:"weight"`
	SetType  string `json:"setType"`
	Completed bool  `json:"completed"`
	Index int `json:"index"`
}

type ExerciseEntry struct {
	ExerciseID int          `json:"exerciseId"`
	Name       string       `json:"name"`
	Sets       []WorkoutSet `json:"sets"`
}

type ActiveWorkout struct {
	UserID         int             `json:"userId"`
	StartedAt      string          `json:"startedAt"`
	Notes          *string         `json:"notes"`
	ExerciseEntries []ExerciseEntry `json:"exerciseEntries"`
}

func SaveWorkout(c *fiber.Ctx) error {
	var workout ActiveWorkout
	if err := c.BodyParser(&workout); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Save workout to DB here...
	// Example: db.Create(&workout)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "message": "Workout saved successfull", "data": workout})
}
