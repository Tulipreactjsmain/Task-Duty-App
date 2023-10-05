import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { fetchUserData } from "../hooks/userService";
import Loader from "../utils/Loader";

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

  return (
    <Context.Provider value={{ userData, setUserData }}>
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
