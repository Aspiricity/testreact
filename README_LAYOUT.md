# Use React Bootstrap Card Groups to Layout your Ghost Headless CMS Blog

In this video tutorial, we will use React Bootstrap's Card Group components to layout the main page of our headless Ghost blog. In the last video, we deployed our React blog which gets its posts from a Ghost headless CMS (content management system) via a Node.js server. 

## Pre-Requisites

For this tutorial, we assume that you already have the Ghost headless CMS, Node.js server and local React app configured per the previous videos in this series, or you have a similarly configured setup which has a data map to be displayed using React Bootstrap Card Groups. For more advanced viewers, to more quickly set up these prerequisites, you can install the Ghost headless CMS locally (per the first video in this series: https://youtu.be/T2a-9rWeG7M) and then clone the testnode and testreact repositories from https://github.com/Aspiricity?tab=repositories. Note you will need to setup a local .env file for the testnode node.js server as described in the respository's `README_INTEGRATE.md` markdown file and resolve any dependency updates for the projects using `npm audit fix`. 

- Start your Ghost local server, node.js app and react app. 
- Check your blog in your browser at https://localhost:3000, it should display the posts as expected. 
`Note:` you will need to disable web-security in your browser when running locally to avoid a CORS error. On chrome use the appropriate command below:
```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

## Add the React Bootstrap dependency

- Setup the React project / dependencies
```
    npm install react-bootstrap bootstrap
```
`Note:` More information on React-Bootstrap can be found at https://react-bootstrap.github.io/

## Add the Bootstrap CSS Import to Index.js
- The first step is to add the Bootstrap css to the index.js file by adding the code below:
```
import 'bootstrap/dist/css/bootstrap.min.css';
```
`Note:` More information on setting up React-Bootstrap CSS can be found at https://react-bootstrap.github.io/getting-started/introduction/#css

## Create the Card Group Functional Component

This functional component will handle rendering the blog posts as a group of cards. To start with we are simply going to move the code that renders 
- Create a new folder under src called `components`
- Copy the Blog.js file into the components folder and rename it as CardGroup.js
- Delete the useState and useEffect and axios import as they will not be needed
- Update the App.css import to be `../App.css`
- Next create the Card Group component by renaming the Blog component and the props parameter
```
const CardGroup = (props) => {
}
```
- Delete the const and Effect hook code so only the return block remains
- Next delete everything outside the unordered list tags `<ul> ... </ul>`
- change `data.posts` to `props.posts` on the first line inside the `<ul>` tag
- Finally, rename the export to be CardGroup, your new component should look as follows:
```
import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const CardGroup = (props) => {
  return (
    <ul>
        {props.posts.map(post => (
        <li key={post.id}>
            <Link className='App-link' to={`/blog/post/${post.id}`}>{post.title}</Link>
        </li>
        ))}
    </ul>
  );
}

export default CardGroup;
```

## Update the Blog.js file to use the new CardGroup component
- Add an import to the new CardGroup component
- Replace the `<ul> ... </ul>` block with a CardGroup component tag that has a posts prop, as follows:
```
<CardGroup posts={data.posts}/>
```
- Check your blog again in your browser at https://localhost:3000, it should display the posts as previously. 

## Update the Card Group to import React Bootstrap Components
- Next we want to update the CardGroup component we created earlier to use the Bootstrap React components
- Import 3 React bootstrap components, Card, Container, and CardDeck as shown below
```
import {
  Card as BootstrapCard,
  CardDeck,
  Container,
} from "react-bootstrap";
```

## Add a new Card Functional Component
- Now we can add a Card functional component to the CardGroup js file that CardGroup will use to render each card within the group
- First we will define some constants to store the values passed in as props for the blog post title, excerpt, image, and id
```
const title = props.data.title;
const excerpt = props.data.excerpt;
const image =  props.data.feature_image;
const id = props.data.id;

```
- Next we create the return block that will contain the JSX used to render a card for each of our blog posts
- Inside the return we will have the Bootstrap Card as the root element for the component
```
  return (
    <BootstrapCard>

    </BootstrapCard>
    )
```
`Note:` Information on how to specify the children elements for the Bootstrap Card component can be viewed at: https://react-bootstrap.github.io/components/cards/
- Inside the parent element, first add the Bootstrap Card Image JSX
```
      <BootstrapCard.Img variant='top' src={image} alt={title} />
```
- Next we add the Bootstrap Card Body tag
```
      <BootstrapCard.Body>

      </BootstrapCard.Body>
```
- Within this tag we want to add our Bootstrap Card Title tag first and make that title information link to the post details page
```
        <BootstrapCard.Title><Link to={`/blog/post/${id}`}>{title}</Link></BootstrapCard.Title>
```
- And finally add the Bootstrap Card Text tag inside the parent tag as well and provide the post excerpt for the tag content
```
        <BootstrapCard.Text>{excerpt}</BootstrapCard.Text>
```
- With all of that done, our Card functional component should look as follows:
```
const Card = (props) => {
  const title = props.data.title;
  const excerpt = props.data.excerpt;
  const image = props.data.feature_image;
  const id = props.data.id;

  return (
    <BootstrapCard>
      <BootstrapCard.Img variant='top' src={image} alt={title} />
      <BootstrapCard.Body>
        <BootstrapCard.Title><Link to={`/blog/post/${id}`}>{title}</Link></BootstrapCard.Title>
        <BootstrapCard.Text>{excerpt}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}
```

## Update the Card Group Functional Component to use Card
- Now we can update the `CardGroup` component to use the Card component
- First we are going to replace the `<ul></ul>` tags with the Bootstrap React Container tag. The Container tag is one of the main layout components and on its own provides some nice padding. You can read more about the Bootstrap container tag here: https://react-bootstrap.netlify.app/layout/grid/
```
  return (
    <Container>

    ...

    </Container>
  );
}
``` 
- Next inside the parent container we are going to want to use the Bootstrap React CardDeck component which organizes the cards responsively and provides spacing between the cards. You can read more about the CardDeck component at: https://react-bootstrap.netlify.app/layout/grid/. To learn more about creating responsive websites check out the primer on W3Schools at: https://www.w3schools.com/html/html_responsive.asp
```
      <CardDeck>

      ...

      <CardDeck>
```
- Finally we need to update our map function to use the Card functional component we created earlier instead of the `<li>` tag. We are going to pass all of the post information via the `data` parameter, but we still want to have each item in the map to have a unique key so we use the post.id for that. 
```
      {props.posts.map((post) => (
        <Card data={post} key={post.id} />
      ))}
```
- So now our CardGroup should look as follows:
```
const CardGroup = (props) => {
  const posts = [...props.posts].slice(0, 3);
  return (
    <Container>
      <CardDeck>
      {posts.map((post) => (
        <Card data={post} key={post.id} />
      ))}
      </CardDeck>
    </Container>
  );
}
```
- We are ready to check this out in the browser

## Clean up Blog.js
- We need to disable a bit of the Create React App default css to make it look a bit more respectable, although really we'd want to apply our own CSS to style it further (We'll look options for styling your React app in a future video tutorial)
- On blog.js, the quickest fix is simply to remove the surrounding `<Header></Header>` tags that enclose the Card Group component. Your blog.js return block should look as follows after the change:
```
  return (
    <div className="App">
      <h1>Test Blog Page</h1>
      <CardGroup posts={data.posts}/>
      <Link className='App-link' to='/'>Go to Home</Link>
    </div>
  );
```
- Check out the blog page on the browser again

## Fix for the desktop resolution
- On the desktop resolution, having 7 blog posts does not really render well currently, so let's do a quick fix by reducing the max number of posts to three.
- First we will create a new `posts` const to store the first three posts. We can achieve this on a single line by converting our nested JSON results to an Array using the ES6 spread operator `...` on the nested object and then using the Array slice method
```
  const posts = [...props.posts].slice(0, 3);
```
`Note:` for more information on using the ES6 spread operator, go to: https://medium.com/coding-at-dawn/how-to-use-the-spread-operator-in-javascript-b9e4a8b06fab
- Next, update the map function to be called from the new `posts` constant
```
      {posts.map((post) => (
```
- Back to our browser to see the results

## Further Enhancements

- Multiple Rows: To be able to display all of the blog posts, implement a grid by mapping each group of 3 cards into rows and then rendering each card in the row using a second map for each row. 
- Further styling the page using CSS either using style sheets or React Styled Components. For more information on React Styled Components check out: https://styled-components.com/
- Update the images to use Next Gen Images, go to https://medium.com/@jmuzsik/how-to-setup-next-gen-images-for-react-hosted-on-amazon-s3-7ba2d2caad21 for more details. 

## GitHub Code Repository
- The codebases used in this video tutorial are available publically at https://github.com/Aspiricity/

## Thank You!
- If this tutorial was useful, hit `like`
- If you are interested in more videos like this, hit `subscribe`
- If you have any comments, suggestions or questions, leave a `comment`
