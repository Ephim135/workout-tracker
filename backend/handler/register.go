package handler

import (
	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	var body struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "could not hash Password"})
	}

	user := model.User{
		Username: body.Username,
		Password: string(hashedPassword),
	}

	result := database.DB.Create(&user)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed save user"})
	}

	return c.JSON(fiber.Map{"success": true})
}