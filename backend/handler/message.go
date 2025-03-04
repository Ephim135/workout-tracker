package handler

import "github.com/gofiber/fiber/v2"

func Message(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Hello from the backend!",
	})
}