import Routes from "./routes/Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StateContext } from "./config/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <StateContext>
        <Toaster />
        <Routes />
      </StateContext>
    </>
  );
}

export default App;
