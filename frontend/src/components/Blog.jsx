import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import Comments from "./Comments";

function Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);


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
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Loading blog...</div>;

  return (
    <div className="w-1/2 flex flex-col gap-20">
      <div className="overflow-hidden bg-neutral-800 rounded-2xl flex flex-col justify-center items-baseline w-full gap-10">
        <div className="bg-neutral-700 w-full h-120 flex justify-center items-center text-3xl">
          Image
        </div>
        <h1 className="px-10 text-5xl font-semibold">{blog.title}</h1>
        <pre className="px-10 mt-2 text-2xl text-gray-300">{blog.body}</pre>
        <p className="px-10 pb-10">Created by: {blog?.createdBy?.name}</p>
      </div>
      <div className="w-full flex flex-col gap-10">
        <h2 className="text-4xl text-purple-500 font-semibold">Comments</h2>
        <AddComment blogId={blogId} setRefreshComments={ setRefreshComments } />
        <Comments blogId={blogId} refreshComments={ refreshComments } />
      </div>
    </div>
  );
}

export default Blog;
