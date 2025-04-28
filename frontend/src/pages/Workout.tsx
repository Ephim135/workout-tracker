import WorkoutCard from "../components/WorkoutCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Workout() {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/workoutSelection");
  }

  return (
    <div className="flex justify-center">
      <Link to={"/workoutSelection"}>Add Exercise</Link>
      <WorkoutCard name="Bench" />
    </div>
  );
}

export default Workout;
