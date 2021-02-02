import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CardGroup from './components/CardGroup';

const Blog = () => {
  const [data, setData] = useState({posts: []});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ghost/posts');
        setData(response.data);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Test Blog Page</h1>
      <CardGroup posts={data.posts} />
      <Link className='App-link' to='/'>Go to Home</Link>
    </div>
  );
}

export default Blog;
