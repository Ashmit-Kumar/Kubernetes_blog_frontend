import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostItem = ({ post }) => {
  const handleDelete = () => {
    const api=import.meta.env.VITE_API_URL;
    axios.delete(`${api}/api/posts/${post._id}`)
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Category: {post.category}</p>
      <p>Tags: {post.tags.join(', ')}</p>
      <Link to={`/edit/${post._id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostItem;
