import { useContext, ReactNode, createContext, useState } from "react";

interface ActiveWorkoutContext {
  activeWorkout: ActiveWorkout;
  addExercise: (newExercise: ExerciseEntry) => void;
  removeExercise: (name: string) => void;
  addSet: (newSet: WorkoutSet, name: string) => void;
  removeSet: (setIndex: number, exerciseName: string) => void;
  updateSet: (
    index: number,
    updatedSet: WorkoutSet,
    exerciseName: string,
  ) => void;
  saveActiveWorkout: () => void;
  clearActiveWorkout: () => void;
  setStatus: (status: "active" | "completed") => void;
}

export interface ActiveWorkout {
  userId: number;
  startedAt: string; // or Date if you're working directly with Date objects
  notes?: string;
  exerciseEntries: ExerciseEntry[];
  status: "active" | "completed";
}

export interface ExerciseEntry {
  exerciseId: number;
  name: string; // not optional cause we need name for Workout card
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  reps: string;
  weight: string;
  setType: "warmup" | "working" | "dropset";
  completed: boolean;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContext | undefined>(
  undefined,
);

export const ActiveWorkoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // initialize the activeWorkout
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout>({
    userId: 0,
    startedAt: new Date().toISOString(),
    exerciseEntries: [],
    status: "active",
  });

  const defaultSet: WorkoutSet = {
    reps: "8",
    weight: "",
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

export const useActiveWorkout = () => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error(
      "useActiveWorkout must be used within an ActiveWorkoutProvider",
    );
  }
  return context;
};
