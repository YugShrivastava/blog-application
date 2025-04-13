import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-full flex flex-col items-center bg-neutral-900 min-h-screen text-white">
      <Navbar />
      <div className="py-10 flex flex-col justify-center items-center w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
