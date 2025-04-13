import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';

function AuthLayout({children, authentication = true}) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    
  const authStatus = useStore(state => state.authStatus);
    useEffect(() => {
      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
        navigate("/");
      }
      setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? (
      <div className="w-full flex items-center justify-center">
        Loading...
        </div>
    ) : (
      <>{children}</>
    );
}

export default AuthLayout