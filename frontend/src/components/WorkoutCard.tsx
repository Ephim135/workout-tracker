import { useActiveWorkout } from "../context/useActiveWorkout";
import type { WorkoutSet } from "../context/types";
import Timer from "./Timer.tsx";
import { useState } from "react";

type WorkoutCardProps = {
  name: string;
};

type WorkoutSetRowProps = {
  index: number;
  set: WorkoutSet;
  onChange: (
    index: number,
    field: "reps" | "weight" | "setType",
    value: string,
  ) => void;
  onCheckbox: (index: number, checked: boolean) => void;
};

const gridLayout =
  "items-center grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] gap-4";

function WorkoutCard({ name = "Default Squad" }: WorkoutCardProps) {
  const [note, setNote] = useState<string>("");
  const [notes, setNotes] = useState<boolean>(false);
  const {
    activeWorkout,
    addSet,
    removeSet,
    removeExercise,
    updateSet,
    updateNotes,
  } = useActiveWorkout();

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

  const handleToggleNotes = () => {
    setNotes(!notes);
  };

  const handleSaveNotes = (note: string) => {
    // toggle Notes
    setNotes(!notes);
    // save Notes to context
    updateNotes(name, note);
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
      <div className="flex">
        <h1 className="text-xl font-bold text-black">{name}</h1>
        <button
          className="btn-xs btn ml-auto border-none bg-transparent text-2xl text-black shadow-none"
          onClick={handleRemoveCard}
        >
          x
        </button>
      </div>
      {notes ? (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            className="w-full rounded border-3 px-2 py-1 text-black placeholder-black focus:border-blue-500 focus:shadow-md focus:outline-none"
            placeholder="Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button onClick={() => handleSaveNotes(note)} className="btn">
            Save & Hide
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-1 flex items-center">
        <button className="btn" onClick={handleAddSet}>
          Set +
        </button>
        {notes ? (
          <></>
        ) : (
          <button className="btn ml-1" onClick={handleToggleNotes}>
            Notes
          </button>
        )}
        <div className="ml-auto">
          <Timer></Timer>
        </div>
      </div>
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

function WorkoutSetRow({
  index,
  set,
  onChange,
  onCheckbox,
}: WorkoutSetRowProps) {
  return (
    <div className={`${gridLayout} mt-3`}>
      <select
        className="rounded border"
        value={set.setType}
        onChange={(e) => {
          onChange(index, "setType", e.target.value);
        }}
      >
        <option value="warmup">WarmUp</option>
        <option value="dropset">Drop</option>
        <option value="working">Normal</option>
        <option value="delete">Delete</option>
      </select>
      <p className="text-center">{index + 1}</p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={3}
        pattern="[0-9]*"
        value={set.reps}
        className="w-full rounded border-1 border-black text-center text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "reps", e.target.value)}
      ></input>
      <input
        type="text"
        inputMode="numeric"
        maxLength={3}
        pattern="[0-9]*"
        value={set.weight}
        className="w-full rounded border-1 border-black text-center text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "weight", e.target.value)}
      ></input>
      <div className="flex justify-evenly">
        <input
          type="checkbox"
          className="checkbox checkbox-md checkbox-neutral"
          checked={set.completed}
          onChange={(e) => onCheckbox(index, e.target.checked)}
        />
      </div>
    </div>
  );
}
