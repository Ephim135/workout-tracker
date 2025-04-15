import WorkoutCard from "../components/WorkoutCard";
import { Link } from "react-router-dom";

function Workout() {
  return (
    <div>
      <Link to={"/workoutSelection"}>Add Exercise</Link>
      <WorkoutCard name="Bench" />
    </div>
  );
}
export default Workout;
