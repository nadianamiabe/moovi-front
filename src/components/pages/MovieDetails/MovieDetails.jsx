import React, { Component } from "react";
import api from "../../../api/api";

class MovieDetails extends Component {
  state = {
    movie: {},
    movies: []
  };

  showDetail = async () => {
    const { id } = this.props.match.params;

    const res = await api.get(`http://localhost:5000/api/movies/${id}`);
    console.log(res);

    this.setState({ movies: res.slice() });
    return res.data;
  };

  async componentDidMount() {
    const details = await this.showDetail();
    
    // console.log("movies", showMovies);

    this.setState({ movie: details });

    // this.setState({
    //   movie: data
    // });
  }

  render() {
    const { movie } = this.state;
    return <h1>{movie.Title}</h1>;
  }
}

export default MovieDetails;
