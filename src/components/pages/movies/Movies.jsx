import React, { useState, useEffect } from "react";
import { Container, Image, Header, Card } from 'semantic-ui-react';
import { Breakpoint, BreakpointProvider } from 'react-socks';


const Movies = ({movies, isSubscribed, getMovies, updateSubscribed}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getMovies();
      await updateSubscribed();

      setIsLoaded(true);
    };

    fetchData();
  },[]);

  const movieCards = movies.map((movie) => {
    const poster = movie.poster_urls[0];
    return isLoaded && (

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
    <BreakpointProvider>
      <Container style={{paddingBottom: '25px'}}>
        <Header style={{paddingTop: '80px'}} as="h2">Filmes em Cartaz</Header>
        <Breakpoint medium down >
          <Card.Group centered itemsPerRow={4}>
            {movieCards}
          </Card.Group>
        </Breakpoint>
        <Breakpoint large up >
          <Card.Group centered itemsPerRow={6}>
            {movieCards}
          </Card.Group>
        </Breakpoint>
      </Container>
    </BreakpointProvider>
        
    ) 
};



export default Movies;
