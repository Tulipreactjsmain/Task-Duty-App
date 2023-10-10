import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserData } from "../hooks/userService";
import Loader from "../utils/Loader";
import { logOutUser } from "./api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getSingleTask } from "./api";
import { useLocation } from "react-router-dom";

const Context = createContext();
let initialUser = {};

export const StateContext = ({ children }) => {
  const [userData, setUserData] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    async function getUserData() {
      setLoading(true);
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  const clearUserCookies = () => {
    Cookies.remove("TaskDuty.cookie", { path: "/" });
    location.replace("/");
  };
  const handleLogout = async () => {
    try {
      const response = await logOutUser();

      if (response.status === 200) {
        toast("Logout successful.");
        clearUserCookies();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleUpdateTask = async (taskId) => {
    try {
      setLoading(true);
      const task = await getSingleTask(taskId);
      setSelectedTask(task);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        handleLogout,
        handleUpdateTask,
        selectedTask,
        isEditMode,
        setIsEditMode,
        showConfirmationModal,
        setShowConfirmationModal,
        showSettingsModal,
        setShowSettingsModal,
        loading,
        setLoading
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
