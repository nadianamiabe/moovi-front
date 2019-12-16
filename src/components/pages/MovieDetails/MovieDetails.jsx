import React, { Component } from "react";
import api from '../../../api/api';
import VideoPlayer from './VideoPlayer';
import api from "../../../api/api";
import "./MovieDetails.scss";


class MovieDetails extends Component {
  state = {
    tmdbDetail: {},
    omdbDetail: {},
    movieTrailerUrl: null,

  };

  async componentDidMount() {
    const data = await this.getDetails();
    if ( Object.keys(data).length > 1) {
      const { tmdbDetail, omdbDetail } = data;
      this.setState({ tmdbDetail, omdbDetail });
    } else {
      const { tmdbDetail } = data;
      this.setState({tmdbDetail});
    }
    const url = await this.getTrailer();
    if (url) {
      this.setState({movieTrailerUrl: url});
    }
  }
  getDetails = async () => {
    const { id } = this.props.computedMatch.params;
    try {
      const res = await api.get(`http://localhost:5000/api/movies/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  getTrailer = async () => {
    const { original_title, original_language } = this.state.tmdbDetail;
    try {
      const trailer = await api.get(`http://localhost:5000/api/movies/trailer`, 
        {
          params: {
            title: original_title,
            language: original_language,
          }
        });
      if (trailer.data) {
        const { videoId } = trailer.data.id;
        return `https://youtube.com/watch?v=${videoId}`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { tmdbDetail, omdbDetail } = this.state;
    return (

      <div>
        {
          this.state.movieTrailerUrl && 
          <VideoPlayer url={this.state.movieTrailerUrl}/>
        }
      </div>
      <div className="movie_card">
        <div className="info_section">
          <div className="movie_header">
            <img
              className="locandina"
              src={omdbDetail.Poster}
              alt="movie poster"
            />
            <h1>{tmdbDetail.title}</h1>
            <h4>
              {tmdbDetail.release_date} {omdbDetail.Director}
            </h4>
            <span className="minutes">{omdbDetail.Runtime}</span>
            <p className="type">{omdbDetail.Genre}</p>
          </div>
          <div className="movie_desc">
            <p className="text">{tmdbDetail.overview}</p>
          </div>
        </div>
        <div class="blur_back"></div>
      </div>
    );
  }
}

export default MovieDetails;
