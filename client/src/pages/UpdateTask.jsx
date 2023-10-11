import { useStore } from "../config/store";
import { useEffect } from "react";
import CreateTask from "./CreateTask";

export default function UpdateTask() {
  const { selectedTask,setIsEditMode, userData } = useStore();

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
      )}
    </>
  );
}
