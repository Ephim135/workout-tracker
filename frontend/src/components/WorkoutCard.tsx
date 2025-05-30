import { useActiveWorkout } from "../context/useActiveWorkout";
import type { WorkoutSet } from "../context/types";
import WorkoutSetRow from "./WorkoutSetRow.tsx";
import WorkoutCardHeader from "./WorkoutCardHeader.tsx";
import WorkoutCardUtility from "./WorkoutCardUtility.tsx";

type WorkoutCardProps = {
  name: string;
};

function WorkoutCard({ name = "Default Squad" }: WorkoutCardProps) {
  const { activeWorkout, addSet, removeSet, removeExercise, updateSet } =
    useActiveWorkout();

  const exercise = activeWorkout.exerciseEntries.find(
    (entry) => entry.name === name,
  );

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  const handleAddSet = () => {
    const newSet: WorkoutSet = {
      setNumber: exercise.sets.length + 1,
      reps: 8,
      weight: 0,
      setType: "working",
      completed: false,
    };
    addSet(newSet, name);
  };

  const handleRemoveCard = () => {
    removeExercise(name);
  };

  // update input fields weight reps and setType
  // changes ActiveWorkoutContext when value input field changes
  // it validates the input
  const handleSetChange = (
    index: number,
    field: "reps" | "weight" | "setType",
    value: string,
  ) => {
    if (field === "setType" && value === "delete") {
      removeSet(index, name);
      return;
    }
    // For reps and weight, convert string to number safely
    if (field === "reps" || field === "weight") {
      // Validate input is numeric (already done)
      if (!/^[0-9]{0,3}$/.test(value)) {
        return;
      }

      // Convert to number or zero if empty string
      const numericValue = value === "" ? 0 : Number(value);

      const updatedSet: WorkoutSet = {
        ...exercise.sets[index],
        [field]: numericValue,
      };
      updateSet(index, updatedSet, name);
    } else {
      // For setType (string)
      const updatedSet: WorkoutSet = {
        ...exercise.sets[index],
        setType: value as WorkoutSet["setType"],
      };
      updateSet(index, updatedSet, name);
    }
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedSet = { ...exercise.sets[index], completed: checked };
    updateSet(index, updatedSet, name);
  };

  return (
    <div className="mb-2 max-w-xl rounded border bg-gray-400 p-2 text-black">
      <WorkoutCardHeader
        name={name}
        handleRemoveCard={handleRemoveCard}
      ></WorkoutCardHeader>
      <WorkoutCardUtility
        handleAddSet={handleAddSet}
        name={name}
      ></WorkoutCardUtility>
      {exercise.sets.map((set, index) => (
        <WorkoutSetRow
          key={index}
          index={index}
          set={set}
          onChange={handleSetChange}
          onCheckbox={handleCheckboxChange}
        />
      ))}
    </div>
  );
}

export default WorkoutCard;
