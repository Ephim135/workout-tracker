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

func SeedExercises(DB *gorm.DB) {
	// Check if exercises already exist
	var count int64
	DB.Model(&model.Exercise{}).Count(&count)
	if count > 0 {
		log.Println("Exercises already seeded, skipping...")
		return
	}

	log.Println("Seeding exercises...")
	var exercises = []model.Exercise{
		{
			Name:         "Squat",
			Description:  "A fundamental leg exercise that targets multiple muscle groups.",
			TargetMuscles: "quadriceps, glutes, hamstrings, calves",
			Instructions: `1. Stand with feet shoulder-width apart.
	2. Lower your hips down and back as if sitting.
	3. Keep your chest up and knees behind toes.
	4. Drive through your heels to return to standing.`,
			ImageURL:     "https://example.com/images/squat.jpg",
		},
		{
			Name:         "Lunges",
			Description:  "A unilateral leg exercise to improve balance and strength.",
			TargetMuscles: "quadriceps, glutes, hamstrings, calves",
			Instructions: `1. Step forward with one leg.
	2. Lower your body until both knees are at 90 degrees.
	3. Push back to the starting position and switch legs.`,
			ImageURL:     "https://example.com/images/lunges.jpg",
		},
		{
			Name:         "Leg Press",
			Description:  "A machine-based compound movement for building lower-body strength.",
			TargetMuscles: "quadriceps, glutes, hamstrings",
			Instructions: `1. Sit in the leg press machine.
	2. Place your feet shoulder-width on the platform.
	3. Lower the platform toward you, then push it back up.`,
			ImageURL:     "https://example.com/images/legpress.jpg",
		},
		{
			Name:         "Romanian Deadlift",
			Description:  "A hip-hinge movement to strengthen the posterior chain.",
			TargetMuscles: "hamstrings, glutes, lower back",
			Instructions: `1. Stand with feet hip-width, holding a barbell.
	2. Hinge at the hips, lowering the bar along your legs.
	3. Keep your back straight and return to the start.`,
			ImageURL:     "https://example.com/images/romaniandeadlift.jpg",
		},
		{
			Name:         "Bulgarian Split Squat",
			Description:  "A single-leg squat with rear foot elevated to target stability and strength.",
			TargetMuscles: "quads, glutes, hamstrings",
			Instructions: `1. Place your rear foot on a bench behind you.
	2. Lower your front leg until the thigh is parallel to the floor.
	3. Push through the heel to return up.`,
			ImageURL:     "https://example.com/images/bulgarian.jpg",
		},
		{
			Name:         "Leg Curl",
			Description:  "An isolation exercise to train hamstrings.",
			TargetMuscles: "hamstrings",
			Instructions: `1. Lie face down on the leg curl machine.
	2. Curl your legs upward toward your glutes.
	3. Lower slowly to starting position.`,
			ImageURL:     "https://example.com/images/legcurl.jpg",
		},
		{
			Name:         "Leg Extension",
			Description:  "An isolation machine movement for targeting the quads.",
			TargetMuscles: "quadriceps",
			Instructions: `1. Sit on the leg extension machine.
	2. Extend your legs fully and squeeze the quads.
	3. Lower back down with control.`,
			ImageURL:     "https://example.com/images/legextension.jpg",
		},
		{
			Name:         "Step-ups",
			Description:  "A functional movement mimicking stair climbing.",
			TargetMuscles: "quads, glutes, hamstrings",
			Instructions: `1. Step onto a box or bench with one foot.
	2. Push through the heel to rise up.
	3. Lower back down and repeat with other leg.`,
			ImageURL:     "https://example.com/images/stepups.jpg",
		},
		{
			Name:         "Hip Thrust",
			Description:  "A glute-focused movement performed using a bench and barbell.",
			TargetMuscles: "glutes, hamstrings",
			Instructions: `1. Sit on the floor with your upper back on a bench.
	2. Roll a barbell over your hips.
	3. Thrust your hips upward and squeeze the glutes.`,
			ImageURL:     "https://example.com/images/hipthrust.jpg",
		},
		{
			Name:         "Calf Raise",
			Description:  "An isolation exercise to develop the calf muscles.",
			TargetMuscles: "calves",
			Instructions: `1. Stand with feet shoulder-width apart.
	2. Raise your heels to stand on your toes.
	3. Lower back down slowly.`,
			ImageURL:     "https://example.com/images/calfraise.jpg",
		},
	}

	for _, ex := range exercises {
		DB.Create(&ex)
	}
	log.Println("✅ Seed complete.")
}