import { Link } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="fixed top-0 left-1/2 z-50 mb-6 flex h-16 w-full max-w-3xl -translate-x-1/2 items-center justify-between rounded bg-gray-500 px-2 text-xl">
      <Link to={"/"} className="flex items-center font-bold">
        <img
          className="ml-2 inline"
          src="src/assets/gym.svg"
          width="42"
          height="42"
        />
      </Link>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 space-x-6 font-bold">
        <Link className="hover:underline" to={"/workout"}>
          Workout
        </Link>
        {isLoggedIn ? (
          <Link className="hover:underline" to={"/profile"}>
            Profile
          </Link>
        ) : (
          <></>
        )}
      </div>
      <LoginRegister></LoginRegister>
      <div className="lg:hidden">
        <Link to={"/mobileNavigation"}>
          <img src="src/assets/menu.svg" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
