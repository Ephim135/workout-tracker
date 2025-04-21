package main

import (
	"log"

	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)



func main() {
	app := fiber.New(fiber.Config{
		AppName: "Workout-Tracker API",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", //React Vite dev server
		AllowCredentials: true, // for cookies
		AllowHeaders: "Content-Type", // allow JSON Headers
	})) // Cross Origin Resource Sharing

	database.InitDB()

	router.SetupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
