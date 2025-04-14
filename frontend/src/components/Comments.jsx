import React, { useEffect, useState } from 'react'

function Comments({ blogId, refreshComments }) {

    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/comment/`, {
            headers: {
                blogid: blogId
            }
        })
              .then((res) => res.json())
              .then((res) => {
                  if (res?.error) {
                      setError(res.message);
                      console.log(error);
                  }
                  else {
                    if (res?.message) console.log(res.message);
                    else setComments(res.comments);
                  }
              })
              .catch((err) => {
                setError("Something went wrong");
                console.error(err);
              });
    }, [refreshComments])
  

    return comments.length === 0 ? (
      <>
        <div className="text-2xl text-purple-300">No comments yet, add one</div>
      </>
    ) : (
      <div className='flex flex-col'>
        {comments.length !== 0 && comments.map((comment) => (
          <div key={comment._id} className='border px-4 py-3 border-purple-300 flex flex-col gap-2 items-baseline justify-center'>
            <div className="text-xl text-white">{comment?.createdBy?.name}</div>
            <div className="text-purple-200">{comment?.content}</div>
          </div>
        ))}
      </div>
    );
  
}

export default Comments