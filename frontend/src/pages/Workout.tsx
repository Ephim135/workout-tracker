// import WorkoutCard from "../components/WorkoutCard";
import { Link } from "react-router-dom";

function Workout() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-center">Start a Workout from a premade Template</h1>
        <ul className="gap my-2 flex flex-wrap justify-center gap-2">
          <button className="btn btn-primary">Push</button>
          <button className="btn btn-primary">Pull</button>
          <button className="btn btn-primary">Legs</button>
          <button className="btn btn-primary">Upper</button>
          <button className="btn btn-primary">Lower</button>
          <button className="btn btn-primary">Arms</button>
        </ul>
      </div>
      <div className="flex flex-col">
        <Link className="mt-5 mb-2" to={"/workout/selection"}>
          <button className="btn btn-success w-full">
            Start Empty Workout
          </button>
        </Link>
        <Link to={"/workout/selection"}>
          <button className="btn btn-warning w-full">
            Create a new Template
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Workout;
