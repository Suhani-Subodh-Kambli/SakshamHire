import { Outlet } from "react-router-dom";
import Chatbot from "./components/ai/Chatbot";

function App() {
  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
}

export default App;