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
  updateNote: (exerciseName: string, note: string) => void;
}

export interface ActiveWorkout {
  userId: number | null;
  startedAt: string; // or Date if you're working directly with Date objects
  exerciseEntries: ExerciseEntry[];
  status: "active" | "completed";
}

export interface ExerciseEntry {
  exerciseId: number;
  name: string; // not optional cause we need name for Workout card
  notes: string;
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight: number;
  setType: "warmup" | "working" | "dropset";
  completed: boolean;
}
