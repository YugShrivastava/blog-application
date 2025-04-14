import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blog/all`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.error) {
          setError(res.message);
          console.log(error);
        }
        else setBlogs(res);
      })
      .catch((err) => {
        setError("Something went wrong");
        console.error(err);
      });
  }, []);

  return (
    <div className="w-full px-50 py-10 grid gap-15 grid-cols-3 mx-auto items-center">
      {blogs &&
        blogs.map((blog) => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="bg-neutral-800 hover:scale-106 duration-300 rounded-2xl pb-5 overflow-hidden h-80 w-full"
          >
            <div className="h-2/3 w-full rounded-t-2xl bg-gray-500 flex justify-center items-center text-3xl">
              Image
            </div>
            <h2 className="px-7 text-3xl text-purple-300 mt-5">{blog.title}</h2>
            <p className="px-7 text-xl text-white mt-4">{blog.body}</p>
          </Link>
        ))}
    </div>
  );
}

export default Home;
