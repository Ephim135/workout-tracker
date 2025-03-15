import React from "react";

interface ExerciseProps {
  name: string;
}

const Exercise: React.FC<ExerciseProps> = ({ name }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  );
};

export default Exercise;
