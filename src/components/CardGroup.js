import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {
  Card as BootstrapCard,
  CardDeck,
  Container,
} from 'react-bootstrap';

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

export default CardGroup;
