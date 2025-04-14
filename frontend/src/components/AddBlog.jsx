import React, { useState } from 'react'
import useStore from '../store/store'
import { useNavigate } from 'react-router-dom';

function AddBlog() {
  const user = useStore(state => state.user);

  const [blog, setBlog] = useState({
    title: '',
    body: '',
    id: user?._id || null
  })
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleAddBlog = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/blog/add`, {
      method: "POST",
      body: JSON.stringify({ blog }),
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
        navigate(`/blog/${res.id}`);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <div className="w-1/2">
      <h1 className="text-4xl text-center mb-10">Add Blog</h1>
      {error && <div className="text-red-500 text-xl mb-3">{error}</div>}
      <form
        className="flex flex-col justify-center items-center gap-10"
        onSubmit={handleAddBlog}
      >
        <div className="flex gap-15 bg-neutral-800 p-7 rounded-2xl w-full">
          <div className="flex flex-col gap-3 w-full ">
            <label className="text-xl text-purple-300">Title</label>
            <input
              value={blog.title}
              onChange={(e) =>
                setBlog((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              required={true}
              type="text"
              placeholder="Enter a title"
              className="w-full border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-xl text-purple-300">Cover Image</label>
            <input
              type='file'
              className="w-full border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full bg-neutral-800 p-7 rounded-2xl">
          <label className="text-xl text-purple-300">Content</label>
          <textarea
            value={blog.body}
            onChange={(e) =>
              setBlog((prev) => ({
                ...prev,
                body: e.target.value,
              }))
            }
            className="w-full min-h-70 border px-4 py-2 rounded-md text-xl focus:outline-none focus:border-purple-400"
            name=""
            id=""
            placeholder="Your blogs content goes here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-purple-600 rounded-lg text-white duration-200 hover:bg-purple-500 px-4 py-2 text-xl mt-2 w-full"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog