package handler

import (
	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/gofiber/fiber/v2"
)

func GetExercise(c *fiber.Ctx) error{
	id := c.Params("id")
	db := database.DB
	var exercise model.Exercise

	result := db.First(&exercise, id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "no exercise found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": exercise})
}

func GetAllExercise(c *fiber.Ctx) error{
	db := database.DB
	var exercises []model.Exercise

	result := db.Find(&exercises)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "exercises not found", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": exercises})
}