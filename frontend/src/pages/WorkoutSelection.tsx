import { useState, useEffect } from "react";
import ExerciseCard from "../components/ExerciseCard";

type ExerciseType = {
  name: string;
  description: string;
  target_muscles: string;
  instructions: string;
};

function WorkoutSelection() {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/exercise", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch exercise List");

        const data = await res.json();
        setExercises(data.data);
        console.log(data);
        console.log(exercises);
      } catch (err) {
        console.error("Error fetch exercise:", err);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2 className="text-center text-2xl">Workout Selection</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} {...exercise}></ExerciseCard>
        ))}
      </div>
    </div>
  );
}

export default WorkoutSelection;
