package router

import (
	"github.com/Ephim135/workout-tracker/handler"
	"github.com/Ephim135/workout-tracker/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	// Middleware
	api := app.Group("/api", logger.New())

	// return All Users have to delete later
	api.Get("/users/", handler.GetAllUsers)

	//Auth
	auth := api.Group("/auth")
	auth.Post("/login", handler.Login)
	auth.Post("/logout", handler.Logout)

	// User
	user := api.Group("/user")
	user.Get("/:id?", handler.GetUser) // optional id if no id JWT userID is used
	user.Post("/", handler.CreateUser)
	user.Patch("/", middleware.Protected(), handler.UpdateUser)
	user.Delete("/", middleware.Protected(), handler.DeleteUser)

	// Exercises
	exercise := api.Group("/exercise")
	exercise.Get("/:id", handler.GetExercise)
	exercise.Get("/", handler.GetAllExercise)

	// Refresh
	api.Get("/refresh", handler.Refresh)
}