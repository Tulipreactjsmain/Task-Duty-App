import { useStore } from "../config/store";
import LeaveEditPage from "../components/LeaveEditPage";

export default function UpdateTask() {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { selectedTask } = useStore();
  console.log("SELECTED TASK", selectedTask);
  return <>{selectedTask ? <>{selectedTask.title}</> : <>Go back</>}</>;
}
