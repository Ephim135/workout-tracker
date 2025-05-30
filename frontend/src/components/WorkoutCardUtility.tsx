import Timer from "./Timer.tsx"; // Assuming Timer is a component in the same dir
import { useState } from "react";
import { useActiveWorkout } from "../context/useActiveWorkout.tsx";

type WorkoutCardUtilityProps = {
  handleAddSet: () => void;
  name: string;
};

export default function WorkoutCardUtility({
  handleAddSet,
  name,
}: WorkoutCardUtilityProps) {
  const [noteVisible, setNoteVisible] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const { updateNote } = useActiveWorkout();

  const handleSaveNote = (name: string) => {
    setNoteVisible(false);
    updateNote(name, note); // value of the input
  };

  return (
    <div className="w-full">
      {noteVisible && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            className="w-full rounded border-3 px-2 py-1 text-black placeholder-black focus:border-blue-500 focus:shadow-md focus:outline-none"
            placeholder="Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button onClick={() => handleSaveNote(name)} className="btn">
            Save & Hide
          </button>
        </div>
      )}
      <div className="mt-1 flex items-center">
        <button className="btn" onClick={handleAddSet}>
          Set +
        </button>
        {!noteVisible && (
          <button className="btn ml-1" onClick={() => setNoteVisible(true)}>
            Notes
          </button>
        )}
        <div className="ml-auto">
          <Timer />
        </div>
      </div>
    </div>
  );
}
