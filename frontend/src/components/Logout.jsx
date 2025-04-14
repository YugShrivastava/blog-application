import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

function Logout() {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    localStorage.setItem("token", "");
    logout();
    navigate("/");
  }, []);

  return <></>;
}

export default Logout;
