import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 m-0 p-0 box-border">
      <h1>
        Not Found Page{" "}
        <img className="inline h-8 w-8" src="src/assets/RedX.svg" alt="Red-X" />
      </h1>
      <Link to={"/"}>
        <button className="bg-red-800 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg shadow">
          Go back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
