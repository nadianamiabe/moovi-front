import React, { Component } from "react";
import api from '../../../api/api';
import VideoPlayer from './VideoPlayer';


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
    const { title } = this.state.tmdbDetail;
    return (
      <div>
        {
          this.state.movieTrailerUrl && 
          <VideoPlayer url={this.state.movieTrailerUrl}/>
        }
      </div>
    );
  }
}

export default MovieDetails;
