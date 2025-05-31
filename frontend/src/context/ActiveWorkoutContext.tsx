import { ReactNode, useState } from "react";
import type { ExerciseEntry, WorkoutSet, ActiveWorkout } from "./types";
import { ActiveWorkoutContext } from "./useActiveWorkout.tsx";
import { useAuth } from "./AuthContext.tsx";
import { defaultSet } from "../lib/helper.ts";

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
        sets: [defaultSet(1), defaultSet(2)],
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

  const swapExercises = (index1: number, index2: number) => {
    setActiveWorkout((prev) => {
      const updated = [...prev.exerciseEntries];
      // bounds check
      if (
        index1 < 0 ||
        index2 < 0 ||
        index1 >= updated.length ||
        index2 >= updated.length
      )
        return prev;
      // swap
      [updated[index1], updated[index2]] = [updated[index2], updated[index1]];
      return {
        ...prev,
        exerciseEntries: updated,
      };
    });
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
      userId: userId,
      startedAt: new Date().toISOString(),
      exerciseEntries: [],
      status: "active",
    });
  };

  const updateNote = (name: string, note: string) => {
    setActiveWorkout((prev) => {
      return {
        ...prev,
        exerciseEntries: prev.exerciseEntries.map((exercise) => {
          // skip exercises we dont want to edit
          if (name !== exercise.name) return exercise;
          // put the exercise back in place then update the note
          return {
            ...exercise,
            notes: note,
          };
        }),
      };
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
        updateNote,
        swapExercises,
      }}
    >
      {children}
    </ActiveWorkoutContext.Provider>
  );
};
