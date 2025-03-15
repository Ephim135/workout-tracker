import React, { useState } from "react";
import ExerciseCard from "./ExerciseCard";

interface Exercise {
  id: number;
  name: string;
  description: string;
  image: string;
}

const allExercises: Exercise[] = [
  {
    id: 1,
    name: "Bench Press",
    description: "Targets chest, shoulders, and triceps.",
    image:
      "https://img.freepik.com/premium-vector/crossfit-workout-training-open-games-championship-sport-man-training-barbell-chest-bench-press_491904-75.jpg?semt=ais_hybrid",
  },
  {
    id: 2,
    name: "Squat",
    description: "Builds leg and glute strength.",
    image:
      "http://ecalegal.com/beta/wp-content/uploads/2014/03/placeholder-200x200.jpg",
  },
  {
    id: 3,
    name: "Deadlift",
    description: "Works the entire posterior chain.",
    image:
      "http://ecalegal.com/beta/wp-content/uploads/2014/03/placeholder-200x200.jpg",
  },
];

const Workout: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const start = 0;
  const end = 3;

  const addExercises = () => {
    setExercises(allExercises.slice(start, end));
  };

  return (
    <div className="container d-flex">
      {exercises.length == 0 ? (
        <label htmlFor="addExerciseButton">
          <input
            className="btn btn-primary btn-lg mx-auto d-block"
            type="button"
            value="addExercise"
            name="addExerciseButton"
            onClick={addExercises}
          />
        </label>
      ) : (
        <div className="card-deck">
          {exercises.map((exercise: Exercise) => (
            <ExerciseCard
              name={exercise.name}
              description={exercise.description}
              image={exercise.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Workout;
