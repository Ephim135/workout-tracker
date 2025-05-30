import { WorkoutSet } from "../context/types";
import { GRID_LAYOUT } from "../lib/Constants";

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

export default function WorkoutSetRow({
  index,
  set,
  onChange,
  onCheckbox,
}: WorkoutSetRowProps) {
  return (
    <div className={`${GRID_LAYOUT} mt-3`}>
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
