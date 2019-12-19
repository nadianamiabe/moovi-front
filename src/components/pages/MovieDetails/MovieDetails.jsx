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
                  {this.state.omdbDetail.Ratings.length > 0 &&
                  <div className="ratings">
                    <span>
                      <img src="/images/imdb_icon.png" width="40" alt="imdb"></img>
                      : {omdbDetail.Ratings[0].Value}
                    </span>
                    <span>
                      <img
                        src="/images/fresh.png"
                        width="30"
                        alt="rotten"
                      ></img>
                    </span>
                    <span>
                      <img
                        src="/images/metacritic.png"
                        width="30"
                        alt="imdb"
                      ></img>
                    </span>
                    <span id="youtube"><i className="fab fa-youtube fa-3x"></i></span>
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
