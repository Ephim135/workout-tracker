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
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s",
	config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_HOST"), port, config.Config("DB_NAME"))
	fmt.Print(dsn)

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to databe:", err)
	}

	DB.AutoMigrate(&model.User{})
	log.Println("Connected to MySQL!")
}
