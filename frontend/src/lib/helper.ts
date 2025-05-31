import type { WorkoutSet } from "../context/types";
import { DEFAULT_REPS, DEFAULT_WEIGHT, DEFAULT_SET_TYPE } from "./Constants.ts";

export function defaultSet(setNumber: number) {
  const defaultSet: WorkoutSet = {
    setNumber: setNumber,
    reps: DEFAULT_REPS,
    weight: DEFAULT_WEIGHT,
    setType: DEFAULT_SET_TYPE,
    completed: false,
  };

  return defaultSet;
}
