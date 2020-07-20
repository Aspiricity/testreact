import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import Post from './Post';

function App() {
  return (
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/blog' component={Blog} exact />
      <Route path='/blog/post/:id' component={Post} />
    </Switch>
  );
}

export default App;
