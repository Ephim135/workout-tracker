package handler

import (
	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var user model.User

	db.Find(&user, id)
	if user.Username == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "no user found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

func CreateUser(c *fiber.Ctx) error {
	type NewUser struct {
		Username string `json:"username"`
		Email string `json:"email"`
	}

	db := database.DB

	user := new(model.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Review your Input",
			"data": err,
		})
	}

	hash, err := hashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Failed Hash Password",
			"data": err,
		})
	}

	user.Password = hash
	if err := db.Create(&user).Error ;err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Failed create User in DB",
			"data": err,
		})
	}

	newUser := NewUser{
		Email: user.Email,
		Username: user.Username,
	}
	
	return c.Status(200).JSON(fiber.Map{
		"status": "success",
		"message": "created User",
		"data": newUser,
	})
}