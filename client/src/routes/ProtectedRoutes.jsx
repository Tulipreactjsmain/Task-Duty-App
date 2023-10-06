import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../config/store";

export default function ProtectedRoutes({ children }) {
  const { userData } = useStore();
  const location = useLocation();
  const getCookie = userData;
  if (getCookie == null)
    return <Navigate to={"/"} state={{ from: location }} replace />;
  return children;
}
