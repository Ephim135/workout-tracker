package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
)

var DB *sql.DB

func InitDB() {
	var err error
	dsn := "backenduser:Interfeci47!@tcp(localhost:3306)/workout_tracker"

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}

	// Test the database connection
	if err := DB.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MySQL!")
}
