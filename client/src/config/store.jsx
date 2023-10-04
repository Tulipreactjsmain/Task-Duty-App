import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();
let initialUser = null;

export const StateContext = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useStore = () => useContext(Context);
