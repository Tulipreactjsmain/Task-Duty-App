import { useStore } from "../config/store";
import { useState, useEffect } from "react";
import { getUserTasks } from "../config/api";
import { NavLink } from "react-router-dom";
import { Button, Row, Card } from "react-bootstrap";
import Loader from "../utils/Loader";
import { BsInbox } from "react-icons/bs";

export default function Tasks() {
  const { userData } = useStore();
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        setLoading(true);
        const tasks = await getUserTasks();
        console.log("tasks", tasks);
        setUserTasks(tasks);
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
              <Row className="d-flex justify-content-between customPadding gap-5 align-items-center pt-5 w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="text-center mb-0">My Tasks</h1>
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
                  <Row className="pt-4">
                    {userTasks.map((task, index) => (
                      <div key={index} className="mb-3">
                        <h5>{task.title}</h5>
                        <p>Created At: {task.createdAt}</p>
                        <p>Updated At: {task.updatedAt}</p>
                        <p>Description: {task.description}</p>
                        <p>Tags: {task.tags.join(", ")}</p>
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
            </>
          )}
        </>
      )}
    </>
  );
}
