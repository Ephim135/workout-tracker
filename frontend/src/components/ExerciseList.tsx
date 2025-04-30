import { useState } from "react";
import { Link } from "react-router-dom";

type ExerciseType = {
  name: string;
  target_muscles: string;
};

function ExerciseList({ name, target_muscles }: ExerciseType) {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };

  return (
    <div
      onClick={handleSelect}
      className="mb-1 flex w-full rounded-lg border p-1"
    >
      <h1>{name}</h1>
      <p>{target_muscles}</p>
      <Link to={"/exerciseDescription"} className="ml-auto">
        options
      </Link>
    </div>
  );
}

export default ExerciseList;
