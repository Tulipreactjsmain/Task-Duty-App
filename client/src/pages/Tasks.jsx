import { useStore } from "../config/store";
import { useState, useEffect } from "react";
import { getUserTasks, deleteTask } from "../config/api";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Loader from "../utils/Loader";
import { BsInbox } from "react-icons/bs";
import UpdateTask from "./UpdateTask";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Tasks() {
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userData, handleUpdateTask, setIsEditMode } = useStore();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        setLoading(true);
        setIsEditMode(false)
        const tasks = await getUserTasks();
        tasks.length > 0 ? setUserTasks(tasks.reverse()) : setUserTasks(tasks);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await deleteTask(taskId);
      if (res.status === 200) {
        setUserTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateAndNavigate = async (taskId) => {
    await handleUpdateTask(taskId);
    navigate(`/${userData.username}/tasks/edit`);
  };

  const shouldRender =
    userData && location.pathname === `/${userData.username}/tasks`;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {shouldRender && (
            <>
              <div>
                <Row className="d-flex justify-content-between customPadding gap-5 align-items-center row pt-5 w-100">
                  <div className="d-flex justify-content-between align-items-center m-0 p-0">
                    <h1 className="m-0 p-0">My Tasks</h1>
                    <NavLink
                      className="defaultColor textHover"
                      to={`/${userData?.username}/tasks/create`}
                    >
                      Add New Task
                    </NavLink>
                  </div>
                </Row>
                {userTasks.length > 0 ? (
                  <>
                    <Row className="pt-4 w-100">
                      {userTasks.map((task, index) => (
                        <div key={index} className="mb-3 customPadding">
                          <div className="border rounded-3 px-2 pt-4">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
                              <div className="d-flex gap-2 text-center">
                                {task.tags.length > 0 ? (
                                  task.tags.map((tag, index) => (
                                    <h5
                                      key={index}
                                      className={
                                        tag === "important"
                                          ? "p-0 m-0 text-center text-success opacity-75 fontWeight-400 fs-6"
                                          : "p-0 m-0 text-center text-danger opacity-75 fontWeight-400 fs-6"
                                      }
                                    >
                                      {tag}
                                    </h5>
                                  ))
                                ) : (
                                  <h5 className="p-0 m-0 text-center"></h5>
                                )}
                              </div>

                              <div className="d-flex justify-content-between gap-3 align-items-center">
                                <Button
                                  className="color text-center border-0 hover"
                                  onClick={() =>
                                    handleUpdateAndNavigate(task._id)
                                  }
                                >
                                  <BiEdit />
                                  <span className="text-white">Edit</span>
                                </Button>
                                <Button
                                  className="bg-body defaultColor text-center textHover buttonBorder"
                                  onClick={() => handleDeleteTask(task._id)}
                                >
                                  <RiDeleteBinLine />
                                  <span>Delete</span>
                                </Button>
                              </div>
                            </div>
                            <div className="pt-2">
                              <div
                                className="d-flex flex-column flex-md-row flex-lg-row justify-content-between font-weight-light"
                                style={{ fontSize: "12px" }}
                              >
                                <h1 className="fontWeight-400 fs-5 order-1 order-md-0 order-lg-0">
                                  {task.title}
                                </h1>
                                <p className="taskParagraph opacity-50 fontWeight-400">
                                  Updated: {formatDate(task.updatedAt)}
                                </p>
                              </div>
                              <p className="taskParagraph fontWeight-400">
                                {task.description}
                              </p>
                              <p
                                className="taskParagraph fontWeight-400 opacity-50"
                                style={{ fontSize: "12px" }}
                              >
                                Created: {formatDate(task.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Row>
                  </>
                ) : (
                  <>
                    <Row className="w-100 mx-0 mt-5 pb-4">
                      <div className="d-flex justify-content-center align-items-center">
                        {userTasks.message}
                      </div>
                    </Row>
                    <div className="d-flex flex-column align-items-center gap-5">
                      <BsInbox className="fs-1" />
                      <NavLink
                        to="/"
                        className="defaultColor text-center textHover"
                      >
                        Go home
                      </NavLink>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
