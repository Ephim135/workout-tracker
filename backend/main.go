package main

import (
	"log"

	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)



func main() {
	app := fiber.New()
	app.Use(cors.New()) // Cross Origin Resource Sharing

	database.InitDB()
	router.SetupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
