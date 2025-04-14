import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import useStore from "./store/store";

function App() {
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
  const authStatus = useStore((state) => state.authStatus);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && authStatus === null) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.error) {
            console.log(res.message);
            logout();
          } else login(res);
        })
        .catch((err) => console.error(err));
    } else if(token === null) logout()
  }, [authStatus]);

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
