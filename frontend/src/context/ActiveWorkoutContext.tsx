import { ReactNode, useState } from "react";
import type { ExerciseEntry, WorkoutSet, ActiveWorkout } from "./types";
import { ActiveWorkoutContext } from "./useActiveWorkout.tsx";
import { useAuth } from "./AuthContext.tsx";

export const ActiveWorkoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // initialize the activeWorkout
  const { userId } = useAuth();
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout>({
    userId: userId, // get from context
    startedAt: new Date().toISOString(),
    exerciseEntries: [],
    status: "active",
  });

  const defaultSet: WorkoutSet = {
    setNumber: 1,
    reps: 8,
    weight: 0,
    setType: "working",
    completed: false,
  };

  const setStatus = (status: "completed" | "active") => {
    setActiveWorkout((prev) => ({
      ...prev,
      status: status,
    }));
  };

  const addExercise = (newExercise: ExerciseEntry) => {
    setActiveWorkout((prev) => {
      // check if the Exercise is already in the active Workout
      const alreadyExists = prev.exerciseEntries.some(
        (exercise) => exercise.name === newExercise.name,
      );
      if (alreadyExists) return prev; // return without adding new exercise

      const exerciseWithDefaults = {
        ...newExercise,
        sets: [defaultSet, defaultSet],
      };

      return {
        ...prev,
        exerciseEntries: [...prev.exerciseEntries, exerciseWithDefaults],
      };
    });
  };

  const removeExercise = (name: string) => {
    setActiveWorkout((prev) => ({
      ...prev,
      exerciseEntries: prev.exerciseEntries.filter(
        (exercise) => exercise.name !== name,
      ),
    }));
  };

  const addSet = (newSet: WorkoutSet, exerciseName: string) => {
    setActiveWorkout((prev) => ({
      ...prev,
      exerciseEntries: prev.exerciseEntries.map((exercise) => {
        if (exercise.name === exerciseName) {
          return {
            ...exercise,
            sets: [...exercise.sets, newSet],
          };
        }
        return exercise;
      }),
    }));
  };

  const updateSet = (
    index: number,
    updatedSet: WorkoutSet,
    exerciseName: string,
  ) => {
    setActiveWorkout((prev) => ({
      ...prev,
      exerciseEntries: prev.exerciseEntries.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = [...exercise.sets];
          updatedSets[index] = updatedSet;
          return {
            ...exercise,
            sets: updatedSets,
          };
        }
        return exercise;
      }),
    }));
  };

  const removeSet = (setIndex: number, exerciseName: string) => {
    setActiveWorkout((prev) => {
      return {
        ...prev,
        exerciseEntries: prev.exerciseEntries.map((exercise) => {
          // skip exercises we dont want to edit
          if (exerciseName !== exercise.name) return exercise;
          // prevent removing if only 1 set left
          if (exercise.sets.length === 1) return exercise;

          return {
            ...exercise,
            sets: exercise.sets.filter((_, idx) => idx !== setIndex),
          };
        }),
      };
    });
  };

  const saveActiveWorkout = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(activeWorkout),
      });

      console.log(JSON.stringify(activeWorkout));

      if (!res.ok) {
        throw new Error("Failed to save workout!");
      }

      const data = await res.json();
      console.log("Workout saved: ", data);
    } catch (err) {
      console.error("Error saving workout:", err);
    }
  };

  const clearActiveWorkout = () => {
    setActiveWorkout({
      userId: 0,
      startedAt: new Date().toISOString(),
      exerciseEntries: [],
      status: "active",
    });
  };

  return (
    <ActiveWorkoutContext.Provider
      value={{
        activeWorkout,
        removeSet,
        addExercise,
        removeExercise,
        addSet,
        updateSet,
        saveActiveWorkout,
        clearActiveWorkout,
        setStatus,
      }}
    >
      {children}
    </ActiveWorkoutContext.Provider>
  );
};
