import { useStore } from "../config/store";
import { useState, useEffect } from "react";
import { getUserTasks, updateTask, deleteTask } from "../config/api";
import { NavLink } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Loader from "../utils/Loader";
import { BsInbox } from "react-icons/bs";

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
  const { userData } = useStore();
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        setLoading(true);
        const tasks = await getUserTasks();
        setUserTasks(tasks.reverse());
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserTasks();
  }, []);

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
                                <Button className="color text-center border-0">
                                  <BiEdit />
                                  <span className="text-white">Edit</span>
                                </Button>
                                <Button className="bg-body defaultColor text-center buttonBorder">
                                  <RiDeleteBinLine />
                                  <span>Delete</span>
                                </Button>
                              </div>
                            </div>
                            <div className="pt-2">
                              <div
                                className="d-flex justify-content-between font-weight-light"
                                style={{ fontSize: "12px" }}
                              >
                                <h1 className="fontWeight-400 fs-3">
                                  {task.title}
                                </h1>
                                <p className="taskParagraph opacity-75 fontWeight-400">
                                  Last updated: {formatDate(task.updatedAt)}
                                </p>
                              </div>
                              <p className="taskParagraph fontWeight-400">
                                {task.description}
                              </p>
                              <p
                                className="taskParagraph fontWeight-400 opacity-75"
                                style={{ fontSize: "12px" }}
                              >
                                Created at: {formatDate(task.createdAt)}
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
