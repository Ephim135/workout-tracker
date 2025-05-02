import WorkoutCard from "../components/WorkoutCard";
import { useActiveWorkout } from "../context/ActiveWorkoutContext";

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
    </div>
    // button to finish the workout
    // button to add Exercises
  );
}
