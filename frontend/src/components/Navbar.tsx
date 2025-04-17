import { Link } from "react-router-dom";
import LoginRegister from "./LoginRegister";

const Navbar = () => {
  return (
    <nav className="relative mt-2 mb-6 flex h-16 items-center justify-between rounded bg-gray-500 px-6">
      <a className="text-xl font-bold">LOGO</a>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 space-x-6 text-xl font-bold">
        <Link className="hover:underline" to={"/"}>
          Home
        </Link>
        <Link className="hover:underline" to={"/workout"}>
          Workout
        </Link>
        <Link className="hover:underline" to={"/about"}>
          About
        </Link>
      </div>
      <LoginRegister></LoginRegister>
    </nav>
  );
};

export default Navbar;
