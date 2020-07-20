# Make REST requests from a React App to a NodeJS Server using Axios 

In this [video tutorial](https://youtu.be/HSRgBaniSQU), we will create a React App to display a simple blogging feature that uses Axios to make REST requests to a local NodeJS / Express server (that acts as a proxy to a local Ghost Headless CMS which stores the blog content). In the last video, we setup a NodeJS server to act as an intermediary for handling requests to the Ghost Headless CMS. 

## Create the React App

The first step is to create a Create React app project

- Setup the React project / dependencies
```
    npx create-react-app testreact
    cd testreact
    npm install axios react-router
    code .
```

## Add Router to index.js

With the project set up, we can modify index.js to wrap our app in the React Router. First we add the import:

```
    import { BrowserRouter as Router } from 'react-router-dom';
```
And secondly, we wrap the App component with the imported BrowserRouter
```
    <Router>
      <App />
    </Router>
```

## Add Routes to the App Functional Component

Here we will add two routes for two pages Home and Blog, the home page will represent a new or existing portion of the website that won't directly interact with the Ghost Headless CMS (but may use the NodeJS server to integrate with other services)
 
- Make a copy of App.js called Home.js as we'll retain the default CSS styling for our tutorial
- Import the Route and Switch components from react-router-dom as well as the two functional components that will represent the pages:
```
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
```
- Remove all the JSX code following inside the return and replace it as follows:
```
  return (
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/blog' component={Blog}/>
    </Switch>
  );
```

## Create the Home Page Functional Component

The home page is a placeholder for the "rest" of the site that is not the blog, so we'll keep it largely as is:

- Add an import statement for the Link component from react-router-dom
```
import { Link } from 'react-router-dom';
```
`Note:` Link works like the `<a>` tag but does not result in a page reload
- Rename the component (and use an es6 arrow function)
```
const Home = () => {
```
- Replace all of the JSX within the `<header></header>` tags **`after`** the `<img>` tag with the following:
```
        <h1>Test Home Page</h1>
        <p>
          <Link className="App-link" to='/blog'>Go to Blog</Link>
        </p>
```
- Update the export name
```
export default Home;
```

`Note:` A good intro to functional components can be found at: https://www.robinwieruch.de/react-function-component

## Create the Blog Page Functional Component

This page is where we will make the REST request from to display a list of blog posts, but first we just create the page itself
- Copy the Home.js file to Blog.js
- remove the logo import statement
- rename the functional component to Blog
```
const Blog = () => {
```
- Replace the code between the `<header></header>` tags with the following code:
```
        <h1>My Blog</h1>
        <ul>
          <li>Blog post 1 placeholder</li>
          <li>Blog post 2 placeholder</li>
        </ul>
        <p>
          <Link className="App-link" to='/'>Go to Home</Link>
        </p>
```
- Update the export name
```
export default Blog;
```
- Run the App on the terminal
```
npm start
```

## GET the List of Posts

Now it's time to make the data request and add that into the page using React Hooks.

- First we need to update the React import statement to import the State and Effect Hooks as well as import axios
```
import React, { useState, useEffect } from 'react';
import axios from 'axios';
```
- Next we use a State Hook to save the data with an empty list as initial state inside the Blog functional component
```
    const [data, setData] = useState({posts: [] });
```
- Then we replace the placeholder code between the `<ul></ul>` tags with a map that uses the data state we created
```
          {data.posts.map(post => (
            <li key={post.id}>
              {post.title}
            </li>
          ))}
```
`Note:` For more information on why lists need keys (to help React identify when items are modified), see https://reactjs.org/docs/lists-and-keys.html
- Finally we need to add an Effect Hook to get the data
```
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/ghost/posts/');
          setData(response.data);
        }
        catch (error){
          console.log(error);
        }
    };
    fetchData();
  }, []);
```
`Notes:` The optional second parameter in the useEffect function is a list of all variables which the hook depends on, by setting it to an empty list it causes the hook to only run when the component mounts (since it only runs when a dependant variable is modified). If we left out second parameter the effect would run whenever the component updates as well. A good article on fetching data with Hooks is available at: https://www.robinwieruch.de/react-hooks-fetch-data

- Check the page on the running browser and we will not see the list of blog posts as expected
- Inspect the page, select the network tab in the dev tools, then refresh the page
- Notice that we are getting a CORS error. 
- Run Chrome using the following command to shut off Cross Origin Resource Sharing security
```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```
- Manually connect to the localhost server at http://localhost:3000/

`Note:` Browsers prevent the use of Cross Origin Resource Sharing even when the port differs, so for development we can disable security either through running the browser without security, or installing Chrome extensions that disable it for localhost. When deploying to a server one option is to use a reverse-proxy to redirect calls to the NodeJS server so that all traffic appears to the browser to be served from the same server location and port. 


## GET Blog details

The final step is to make the Blog post list items clickable and have them go to a post page.

- Update Blog.js to add links inside the `<li>` tags
```
              <Link className="App-link" to={`/blog/post/${post.id}`}>{post.title}</Link>
```
- Update App.js with an import statement for the Post page that we will create
```
import Post from './Post';
```
- Then also in App.js, add the new Route for the dynamic page and update the /blog Route to make it exact. 
```
      <Route path='/blog' component={Blog} exact/>
      <Route path='/blog/post/:id' component={Post}/>
```
- Copy the Blog.js file to Post.js file
- in Post.js add an import statement for the useParams Hook from react-router-dom,
```
import { useParams } from 'react-router-dom';
```
- rename the functional component to Post
```
const Post = () => {
```
- Get the id of the post from the Route using the useParams Hook inside the functional component
```
  let { id } = useParams();
```
- Update the axios.get url to point to the post by id endpoint
```
        const response = await axios.get(`http://localhost:5000/api/ghost/posts/${id}`);
```
- Replace the code between the `<header></header>` tags with the following code:
```
        {data.posts[0] && (
          <React.Fragment>
            <h1>{data.posts[0].title}</h1>
            <p>{data.posts[0].custom_excerpt}</p>
          </React.Fragment>
        )}
        <p>
          <Link className="App-link" to='/blog'>Back to Blog List</Link>
        </p>
```
- Lastly, update the export name
```
export default Post;
```
## Further Enhancements
- Removing the second request
You may have noticed that the GET Posts request actually returns the entire post for each and every post in the lost and in fact the second call we make on the new page is repetitious. While there are some dubious ways of passing the object through the URL params, typically large applications will use a framework like Redux to create a Store where global state that can be accessed from different views. This is probably overkill for our app, where both the Nodejs and Ghost CMS are hosted on the same server and the second request is likely pretty quick versus the cost of adding redux to our JS bundle.
- Using Slug instead of ID
For this tutorial we used ID to demonstrate the secondary request, but if we want to have a human readable URL, we can setup a GET Slug request for both the React App and NodeJS server to use an unique key word or phrase to request a specific blog post from the Ghost Headless CMS Content API. 


## GitHub Code Repository
- This code is available publically at https://github.com/Aspiricity/testreact

## YouTube video
- A walkthrough of the development of the code in this repository is available at https://youtu.be/HSRgBaniSQU

## Aspiricity's Tech Nomad Blog
- The [Tech Nomad Blog](https://www.aspiricity.com/blog) is based off of this code base and the [testnode](https://github.com/Aspiricity/testnode) server code repository. A blog post with information on the React / Node.js / Ghost Headless CMS video tutorial series is available at https://www.aspiricity.com/blog/post/integrating-ghost

## Thank You!
- If this tutorial was useful, hit `like`
- If you are interested in more videos like this, hit `subscribe`
- If you have any comments, suggestions or questions, leave a `comment`
- Otherwise stick around for the next video in this series

