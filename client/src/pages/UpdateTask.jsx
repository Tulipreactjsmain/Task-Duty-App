import { useStore } from "../config/store";
import { useEffect } from "react";
import CreateTask from "./CreateTask";
import { useNavigate } from "react-router-dom";

export default function UpdateTask() {
  const { selectedTask, isEditMode, setIsEditMode, userData } = useStore();
  const navigate = useNavigate()

  useEffect(() => {
    setIsEditMode(true);
  }, []);

  return (
    <>
      {selectedTask ? (
        <>
          <CreateTask />
        </>
      ) : (
        <>{location.replace(`/${userData.username}/tasks`)}</>
        // <>{navigate(`/${userData.username}/tasks`)}</>
      )}
    </>
  );
}
