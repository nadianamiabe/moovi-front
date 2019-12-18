import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { List, Avatar, Icon, Tag } from 'antd';
import { Container } from './AllTheaters.styles';
import { Link } from 'react-router-dom';
import MyGoogleComponent from '../../GoogleMaps/GoogleMaps';

const AllTheaters = ({ movies, getMovies }) => {
  const [allTheaters, setAllTheaters] = useState([]);
  const [currentPos, setCurrentPos] = useState({
    latitude: null,
    longitude: null
  });
  const [city, setCity] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  // state = {
  //   allTheaters: [],
  //   currentPos: {
  //     latitude: null,
  //     longitude: null,
  //   },
  //   city: null,
  //   isLoaded: false,
  //   allSessions: [],
  // }

  useEffect(() => {
    const fetchData = async () => {
      await getLocation();
      await getMovies();
    };
    fetchData();
  }, []);

  const getAllTheatersData = async () => {
    const lat = currentPos.latitude;
    const lng = currentPos.longitude;
    const allData = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/movie-theater/all-places/lat/${lat}/lng/${lng}`
    });
    console.log(allData.data.allPlacesDB);
    return allData;
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    }
  };

  useEffect(() => {
    const getTheaters = async () => {
      await fetchAllTheaters();
    };
    getTheaters();
  }, [currentPos]);

  const fetchAllTheaters = async () => {
    const resp = await getAllTheatersData();
    setAllTheaters(resp.data.allPlacesDB);
    setIsLoaded(true);
    setCity(resp.data.userCity);
  };

  const getCoordinates = position => {
    setCurrentPos({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  const getSessions = async id => {
    setAllSessions([]);
    const resp = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/sessions/${id}/${city}`
    });
    setAllSessions(resp.data);
    console.log('this state allSessions', allSessions);
    console.log('this props movies', movies);
  };

  //     url: `${process.env.REACT_APP_API_URL}/sessions/${id}/${city}`
  //   })
  //   this.setState({ allSessions: resp.data });
  //   console.log('this state allSessions', this.state.allSessions);
  //   console.log('this props movies', this.props.movies);
  // }

  // getIdByName = async (id) => {
  //   this.setState({ allSessions: [] })
  //   const { city } = this.state
  //   const resp = await api({
  //     method: "get",
  //     url: `${process.env.REACT_APP_API_URL}/sessions/${id}/${city}`,
  //   })
  //   this.setState({ allSessions: resp.data })
  //   console.log('this state allSessions', this.state.allSessions
  //   )
  // }

  const getIdByName = name => {
    const errorPoster = './images/Logo-moovi.png';
    const thisMovie = movies.find(movie => movie.title === name);
    //   const thisMovie = this.props.movies.map(movie => {
    //     if (movie.title.indexOf(name)) {
    //       return [thisMovie._id, thisMovie.poster_urls[0]]
    //     }
    //     return [null, errorPoster]
    //   })
    //  }

    // const promises = list.map(async (name) => {
    //   const index = allNames.indexOf(name);
    //   if (index === -1) {
    //     const movies = await getMovieByName(name);
    //     if (movies.length < 2) {
    //       return movies[0];
    //     }

    if (thisMovie) {
      return [thisMovie._id, thisMovie.poster_urls[0]];
    }
    return [null, errorPoster];
  };

  const renderShowTime = item => {
    let timesString = '';
    for (let i = 0; i < item.times.length; i += 1) {
      timesString += `${item.times[i]}  |  `;
    }
    const movieInfo = getIdByName(item.movie_name);
    console.log('movieInfo', movieInfo);
    const movieIdAndImage = value => {
      if (value) {
        return <Link to={`/movies/${movieInfo[0]}`}>{item.movie_name}</Link>;
      }
      return <Link to="/movies/now-playing">{item.movie_name}</Link>;
    };

    return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" size={80} src={`${movieInfo[1]}`} />}
          title={movieIdAndImage(movieInfo[0])}
          description={timesString}
        />
        <p>{item.date}</p>
      </List.Item>
    );
  };

  return isLoaded ? (
    <Container>
      <MyGoogleComponent
        currentPos={currentPos}
        list={allTheaters}
        showTime={getSessions}
      />
      <List
        itemLayout="horizontal"
        dataSource={allSessions}
        renderItem={item => renderShowTime(item)}
      />
    </Container>
  ) : (
    <Icon
      type="loading"
      style={{ height: '50px', marginTop: '30px', textAlign: 'center' }}
    />
  );
};

export default AllTheaters;
