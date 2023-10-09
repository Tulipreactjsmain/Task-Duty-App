import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, Error, GoogleCallback } from "../components";
import Tasks from "../pages/Tasks";
import Home from "../pages/Home";
import CreateTask from "../pages/CreateTask";
import UpdateTask from "../pages/UpdateTask";
import ProtectedRoutes from "./ProtectedRoutes";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: ":username/tasks",
          element: (
            <ProtectedRoutes>
              <Tasks />
            </ProtectedRoutes>
          ),
        },
        {
          path: ":username/tasks/create",
          element: (
            <ProtectedRoutes>
              <CreateTask />
            </ProtectedRoutes>
          ),
        },
        {
          path: ":username/tasks/edit",
          element: (
            <ProtectedRoutes>
              <UpdateTask />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/auth/google/taskduty",
          element: <GoogleCallback />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
