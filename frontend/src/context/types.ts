export interface ActiveWorkoutCtx {
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
  exerciseEntries: ExerciseEntry[];
  status: "active" | "completed";
}

export interface ExerciseEntry {
  name: string; // not optional cause we need name for Workout card
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  setNumber: number;
  reps: string | number;
  weight: string | number;
  setType: "warmup" | "working" | "dropset";
  completed: boolean;
}
