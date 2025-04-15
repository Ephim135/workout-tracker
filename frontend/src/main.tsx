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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
