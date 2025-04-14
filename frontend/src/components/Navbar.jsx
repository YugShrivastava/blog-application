import React from "react";
import { NavLink } from "react-router-dom";
import useStore from "../store/store";

function Navbar() {
  const navLinks = [{ url: "/", name: "Home" }];
  const authStatus = useStore((state) => state.authStatus);

  if (authStatus) {
    navLinks.push({ url: "/add-blog", name: "Add" });
    navLinks.push({ url: "/profile", name: "Profile" });
    navLinks.push({ url: "/logout", name: "Logout" });
  } else {
    navLinks.push({ url: "/login", name: "Login" });
    navLinks.push({ url: "/signup", name: "Signup" });
  }
  return (
    <div className="flex gap-20 w-full justify-center px-4 py-7 items-center">
      <div className="text-4xl">BLOGIFY</div>
      <nav className="flex gap-10">
        {navLinks.map((link) => (
          <NavLink
            key={link.url}
            to={link.url}
            className={({ isActive }) =>
              isActive
                ? "text-purple-200 text-3xl"
                : "text-3xl text-purple-600 hover:text-purple-200 duration-200"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
