import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, Error } from "../components";
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
