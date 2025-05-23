import WorkoutCard from "../components/WorkoutCard";
import { useActiveWorkout } from "../context/useActiveWorkout";
import { Link } from "react-router-dom";

export default function ActiveWorkout() {
  // get the currently running workout
  const { activeWorkout, saveActiveWorkout, clearActiveWorkout, setStatus } =
    useActiveWorkout();

  const handleFinishWorkout = () => {
    setStatus("completed"); // sets the status to completed
    saveActiveWorkout();
    clearActiveWorkout();
    // clear activeWorkoutContext
    // send data to backend save activeWorkout
    // navigate to workout side
  };

  return (
    // map over Exercises in the current Workout display them with ExerciseCards
    <div className="flex flex-col items-center">
      {activeWorkout.exerciseEntries.map((exercise, index) => (
        <WorkoutCard key={index} name={exercise.name} />
      ))}
      <Link
        to="/workout/selection"
        className="my-2 w-full max-w-xl transform rounded-sm bg-green-600 py-2 text-center font-bold duration-300 hover:bg-green-500"
      >
        Add Exercise
      </Link>
      <button
        type="button"
        className="w-full max-w-xl transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-500"
        onClick={handleFinishWorkout}
      >
        Finish Workout
      </button>
    </div>
  );
}
