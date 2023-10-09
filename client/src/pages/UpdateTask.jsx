import { useStore } from "../config/store";
import { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import LeaveEditPage from "../components/LeaveEditPage";

export default function UpdateTask() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { selectedTask, isEditMode, setIsEditMode } = useStore();
  console.log("SELECTED TASK", selectedTask);

    useEffect(() => {
      setIsEditMode(true);
    }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isEditMode) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isEditMode]);

  const handleConfirm = () => {
    setIsEditMode(false);
    history.push("/some-other-route");
  };
  return (
    <>
      {selectedTask ? (
        <>
          <CreateTask />

          <LeaveEditPage
            show={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            onConfirm={handleConfirm}
            message="You have unsaved changes. Are you sure you want to leave?"
          />
        </>
      ) : (
        <>Go back</>
      )}
    </>
  );
}
