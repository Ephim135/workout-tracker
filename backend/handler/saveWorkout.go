package handler

import (
	"time"

	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/gofiber/fiber/v2"
)

func SaveWorkout(c *fiber.Ctx) error {
	db := database.DB

	var workout model.Workout
	if err := c.BodyParser(&workout); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	if workout.Status == "completed" && workout.EndedAt == nil {
		now := time.Now()
		workout.EndedAt = &now
	}

	if err := db.Create(&workout).Error ;err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Failed create Workout in DB",
			"data": err,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status": "success", 
		"message": "Workout saved successfull", 
		"data": workout,
	})
}
