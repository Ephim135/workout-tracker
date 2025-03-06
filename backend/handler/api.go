package handler

import (
	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/gofiber/fiber/v2"
)

func Hello(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"status": "success", "message": "Hello, ok!", "data": nil})
}

func GetAllUsers(c *fiber.Ctx) error {
	db := database.DB

	var users []model.User
	db.Find(&users)

	return c.JSON(fiber.Map{"status": "success", "message": "successful return all users", "data": users})
}