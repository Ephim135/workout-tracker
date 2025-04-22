import { useState } from "react";

type ExerciseCardProps = {
  name: string;
  description: string;
  target_muscles: string;
  instructions: string;
};

function ExerciseCard({
  name,
  description,
  target_muscles,
  instructions,
}: ExerciseCardProps) {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };

  return (
    <div className="flex max-w-[300px] flex-col justify-between rounded-lg border p-4">
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>
      <p className="mb-2 text-sm text-gray-400">{description}</p>
      <p className="mb-2 text-sm text-gray-400">{instructions}</p>
      <p className="mb-2 text-sm">
        <strong>Target:</strong> {target_muscles}
      </p>
      <button
        onClick={handleSelect}
        className={`rounded-lg px-4 py-2 text-white ${
          selected ? "bg-green-600" : "bg-blue-600"
        }`}
      >
        {selected ? "Selected" : "Choose Exercise"}
      </button>
    </div>
  );
}

export default ExerciseCard;
