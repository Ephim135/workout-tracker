import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext.tsx";

export default function Layout() {
  return (
    <div className="mx-auto w-[95%] md:w-[80%]">
      <AuthProvider>
        <Navbar />
        <div className="mx-auto w-[80%]">
          <Outlet /> {/* renders the matched child route */}
        </div>
      </AuthProvider>
    </div>
  );
}
