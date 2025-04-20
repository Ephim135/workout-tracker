package database

import (
	"fmt"
	"log"
	"strconv"

	"github.com/Ephim135/workout-tracker/config"
	"github.com/Ephim135/workout-tracker/model"
	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	p := config.Config("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32) 
	if err != nil {
		panic("failed to parse databae port")
	}

	// dsn := "backenduser:Interfeci47!@tcp(localhost:3306)/workout_tracker"
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=true&charset=utf8mb4&collation=utf8mb4_unicode_ci",
	config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_HOST"), port, config.Config("DB_NAME"))

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to databe:", err)
	}

	// Deletes user Table
	if err := DB.Migrator().DropTable(&model.User{}); err != nil {
		log.Println("Error dropping users table", err)
	}

	// Creates new user Table
	if err := DB.AutoMigrate(&model.User{}); err != nil {
		log.Println("Error Migrate User Table", err)
	}

	if err := DB.AutoMigrate(&model.Exercise{}); err != nil {
		log.Println("Error Migrate Exercise Table", err)
	}

	if err := DB.AutoMigrate(&model.ExerciseEntry{}); err != nil {
		log.Println("Error Migrate ExerciseEntry Table", err)
	}

	if err := DB.AutoMigrate(&model.Workout{}); err != nil {
		log.Println("Error Migrate Workout Table", err)
	}

	if err := DB.AutoMigrate(&model.WorkoutSet{}); err != nil {
		log.Println("Error Migrate WorkoutSet Table", err)
	}

	log.Println("Connected to MySQL! // Migrate successful")

	SeedExercises(DB)
}