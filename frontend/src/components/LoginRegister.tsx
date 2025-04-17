import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginRegister = () => {
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
    <div className="flex space-x-4">
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
    </div>
  );
};

export default LoginRegister;
