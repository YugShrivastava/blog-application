import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const authStatus = useStore((state) => state.authStatus);
  console.log(authStatus);
  useEffect(() => {
    if (authStatus === null) return;

    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="w-full flex items-center justify-center">Loading...</div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
