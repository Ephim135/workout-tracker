import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-6 py-10">
      <h1 className="text-center text-3xl font-bold">
        Welcome to Your Fitness Tracker
      </h1>
      <p className="text-center text-lg text-gray-400">
        Stay consistent, track progress, and make gains 💪
      </p>
      <div className="flex gap-4">
        <Link
          to="/workout"
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Go to Workout Tracker
        </Link>
        {/* <Link
          to="/game"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Play Game
        </Link> */}
      </div>
    </div>
  );
}
