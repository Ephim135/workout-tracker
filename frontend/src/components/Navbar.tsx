import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative mt-2 mb-6 flex h-16 items-center justify-between rounded bg-gray-500 px-6">
      <a className="text-xl font-bold">LOGO</a>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 space-x-6 text-xl">
        <Link to={"/"}>Home</Link>
        <Link to={"/workout"}>Workout</Link>
        <Link to={"/about"}>About</Link>
      </div>
      <div className="flex space-x-4">
        <Link
          to={"/login"}
          className="rounded bg-blue-400 px-3 py-1 text-black hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="rounded bg-blue-400 px-3 py-1 text-black hover:bg-blue-600"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
