import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Test Home Page</h1>
        <Link className='App-link' to='/blog'>Go to Blog</Link>
      </header>
    </div>
  );
}

export default Home;
