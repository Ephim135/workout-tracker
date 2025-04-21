package handler

import (
	"crypto/sha256"
	"fmt"
	"time"

	"github.com/Ephim135/workout-tracker/database"
	"github.com/Ephim135/workout-tracker/model"
	"github.com/gofiber/fiber/v2"
)
func Refresh(c *fiber.Ctx) error {
    token := c.Cookies("refresh_token")
    if token == "" {
        return c.Status(401).JSON(fiber.Map{"error": "Missing refresh token"})
    }

    hashed := fmt.Sprintf("%x", sha256.Sum256([]byte(token)))

    var refreshToken model.RefreshToken
    err := database.DB.Where("hashed_token = ?", hashed).First(&refreshToken).Error
    if err != nil || time.Now().After(refreshToken.ExpiresAt) {
        return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired refresh token"})
    }

    newAccessToken, err := GenerateAccessToken(refreshToken.UserID)
	if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate access token"})
	}

    c.Cookie(&fiber.Cookie{
        Name:     "access_token",
        Value:    newAccessToken,
        Expires:  time.Now().Add(8 * time.Minute),
        HTTPOnly: true,
        Secure:   true,
        SameSite: "Lax",
        Path:     "/",
    })

    return c.JSON(fiber.Map{"message": "Access token refreshed"})
}
