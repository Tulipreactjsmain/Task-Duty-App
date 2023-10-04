import { createContext, useContext, useEffect, useState } from "react";
import { user } from "./api";

const Context = createContext();
let initialUser = null;

export const StateContext = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await user(); 
        console.log(res);
        if (res.status === 200) {
          setActiveUser(res.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return <Context.Provider value={{ activeUser }}>{children}</Context.Provider>;
};

export const useStore = () => useContext(Context);
