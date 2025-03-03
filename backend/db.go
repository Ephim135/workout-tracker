package main

import (
	"log"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() {
	var err error
	dsn := "backenduser:Interfeci47!@tcp(localhost:3306)/workout_tracker"
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to databe:", err)
	}

	log.Println("Connected to MySQL!")
}
