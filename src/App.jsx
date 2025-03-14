import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
      </Routes>
    </Router>
  );
};

export default App;
