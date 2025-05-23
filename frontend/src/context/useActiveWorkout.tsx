import { useContext, createContext } from "react";
import type { ActiveWorkoutCtx } from "./types.ts";

export const ActiveWorkoutContext = createContext<ActiveWorkoutCtx | undefined>(
  undefined,
);

export const useActiveWorkout = () => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error(
      "useActiveWorkout must be used within an ActiveWorkoutProvider",
    );
  }
  return context;
};
