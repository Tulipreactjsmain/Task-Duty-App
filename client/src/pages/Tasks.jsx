import { useNavigate } from "react-router-dom";
import { useStore } from "../config/store";

export default function Tasks() {
  const { userData } = useStore();
  const navigate = useNavigate();

  const shouldRenderHello =
    userData && location.pathname === `/${userData.username}/tasks`;

  if (!shouldRenderHello) {
    navigate("/");
  }

  return (
    <>
      {shouldRenderHello && (
        <div>
          <h2>Hello</h2>
        </div>
      )}
    </>
  );
}
