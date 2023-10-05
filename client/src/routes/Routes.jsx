import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, Error, GoogleCallback } from "../components";
import Tasks from "../pages/Tasks";
import Home from "../pages/Home";
import CreateTask from "../pages/CreateTask";

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
          element: <Tasks />,
        },
        {
          path: ":username/tasks/create",
          element: <CreateTask />,
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
