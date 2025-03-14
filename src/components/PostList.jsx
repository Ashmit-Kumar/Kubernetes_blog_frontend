import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const api=import.meta.env.VITE_API_URL;
    axios.get(`${api}/api/posts`)
      .then(response => setPosts(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      <Link to="/create">Create New Post</Link>
      <div>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
