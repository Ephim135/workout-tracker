package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"golang.org/x/crypto/bcrypt"
)


type User struct {
    ID       uint   `json:"id" gorm:"primaryKey"`
    Username string `json:"username" gorm:"unique"`
    Password string `json:"password"`
}

func main() {
	InitDB()

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
		var body struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}

		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		var user User
		result := db.Where("username = ?", body.Username).First(&user)
		if result.Error != nil {
        	return c.Status(401).JSON(fiber.Map{"error": "User not found"})
    	}

		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
		if err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "Incorrect Password"})
		}

		return c.Status(200).JSON(fiber.Map{"message": "Login successful!"})
	})

	app.Post("/api/register", func(c *fiber.Ctx) error {
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

		user := User{
			Username: body.Username,
			Password: string(hashedPassword),
		}

		result := db.Create(&user)
		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed save user"})
		}

		return c.JSON(fiber.Map{"success": true})
	})

	app.Get("/api/users", func(c *fiber.Ctx) error {
		var users []User

		result := db.Find(&users)

		if result.Error != nil {
	        return c.Status(500).JSON(fiber.Map{"error": "Could not fetch users"})
		}

		return c.JSON(fiber.Map{"users": users})

	})

	log.Fatal(app.Listen(":3000"))
}
