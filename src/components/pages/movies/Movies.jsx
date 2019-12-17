import React from "react";
import { Container, Image, Header, Card } from 'semantic-ui-react';


const Movies = ({movies}) => {
  console.log(movies);
  const movieCards = movies.map((movie) => {
    const poster = movie.poster_urls[0];
    return (
        <Card 
          key={movie._id}
          raised
          link
          href={`/movies/${movie._id}`}
          image={<Image style={{width: '100%'}} verticalAlign="middle" centered size="small" src={poster}/> } 
        />
      )
  });  

  return (
      <Container>
        <Header style={{paddingTop: '30px'}} as="h2">Filmes em Cartaz</Header>
        <Card.Group centered itemsPerRow={6}>
          {movieCards}
        </Card.Group>
      </Container>
        
    ) 
};



export default Movies;
