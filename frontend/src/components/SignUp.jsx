import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ userDetails }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res?.error) {
          setError(res.message);
          return;
        }
        console.log(res.message);
        navigate('/login')
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <div className="px-20 py-10 w-1/2 bg-neutral-800 backdrop-blur-2xl rounded-2xl">
        <h1 className="text-4xl text-center mb-10">Sign up</h1>
        {error && <div className="text-red-500 text-xl mb-3">{error}</div>}
        <form
          className="flex flex-col justify-center items-center gap-10"
          onSubmit={handleSignup}
        >
          <div className="flex flex-col gap-3 w-full">
            <label className="text-xl text-purple-300">Full Name</label>
            <input
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required={true}
              type="text"
              placeholder="Enter your full name"
              className="w-full border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-xl text-purple-300">Email</label>
            <input
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required={true}
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-xl text-purple-300">Password </label>
            <input
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required={true}
              type="password"
              placeholder="Enter your password"
              className="w-full border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-xl text-purple-300">Role</label>
            <select
              value={userDetails.role}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
              className="border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400 w-full"
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-xl text-purple-300">Profile Image</label>
            <input
              type="file"
              className="w-full border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 rounded-lg text-white duration-200 hover:bg-purple-500 px-4 py-2 text-xl mt-2 w-full"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
