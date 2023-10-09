import { useStore } from "../config/store";
import { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import LeaveEditPage from "../components/LeaveEditPage";

export default function UpdateTask() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { selectedTask, isEditMode, setIsEditMode } = useStore();

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
        <>Go back</>
      )}
    </>
  );
}
