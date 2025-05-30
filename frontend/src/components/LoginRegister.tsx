import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginRegister = () => {
  const { isLoggedIn, logout } = useAuth();

  if (isLoggedIn) {
    return (
      <button
        onClick={logout}
        className="px-3 py-2 text-center text-base font-bold hover:underline"
      >
        Logout
      </button>
    );
  }

  return (
    <div className="hidden space-x-4 lg:flex">
      <Link
        to="/login"
        className="px-3 py-2 text-center text-base font-bold hover:underline"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-3 py-2 text-center text-base font-bold hover:underline"
      >
        Register
      </Link>
    </div>
  );
};

export default LoginRegister;
