import { useNavigate } from "react-router-dom";
import { useStore } from "../config/store";
import { getUserTasks } from "../config/api";
import { Button } from "react-bootstrap";

export default function Tasks() {
  const { userData } = useStore();

  const fetchUserTasks = async () => {
    try {
      const userTasks = await getUserTasks();
      console.log("userTasks", userTasks);
    } catch (error) {
      console.log(error);
    }
  };
  fetchUserTasks();
  const shouldRenderHello =
    userData && location.pathname === `/${userData.username}/tasks`;

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
