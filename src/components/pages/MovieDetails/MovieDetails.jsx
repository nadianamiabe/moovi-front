import React, { Component } from "react";
import api from "../../../api/api";

class MovieDetails extends Component {
  state = {
    movie: {},
    movies: this.props.movies,
    moviesLoaded: false
  };

  showDetail = async () => {
    const { id } = this.props.computedMatch.params;

    const res = await api.get(`http://localhost:5000/api/movies/${id}`);
    console.log(res.data);

    return res.data;
  };

  getMovie = () => {
    const { id } = this.props.computedMatch.params;
    console.log(this.props.movies);
    const movie = this.props.movies.filter(movie => movie.tmdb_id == id);
    console.log(this.props.movies);
    console.log(movie);
    return movie;
  };

  async componentDidMount() {
    console.log(this.props);
    const movieOmdb = await this.showDetail();
    const movieTmdb = this.getMovie();
    console.log(movieOmdb);
    this.setState({ movie: { ...movieOmdb }, movies: { ...movieTmdb } });
    console.log("moviee", this.state.movie);
  }

  render() {
    console.log(this.props.movies);
    const { movie } = this.state;
    console.log("ois", this.state);

    return (
      <div>
        <h1>{movie.Title}</h1>
      </div>
    );
  }
}

export default MovieDetails;
