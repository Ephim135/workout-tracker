package handler

import (
	"strconv"

	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func validToken(t *jwt.Token, id string) bool {
	n, err := strconv.Atoi(id)
	if err != nil {
		return false
	}

	claims := t.Claims.(jwt.MapClaims)
	uid := int(claims["user_id"].(float64))
	
	return uid == n
}

func validUser(id string, p string) bool {
	db := database.DB
	var user model.User
	db.First(&user, id)
	if user.Username == "" {
		return false
	}
	if !CheckPasswordHash(p, user.Password) {
		return false
	}
	return true
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

func UpdateUser(c *fiber.Ctx) error {
	type UpdateUser struct {
		Names string `json:"names"`
	}
	updateUser := new(UpdateUser)

	if err := c.BodyParser(updateUser); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "review input",
			"data": err,
		})
	}
	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "invalid token id",
			"data": nil,
		})
	}

	db := database.DB
	var user model.User

	db.First(&user, id)
	user.Names = updateUser.Names
	db.Save(&user)

	return c.JSON(fiber.Map{"status": "success", "message": "User updated successful", "data": user})
}

func DeleteUser(c *fiber.Ctx) error {
	type PasswordInput struct {
		Password string `json:"password"`
	}
	var pi PasswordInput
	if err := c.BodyParser(&pi); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Review your input",
			"data": err,
		})
	}
	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "invalid token id",
			"data": nil,
		})
	}
	if !validUser(id, pi.Password) {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "not valid user",
			"data": nil,
		})
	}

	db := database.DB
	var user model.User

	db.First(&user, id)

	db.Delete(&user)
	return c.JSON(fiber.Map{"status": "success", "message": "User deleted successful", "data": nil})
}	















