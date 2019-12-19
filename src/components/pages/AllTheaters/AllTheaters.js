import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { List, Avatar, Icon} from 'antd';
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
  },[]);

  const getAllTheatersData = async () => {
    console.log('entrou aqui com', currentPos);
    const lat = currentPos.latitude;
    const lng = currentPos.longitude;
    const allData = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/movie-theater/all-places/lat/${lat}/lng/${lng}`
    });
    return allData;
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      console.log('entrou aqui ')

      navigator.geolocation.getCurrentPosition((pos) => {
        if(pos.latitude !== null && pos.longitude !== null)
        setCurrentPos({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      });
    }
  };

  useEffect(() => {
    const getTheaters = async () => {
      await fetchAllTheaters();
    };
    getTheaters();
  },[currentPos]);

  const fetchAllTheaters = async () => {
    const resp = await getAllTheatersData();
    setAllTheaters(resp.data.allPlacesDB);
    setIsLoaded(true);
    setCity(resp.data.userCity);
  };

  const getSessions = async id => {
    // setAllSessions([]);
    const resp = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/sessions/${id}/${city}`
    });
    setAllSessions(resp.data);
  };


  const getMovieByName = (name) => {
    const words = name.trim().split(' ');
    for (let i = 0; i < words.length; i += 1) {
      const found = movies.filter((movie) => movie.title.includes(words[i]))
      if (found.length < 2 ){
        return found;
      } else {
        return found.filter((movie) => movie.title.includes(words.join(' ')));
      }  
    }
    return false
  };

  const renderShowTime = item => {
    let timesString = '';
    for (let i = 0; i < item.times.length; i += 1) {
      timesString += `${item.times[i]}  |  `;
    }
    const movieToShow = getMovieByName(item.movie_name);

    return (
      <List.Item>
        { (movieToShow.length > 0) ? (
          <List.Item.Meta
            avatar={<Avatar shape="square" size={80} src={movieToShow[0].poster_urls[0]} />}
            title={<Link to={`/movies/${movieToShow[0]._id}`}>{item.movie_name}</Link>}
            description={timesString} />
          ) : <List.Item.Meta
                 avatar={<Avatar shape="square" size={80} src="/images/Logo-moovi.png"/>}
                 title={<Link to="/movies/now-playing">{item.movie_name}</Link>}
                 description={timesString}
                 />
          }
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
