import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function MobileNavigation() {
  const { isLoggedIn, logout } = useAuth();

  if (isLoggedIn) {
    return (
      <button
        onClick={logout}
        className="w-24 rounded bg-indigo-600 px-3 py-2 text-center font-bold hover:bg-indigo-400"
      >
        Logout
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Link
        to="/login"
        className="w-24 rounded bg-indigo-600 px-3 py-2 text-center font-bold hover:bg-indigo-400"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="w-24 rounded bg-indigo-600 px-3 py-2 text-center font-bold hover:bg-indigo-400"
      >
        Register
      </Link>
      <Link
        to="/register"
        className="w-24 rounded bg-indigo-600 px-3 py-2 text-center font-bold hover:bg-indigo-400"
      >
        Profile
      </Link>
      <Link
        to="/register"
        className="w-24 rounded bg-indigo-600 px-3 py-2 text-center font-bold hover:bg-indigo-400"
      >
        Settings
      </Link>
      <Link
        to="/register"
        className="w-24 rounded bg-indigo-600 px-3 py-2 text-center font-bold hover:bg-indigo-400"
      >
        About
      </Link>
    </div>
  );
}
