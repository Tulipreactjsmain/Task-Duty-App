import { useStore } from "../config/store";
import { useState, useEffect } from "react";
import { getUserTasks } from "../config/api";
import { NavLink } from "react-router-dom";
import { Button, Row, Card } from "react-bootstrap";

export default function Tasks() {
  const { userData } = useStore();
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const tasks = await getUserTasks();
        setUserTasks(tasks);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };
    fetchUserTasks();
  }, []);

  const shouldRenderHello =
    userData && location.pathname === `/${userData.username}/tasks`;

  return (
    <>
      {shouldRenderHello && (
        <>
          <Row className="d-flex justify-content-between customPadding gap-5 align-items-center pt-5">
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
          <Row className="pt-4">
            {userTasks.map((task, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <h5>{task.title}</h5>
                  <p>Created At: {task.createdAt}</p>
                  <p>Updated At: {task.updatedAt}</p>
                  <p>Description: {task.description}</p>
                  <p>Tags: {task.tags.join(", ")}</p>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </>
      )}
    </>
  );
}
