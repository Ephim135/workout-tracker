package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Workout Tracker API")
	})

	app.Get("/api/message", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello from the backend!",
		})
	})

	app.Post("/api/login", func(c *fiber.Ctx) error {
		var req LoginRequest

		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		// authentication Logic
		if req.Username == "Fabian" && req.Password == "1234" {
			return c.JSON(fiber.Map{"message": "login successful"})
		}

		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	})

	log.Fatal(app.Listen(":3000"))
}
