import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col py-10 space-y-6 items-center">
      <h1 className="text-3xl font-bold">Welcome to Your Fitness Tracker</h1>
      <p className="text-lg text-gray-700">
        Stay consistent, track progress, and make gains 💪
      </p>
      <div className="flex gap-4">
        <Link
          to="/workout"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Go to Workout Tracker
        </Link>
        <Link
          to="/game"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Play Game
        </Link>
      </div>
    </div>
  );
}
