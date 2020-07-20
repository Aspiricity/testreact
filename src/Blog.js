import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
      <header className="App-header">
        <h1>Test Blog Page</h1>
        <ul>
          {data.posts.map(post => (
            <li key={post.id}>
              <Link className='App-link' to={`/blog/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <Link className='App-link' to='/'>Go to Home</Link>
      </header>
    </div>
  );
}

export default Blog;
