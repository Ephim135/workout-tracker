import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="container">
      <nav className="navbar d-flex justify-content-between rounded-3 my-3 p-3">
        <span className="navbar-brand text-white">Peryton</span>
        <Link className="" to="/">
          Home
        </Link>
        <Link className="" to="/workout">
          Workout
        </Link>
        <div className="">
          <Link to="/register">Register</Link>
          <Link className="mx-3" to="/login">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
