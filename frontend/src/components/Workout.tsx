import React, { useState } from "react";

interface ExerciseCardProps {
  name: string;
  description: string;
  image: string;
}

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
    image: "https://source.unsplash.com/200x200/?squat",
  },
  {
    id: 3,
    name: "Deadlift",
    description: "Works the entire posterior chain.",
    image: "https://source.unsplash.com/200x200/?deadlift",
  },
];

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-4 w-auto text-black mb-3 bg-secondary">
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />
      <p className="text-sm text-gray-300 mt-1">{description}</p>
      <input
        className="btn btn-primary btn-lg mx-auto d-block"
        type="button"
        value="Add Exercise to Workout"
        name="addExerciseButton"
      />
    </div>
  );
};

const Workout: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const start = 0;
  const end = 3;

  const addExercises = () => {
    setExercises(allExercises.slice(start, end));
  };

  return (
    <div>
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
        exercises.map((exercise: Exercise) => (
          <ExerciseCard
            name={exercise.name}
            description={exercise.description}
            image={exercise.image}
          />
        ))
      )}
    </div>
  );
};

export default Workout;
