import { useContext, ReactNode, createContext, useState } from "react";

interface ActiveWorkoutContext {
  activeWorkout: ActiveWorkout;
  addExercise: (newExercise: ExerciseEntry) => void;
  removeExercise: (name: string) => void;
  addSet: (newSet: WorkoutSet, name: string) => void;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  setType: "warmup" | "working" | "dropset";
  completed: boolean;
}

export interface ExerciseEntry {
  exerciseId: number;
  name: string; // optional: useful if you want to avoid extra lookups
  sets: WorkoutSet[];
}

export interface ActiveWorkout {
  userId: number;
  startedAt: string; // or Date if you're working directly with Date objects
  notes?: string;
  exerciseEntries: ExerciseEntry[];
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
  });

  const addExercise = (newExercise: ExerciseEntry) => {
    setActiveWorkout((prev) => ({
      ...prev,
      exerciseEntries: [...prev.exerciseEntries, newExercise],
    }));
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

  return (
    <ActiveWorkoutContext.Provider
      value={{ activeWorkout, addExercise, removeExercise, addSet }}
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
