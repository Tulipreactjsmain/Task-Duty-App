import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, Error, GoogleCallback } from "../components";
import Home from "../pages/Home";
export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home/>,
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
