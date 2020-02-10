import React, { Component } from "react";
import api from "../../../api/api";
import VideoPlayer from "./VideoPlayer";
import "./MovieDetails.scss";

class MovieDetails extends Component {
  state = {
    movie: {},
    omdbDetail: {},
    movieTrailerUrl: null,
    isLoading: true
  };

  async componentDidMount() {
    const data = await this.getDetails();
    if (Object.keys(data).length > 1) {
      const { movie, omdbDetail } = data;

      this.setState({ movie, omdbDetail});
    } else {
      const { movie } = data;
      this.setState({ movie});
    }
    const url = await this.getTrailer();
    if (url) {
      this.setState({ movieTrailerUrl: url, isLoading: false });
    }
  }


  getDetails = async () => {
    const { id } = this.props.computedMatch.params;
    try {
      const res = await api.get(`${process.env.REACT_APP_API_URL}/movies/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  getTrailer = async () => {
    const { original_title, original_language } = this.state.movie;
    try {
      const trailer = await api.get(
        `${process.env.REACT_APP_API_URL}/movies/trailer`,
        {
          params: {
            title: original_title,
            language: original_language
          }
        }
      );
      if (trailer.data) {
        const { videoId } = trailer.data.id;
        return `https://youtube.com/watch?v=${videoId}`;
      }
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    const { isLoading, movie, omdbDetail, movieTrailerUrl } = this.state;
    var ratings;
    if (!isLoading) {
      ratings = omdbDetail.Ratings.map((rating,i) => {
        return (
          <span>
            <img src={`/images/ratings-${i+1}.png`} width="40" alt="ratings"></img>
            {rating.Value}
          </span>
        )
      });
    }
    return !isLoading && (
          <div>
            <VideoPlayer url={movieTrailerUrl} />
            <div className="movie_card">
              <div className="info_section">
                <div className="movie_header">
                  <img
                    className="locandina"
                    src={movie.poster_urls[0]}
                    alt="movie poster"
                  />
                  <h1>{movie.title}</h1>
                  <h3>{movie.release_date.slice(0, 4)}</h3>
                  <h4>{omdbDetail.Director}</h4>
                  {omdbDetail.Ratings.length > 0 &&
                  <div className="ratings">
                    {ratings}
                  </div>
                  }   
                  <span className="minutes">{omdbDetail.Runtime}</span>
                  <p className="type">{omdbDetail.Genre}</p>
                </div>
                <div className="movie_desc">
                  <p className="text">{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
  }

export default MovieDetails;
