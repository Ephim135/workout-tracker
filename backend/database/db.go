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

var modelsDrop = []interface{}{ // expected declaration found modelsDrop
	&model.User{},
	&model.RefreshToken{},
	&model.Exercise{},
	&model.ExerciseEntry{},
	&model.Workout{},
	&model.WorkoutSet{},
}

var models = []interface{}{
	&model.User{},
	&model.RefreshToken{},
	&model.Exercise{},
	&model.ExerciseEntry{},
	&model.Workout{},
	&model.WorkoutSet{},
}

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

	// Dropping Tabels
	for _, model := range modelsDrop {
		if err := DB.Migrator().DropTable(model); err != nil {
			log.Printf("Error dropping Table for %T: %s", model, err)
		}
	}

	// Migrating Tables
	for _, model := range models {
		if err := DB.AutoMigrate(model); err != nil {
			log.Printf("Error Migrate Table for %T: %s",model, err)
		}
	}

	log.Println("Connected to MySQL! // Migrate successful")

	// add Data to DB
	SeedExercises(DB)
}

