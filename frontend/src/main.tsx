import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NotFound from "./components/NotFound.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameCanvas from "./components/GameCanvas.tsx";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Workout from "./pages/Workout.tsx";
import WorkoutSelection from "./pages/WorkoutSelection.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import Register from "./pages/Register.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/game", element: <GameCanvas /> },
      { path: "/workout", element: <Workout /> },
      { path: "/workoutSelection", element: <WorkoutSelection /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
