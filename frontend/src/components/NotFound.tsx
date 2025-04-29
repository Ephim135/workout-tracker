import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="m-0 box-border flex h-[75vh] flex-col items-center justify-center space-y-4 p-0">
      <h1 className="text-center text-4xl text-red-700">Page Not Found </h1>
      <img className="h-16 w-16" src="src/assets/RedX.svg" alt="Red-X" />
      <Link to={"/"}>
        <button className="rounded-lg bg-red-800 px-4 py-2 font-semibold text-white shadow hover:bg-green-800">
          Go back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
