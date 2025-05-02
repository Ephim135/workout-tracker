import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ActiveWorkoutProvider } from "./context/ActiveWorkoutContext.tsx";

export default function Layout() {
  return (
    <div className="mx-auto">
      <AuthProvider>
        <ActiveWorkoutProvider>
          <Navbar />
          <div className="mx-auto w-[80%] pt-18">
            <Outlet /> {/* renders the matched child route */}
          </div>
        </ActiveWorkoutProvider>
      </AuthProvider>
    </div>
  );
}
