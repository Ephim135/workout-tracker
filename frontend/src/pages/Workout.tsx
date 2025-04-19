import WorkoutCard from "../components/WorkoutCard";
import { useState } from "react";

// import { Link } from "react-router-dom";

function Workout() {
  const [workout, setWorkout] = useState(0);

  return (
    <div className="flex justify-center">
      {/* <Link to={"/workoutSelection"}>Add Exercise</Link> */}
      <WorkoutCard name="Bench" />
    </div>
  );
}

export default Workout;
