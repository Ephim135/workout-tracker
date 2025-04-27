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
		AllowOrigins: "http://localhost:5173, http://127.0.0.1:5173, http://172.18.187.5:5173", //React Vite dev server
		AllowCredentials: true, // for cookies
		AllowHeaders: "Origin, Content-Type, Accept, Authorization", // allow JSON Headers
		AllowMethods: "PATCH,GET,POST,PUT,DELETE,OPTIONS",
	})) // Cross Origin Resource Sharing

	database.InitDB()

	router.SetupRoutes(app)

	log.Fatal(app.Listen("0.0.0.0:3000"))
}
