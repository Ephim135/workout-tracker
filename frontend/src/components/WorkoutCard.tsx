import { useState } from "react";

type WorkoutCardProps = {
  name: string;
};

type WorkoutSet = {
  set: string;
  reps: string;
  weight: string;
};

type WorkoutSetRowProps = {
  index: number;
  reps: string;
  weight: string;
  onChange: (index: number, field: "reps" | "weight", value: string) => void;
  onRemove: (index: number) => void;
};

const gridLayout = "items-center grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4";

function WorkoutCard({ name }: WorkoutCardProps) {
  const [sets, setSets] = useState<WorkoutSet[]>([
    { set: "", reps: "", weight: "" },
  ]);

  const addSet = () => setSets([...sets, { set: "", reps: "", weight: "" }]);
  const removeSet = (index: number) => {
    setSets(sets.filter((_, i) => i !== index));
  };
  const updateSet = (index: number, field: keyof WorkoutSet, value: string) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  return (
    <div className="w-144 rounded border bg-gray-400 p-4 text-xl font-bold text-black">
      <h1 className="text-xl font-bold text-black">{name}</h1>
      <input
        type="text"
        className="mt-2 w-full rounded border-3 border-black px-2 py-1 text-xl font-bold text-black placeholder-black placeholder:text-xl placeholder:font-bold focus:border-blue-500 focus:shadow-md focus:outline-none"
        placeholder="Notes"
      />
      <WorkoutSetRowHeaders />
      {sets.map((set, index) => (
        <WorkoutSetRow
          key={index}
          index={index}
          reps={set.reps}
          weight={set.weight}
          onChange={updateSet}
          onRemove={removeSet}
        />
      ))}
      <button className="btn mt-3 mr-3 text-lg" onClick={addSet}>
        Add Set
      </button>
      {/* <button className="btn mt-3 text-lg">Copy Last Workout</button> */}
    </div>
  );
}

export default WorkoutCard;

function WorkoutSetRowHeaders() {
  return (
    <div className={`${gridLayout} mt-3 border-b-3 pb-1 text-left`}>
      <h3>Sets</h3>
      <h3>Prev. Workout</h3>
      <h3>Reps</h3>
      <h3>Weight</h3>
      <h3>Misc.</h3>
    </div>
  );
}

function WorkoutSetRow({
  index,
  reps,
  weight,
  onChange,
  onRemove,
}: WorkoutSetRowProps) {
  return (
    <div className={`${gridLayout} mt-3`}>
      <span className="text-center">{index + 1}</span>
      {/* <select name="" id="" className="rounded border p-1">
        <option value="warmup">W</option>
        <option value="drop">D</option>
        <option value="normal">1</option>
      </select> */}
      <p className="">no Value</p>
      <input
        value={reps}
        type="text"
        className="w-full rounded border-2 border-black px-2 py-1 text-xl font-bold text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "reps", e.target.value)}
      ></input>
      <input
        value={weight}
        type="text"
        className="w-full rounded border-2 border-black px-2 py-1 text-xl font-bold text-black focus:border-blue-500 focus:shadow-md focus:outline-none"
        onChange={(e) => onChange(index, "reps", e.target.value)}
      ></input>
      <button
        className="btn text-xl font-bold text-red-700"
        onClick={() => onRemove(index)}
      >
        X
      </button>
    </div>
  );
}
