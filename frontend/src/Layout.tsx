import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Layout() {
  return (
    <div className="w-[95%] md:w-[80%] mx-auto">
      <Navbar />
      <div className="w-[80%] mx-auto">
        <Outlet /> {/* renders the matched child route */}
      </div>
    </div>
  );
}
