import React from "react";

const Workout: React.FC = () => {
  return (
    <div className="container-fluid d-grid">
      <label htmlFor="addExerciseButton">
        <input
          className="btn btn-primary btn-lg mx-auto d-block"
          type="button"
          value="addExercise"
          name="addExerciseButton"
        />
      </label>
    </div>
  );
};

export default Workout;
