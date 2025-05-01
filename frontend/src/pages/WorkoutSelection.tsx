import { useState, useEffect } from "react";
import ExerciseList from "../components/ExerciseList";
import { Link } from "react-router-dom";

type ExerciseType = {
  name: string;
  description: string;
  target_muscles: string;
  instructions: string;
  id: number;
};

function WorkoutSelection() {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/exercise",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch exercise List");

        const data = await res.json();
        setExercises(data.data);
      } catch (err) {
        console.error("Error fetch exercise:", err);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-bold">Workout Selection</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {exercises.map((exercise, index) => (
          <ExerciseList key={index} {...exercise}></ExerciseList>
        ))}
      </div>
      <Link
        to="/workout/active"
        className="fixed bottom-1 left-1/2 z-50 w-[30%] -translate-x-1/2 transform rounded-full bg-blue-600 py-1 text-center font-bold text-white shadow-md hover:bg-blue-700"
      >
        +
      </Link>
    </div>
  );
}

export default WorkoutSelection;
