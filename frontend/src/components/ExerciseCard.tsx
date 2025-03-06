import React from "react";

interface ExerciseCardProps {
  name: string;
  description: string;
  image: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-4 w-auto text-black mb-3 bg-secondary">
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />
      <p className="text-sm text-gray-300 mt-1">{description}</p>
      <input
        className="btn btn-primary btn-lg mx-auto d-block"
        type="button"
        value="addExercise"
        name="addExerciseButton"
      />
    </div>
  );
};

export default ExerciseCard;
