import { useState } from "react";
import { Link } from "react-router-dom";
import { useActiveWorkout } from "../context/useActiveWorkout";

type ExerciseType = {
  name: string;
  target_muscles: string;
  id: number;
};

function ExerciseList({ name, target_muscles, id }: ExerciseType) {
  const [selected, setSelected] = useState(false);
  const activeWorkoutContext = useActiveWorkout();

  const handleSelect = () => {
    // when the exercise gets selected it will be added to context state
    if (!selected) {
      activeWorkoutContext.addExercise({
        exerciseId: id,
        name: name,
        sets: [],
        notes: "",
      });
    }
    setSelected(!selected);
  };

  return (
    <div
      onClick={handleSelect}
      className={`mb-0.5 flex w-full max-w-xl items-center rounded-lg border p-1.5 ${selected ? "bg-emerald-700 text-black" : ""}`}
    >
      <h1 className="overflow-hidden font-bold whitespace-nowrap">{name}</h1>
      <p className="overflow-hidden px-2 text-gray-400">
        {target_muscles.split(", ")[0]}
      </p>
      <Link
        to={"/exerciseDescription"}
        className="ml-auto px-5 text-2xl font-bold text-gray-400 hover:underline"
      >
        ⋮
      </Link>
    </div>
  );
}

export default ExerciseList;
