package handler

import (
	"fmt"
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
	fmt.Println(id)
	n, err := strconv.Atoi(id)
	if err != nil {
		fmt.Println("XXXXXXXX")
		return false
	}

	claims := t.Claims.(jwt.MapClaims)
	uid := int(claims["user_id"].(float64))
	
	fmt.Println("uid:", uid, "n:",  n)
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
		"success": true,
	})
}

func UpdateUser(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)
	fmt.Printf("userID: %v\n", userID) // check TODO
	// input with any data because we dont know the types of the data points ahead
	var input map[string]interface{}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid input",
			"data":    err.Error(),
		})
	}

	// Remove fields the user shouldn't update
	delete(input, "id")
	delete(input, "CreatedAt")
	delete(input, "password") // unless you handle this properly
	delete(input, "UpdatedAt")
	delete(input, "DeletedAt")


	db := database.DB

	// Update fields that were sent in the JSON
	if err := db.Model(&model.User{}).Where("id = ?", userID).Updates(input).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to update user",
			"data":    err.Error(),
		})
	}

	var updatedUser model.User
	db.First(&updatedUser, userID)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User updated successfully",
		"data":    updatedUser,
	})
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

func GetAllUsers(c *fiber.Ctx) error {
	db := database.DB

	var users []model.User
	db.Find(&users)

	return c.JSON(fiber.Map{"status": "success", "message": "successful return all users", "data": users})
}