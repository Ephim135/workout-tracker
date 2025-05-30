package handler

import (
	"time"

	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"

	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	type LoginInput struct {
		Identity string `json:"identity"`
		Password string `json:"password"`
	}

	type UserResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Age      int    `json:"age,omitempty"`
	Gender   string `json:"gender,omitempty"`
	Height   int    `json:"height,omitempty"`
	Weight   int    `json:"weight,omitempty"`
	Goal     string `json:"goal,omitempty"`
	}

	var input LoginInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid login data",
			"data":    err.Error(),
		})
	}

	var user *model.User
	var err error
	if isEmail(input.Identity) {
		user, err = getUserByEmail(input.Identity)
	} else {
		user, err = getUserByUsername(input.Identity)
	}

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Internal error", "data": err.Error()})
	}
	if user == nil || !CheckPasswordHash(input.Password, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid credentials"})
	}

	accessToken, err := GenerateAccessToken(user.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Failed to generate access token"})
	}

	rawRefreshToken, err := GenerateRefreshToken(user.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Failed to generate refresh token"})
	}

	if err := storeRefreshToken(database.DB, user.ID, rawRefreshToken); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Failed to save refresh token"})
	}

	// Set cookies
	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    rawRefreshToken,
		Expires:  time.Now().Add(30 * 24 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
		SameSite: "None",
		Path:     "/api/auth/refresh",
	})
	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    accessToken,
		Expires:  time.Now().Add(1 * time.Minute),
		HTTPOnly: true,
		Secure:   true,
		SameSite: "None",
		Path:     "/",
	})

	userResponse := UserResponse{
	ID:       user.ID,
	Username: user.Username,
	Age:      user.Age,
	Gender:   user.Gender,
	Height:   user.Height,
	Weight:   user.Weight,
	Goal:     user.Goal,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Login successful",
		"user":    userResponse,
	})
}
