import { WorkoutSet, useActiveWorkout } from "../context/ActiveWorkoutContext";

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
  onRemove: (index: number) => void;
};

const gridLayout =
  "items-center grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] gap-4";

function WorkoutCard({ name }: WorkoutCardProps) {
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
      reps: "",
      weight: "",
      setType: "working",
      completed: false,
    };
    addSet(newSet, name);
  };

  const handleRemoveSet = (index: number) => {
    removeSet(index, name);
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
    // check if input is numeric positve and smaller than 999 only if field is not setType
    if (!/^[0-9]{0,3}$/.test(value) && field !== "setType") {
      return;
    }

    const updatedSet: WorkoutSet = { ...exercise.sets[index] };

    if (field === "reps" || field === "weight") {
      updatedSet[field] = value || "";
    } else {
      updatedSet.setType = value as WorkoutSet["setType"];
    }

    console.log("Updating set", index, field, value);
    updateSet(index, updatedSet, name);
  };

  return (
    <div className="mb-2 max-w-xl rounded border bg-gray-400 p-2 text-black">
      <div className="flex">
        <h1 className="text-xl font-bold text-black">{name}</h1>
        <button className="btn-xs btn ml-auto" onClick={handleRemoveCard}>
          x
        </button>
      </div>

      <input
        type="text"
        className="mt-2 w-full rounded border-3 border-black px-2 py-1 text-black placeholder-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        placeholder="Notes"
      />
      <WorkoutSetRowHeaders />
      {exercise.sets.map((set, index) => (
        <WorkoutSetRow
          key={index}
          index={index}
          set={set}
          onChange={handleSetChange}
          onRemove={handleRemoveSet}
        />
      ))}
      <button className="btn mt-3 mr-3" onClick={handleAddSet}>
        Add Set
      </button>
      {/* <button className="btn mt-3 text-lg">Copy Last Workout</button> */}
    </div>
  );
}

export default WorkoutCard;

function WorkoutSetRowHeaders() {
  return (
    <div className={`${gridLayout} mt-3 border-b-3 pb-1 text-center`}>
      <h3>Set</h3>
      <h3 className="overflow-hidden whitespace-nowrap">prev.WO</h3>
      <h3>Reps</h3>
      <h3>Weight</h3>
      <h3>misc</h3>
      {/* make a settings wheel here */}
    </div>
  );
}

function WorkoutSetRow({ index, set, onChange, onRemove }: WorkoutSetRowProps) {
  return (
    <div className={`${gridLayout} mt-3`}>
      <select
        className="rounded border"
        value={set.setType}
        onChange={(e) => {
          console.log("Set Type Change:", e.target.value);
          onChange(index, "setType", e.target.value);
          console.log("setType: ", set.setType);
        }}
      >
        <option value="warmup">W</option>
        <option value="drop">D</option>
        <option value="working">Set {index + 1}</option>
      </select>
      <p className="text-center">{index + 1}</p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={3}
        pattern="[0-9]*"
        value={set.reps}
        className="w-full rounded border-2 border-black text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "reps", e.target.value)}
      ></input>
      <input
        type="text"
        inputMode="numeric"
        maxLength={2}
        pattern="[0-9]*"
        value={set.weight}
        className="w-full rounded border-2 border-black text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "weight", e.target.value)}
      ></input>
      <div className="flex justify-evenly border">
        <input
          type="checkbox"
          className="checkbox checkbox-md checkbox-neutral"
        />
        <button
          className="btn btn-xs bg-transparent text-red-700 shadow-none"
          onClick={() => onRemove(index)}
        >
          x
        </button>
      </div>
    </div>
  );
}
