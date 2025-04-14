import React, { useState } from "react";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";

function AddComment({ blogId, setRefreshComments }) {
  const user = useStore((state) => state.user);
  const [error, setError] = useState("");

  const [comment, setComment] = useState({
    content: "",
    createdBy: user?._id,
    blogId,
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/comment/add`, {
      method: "POST",
      body: JSON.stringify({ comment }),
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
          console.log(error);
          return;
        }
        console.log(res.message);
        setComment((prev) => ({
          ...prev,
          content: "",
        }));
          setRefreshComments(prev => !prev);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <form
      onSubmit={handleAddComment}
      className="flex justify-baseline items-center"
    >
      <input
        className="w-3/4 border px-4 py-2 rounded-l-md text-xl focus:outline-none focus:border-purple-400"
        value={comment.content}
        onChange={(e) =>
          setComment((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }
        type="text"
        placeholder="Share your insights..."
      />
      <button
        type="submit"
        className="bg-purple-600 rounded-r-md text-white duration-200 hover:bg-purple-500 px-4 py-2 border border-purple-600 text-xl w-1/4"
      >
        Add
      </button>
    </form>
  );
}

export default AddComment;
