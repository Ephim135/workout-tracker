package main

import (
	"log"

	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/Ephim135/workout-tracker/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)



func main() {
	app := fiber.New()
	app.Use(cors.New()) // Cross Origin Resource Sharing

	database.InitDB()

	router.SetupRoutes(app)

	app.Get("/api/users", func(c *fiber.Ctx) error {
		var users []model.User

		result := database.DB.Find(&users)

		if result.Error != nil {
	        return c.Status(500).JSON(fiber.Map{"error": "Could not fetch users"})
		}

		return c.JSON(fiber.Map{"users": users})

	})

	log.Fatal(app.Listen(":3000"))
}
