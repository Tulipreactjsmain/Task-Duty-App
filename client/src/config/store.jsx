import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchUserData } from "../hooks/userService";
import Loader from "../utils/Loader";
import { logOutUser } from "./api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Context = createContext();
let initialUser = {};

export const StateContext = ({ children }) => {
  const [userData, setUserData] = useState(initialUser);
  const [loading, setLoading] = useState(true);

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

  return (
    <Context.Provider value={{ userData, setUserData, handleLogout }}>
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
