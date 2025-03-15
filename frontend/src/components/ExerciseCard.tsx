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
    <div className="card d-flex flex-column align-items-center">
      <img
        src={image}
        alt={name}
        className="card-img-top p-2 rounded-3"
        style={{ width: "200px", height: "200px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <input
          className="btn btn-primary btn-lg mx-auto d-block"
          type="button"
          value="addExercise"
          name="addExerciseButton"
        />
      </div>
    </div>
  );
};

export default ExerciseCard;
