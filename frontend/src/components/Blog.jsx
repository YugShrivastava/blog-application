import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blog`, {
      headers: {
        blogId: blogId,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.error) setError(res.message);
        else setBlog(res);
      })
      .catch((err) => {
        setError("Something went wrong");
        console.error(err);
      });
  }, [blogId]);

  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Loading blog...</div>;

  return (
    <div className="p-10 overflow-hidden bg-neutral-800 rounded-2xl flex flex-col justify-center items-baseline w-1/2 gap-10">
      <h1 className="text-5xl font-semibold">{blog.title}</h1>
      <pre className="mt-2 text-2xl text-gray-300">{blog.body}</pre>
    </div>
  );
}

export default Blog;
