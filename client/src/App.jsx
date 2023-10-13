import React, { useState, useEffect } from "react";
import Routes from "./routes/Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StateContext } from "./config/store";
import { Toaster } from "react-hot-toast";
import Loader2 from "./utils/Loader2";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  return (
    <>
      <StateContext>
        <Toaster />
        {showLoader ? (
          <Loader2 title={"Welcome to Task Duty App"}/>
        ) : (
          <Routes />
        )}
      </StateContext>
    </>
  );
}

export default App;
