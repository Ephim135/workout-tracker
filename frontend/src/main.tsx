import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NotFound from "./components/NotFound.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Workout from "./pages/Workout.tsx";
import WorkoutSelection from "./pages/WorkoutSelection.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import Register from "./pages/Register.tsx";
import ProfileForm from "./pages/ProfileForm.tsx";
import MobileNavigation from "./pages/MobileNavigation.tsx";
import ActiveWorkout from "./pages/ActiveWorkout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/workout", element: <Workout /> },
      { path: "/workout/selection", element: <WorkoutSelection /> },
      { path: "/workout/active", element: <ActiveWorkout /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profileForm", element: <ProfileForm /> },
      { path: "/mobileNavigation", element: <MobileNavigation /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
