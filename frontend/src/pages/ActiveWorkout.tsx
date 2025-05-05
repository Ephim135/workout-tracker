import WorkoutCard from "../components/WorkoutCard";
import { useActiveWorkout } from "../context/ActiveWorkoutContext";
import { Link } from "react-router-dom";

export default function ActiveWorkout() {
  // get the currently running workout
  const activeWorkoutContext = useActiveWorkout();

  return (
    // map over Exercises in the current Workout display them with ExerciseCards
    <div className="flex flex-col items-center">
      {activeWorkoutContext.activeWorkout.exerciseEntries.map(
        (exercise, index) => (
          <WorkoutCard key={index} name={exercise.name} />
        ),
      )}
      <button
        type="submit"
        className="w-full max-w-xl transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
      >
        Finish
      </button>
      <Link
        to="/workout/selection"
        className="fixed bottom-1 left-4/5 z-50 -translate-x-1/2 transform rounded-full bg-green-600 p-2 py-1 text-center font-bold text-white shadow-md hover:bg-blue-700"
      >
        Add Exercise
      </Link>
    </div>
  );
}
