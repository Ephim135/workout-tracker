import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-500 flex items-center justify-between h-16 px-6 mt-2 rounded mb-6">
      <a className="font-bold text-xl">LOGO</a>
      <div className="flex space-x-6 text-xl">
        <Link to={"/"}>Home</Link>
        <Link to={"/workout"}>Workout</Link>
        <Link to={"/about"}>About</Link>
      </div>
      <div className="flex space-x-4">
        <Link
          to={"/login"}
          className="bg-blue-400 text-black px-3 py-1 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="bg-blue-400 text-black px-3 py-1 rounded hover:bg-blue-600"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
