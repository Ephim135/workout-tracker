import { WorkoutSet, useActiveWorkout } from "../context/ActiveWorkoutContext";

type WorkoutCardProps = {
  name: string;
};

type WorkoutSetRowProps = {
  index: number;
  set: WorkoutSet;
  onChange: (index: number, field: "reps" | "weight", value: string) => void;
  onRemove: (index: number) => void;
};

const gridLayout =
  "items-center grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] gap-4";

function WorkoutCard({ name }: WorkoutCardProps) {
  const { activeWorkout, addSet, removeSet, removeExercise } =
    useActiveWorkout();

  const exercise = activeWorkout.exerciseEntries.find(
    (entry) => entry.name === name,
  );

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  const handleAddSet = () => {
    const newSet: WorkoutSet = {
      reps: 0,
      weight: 0,
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

  const handleSetChange = (
    index: number,
    field: "reps" | "weight",
    value: string,
  ) => {
    const updatedSet: WorkoutSet = { ...exercise.sets[index], [field]: value };
    addSet(updatedSet, name);
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
      <h3></h3>
    </div>
  );
}

function WorkoutSetRow({ index, set, onChange, onRemove }: WorkoutSetRowProps) {
  return (
    <div className={`${gridLayout} mt-3`}>
      <select
        className="rounded border p-1"
        value={set.setType}
        onChange={(e) => onChange(index, "setType", e.target.value)}
      >
        <option value="warmup">W</option>
        <option value="drop">D</option>
        <option value="normal">{index + 1}</option>
      </select>
      <p className="text-center">no</p>
      <input
        value={set.reps}
        type="text"
        className="w-full rounded border-2 border-black text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "reps", e.target.value)}
      ></input>
      <input
        value={set.weight}
        type="text"
        className="w-full rounded border-2 border-black text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "weight", e.target.value)}
      ></input>
      <button
        className="btn border-none bg-transparent text-red-700 shadow-none"
        onClick={() => onRemove(index)}
      >
        X
      </button>
    </div>
  );
}
