package middleware

import (
	"fmt"

	"github.com/Ephim135/workout-tracker/config"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Protected() fiber.Handler{
	return func(c *fiber.Ctx) error {
		tokenStr := c.Cookies("access_token")
		if tokenStr == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Missing access token",
			})
		}

		// Parse JWT function in Parse determines wich key to use for signature validation
		// based on the contents of the JWT
		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			// Validate signing method check if Header of jwt is set to alg: HS256
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")
			}
			return []byte(config.Config("SECRET_KEY")), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid token",
			})
		}

		// Extract user ID from claims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || claims["id"] == nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid claims",
			})
		}
		userID := fmt.Sprintf("%v", claims["id"])

		// Set claims in context
		c.Locals("userID", userID)
		c.Locals("tokenClaims", claims) // set remaining claims as list

		fmt.Printf("succesfully used Protecting middleware\n")

		return c.Next() // go to next middleware or final handler without it would stop here
	}
}