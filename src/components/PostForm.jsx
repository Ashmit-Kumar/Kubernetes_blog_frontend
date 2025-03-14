import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const api=import.meta.env.VITE_API_URL;
    if (id) {
      // Fetch the post to edit if id is provided
      axios.get(`${api}/api/posts/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setCategory(response.data.category);
          setTags(response.data.tags.join(', '));
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content, category, tags: tags.split(', ') };
    const api=import.meta.env.VITE_API_URL;
    if (id) {
      // Update existing post
      axios.put(`${api}/api/posts/${id}`, postData)
        .then(() => navigate('/'))
        .catch(err => console.log(err));
    } else {
      // Create new post
      axios.post(`${api}/api/posts`, postData)
        .then(() => navigate('/'))
        .catch(err => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
      <button type="submit">{id ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;
