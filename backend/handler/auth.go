package handler

import (
	"crypto/sha256"
	"encoding/hex"
	"time"

	"github.com/Ephim135/workout-tracker/config"
	"github.com/Ephim135/workout-tracker/model"

	"gorm.io/gorm"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateAccessToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"id": userID,
		"exp": time.Now().Add(time.Minute * 8).Unix(), // 8 minutes
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.Config("SECRET_KEY")))
}

func GenerateRefreshToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"id": userID,
		"exp": time.Now().Add(time.Hour * 30 * 24).Unix(), // 30 days
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.Config("SECRET_KEY_REFRESH_TOKEN")))
}

func HashToken(rawToken string) string {
	hashed := sha256.Sum256([]byte(rawToken))
	return hex.EncodeToString(hashed[:])
}

func storeRefreshToken(db *gorm.DB, userID uint, rawToken string) error {
	hashed := HashToken(rawToken)
	expiresAt := time.Now().Add(30 * 24 * time.Hour)

	token := model.RefreshToken{
		ExpiresAt: expiresAt,	
		HashedToken: hashed,
		UserID: userID,
	}

	// delete old refresh tokens (optional)
	db.Where("user_id = ?", userID).Delete(&model.RefreshToken{})

	return db.Create(&token).Error
}