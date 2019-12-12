import React, { Component } from "react";
import api from "../../../api/api";

class MovieDetails extends Component {
  state = {
    movie: {}
  };

  showDetail = async () => {
    console.log("roberto");
    const { id } = this.props.match.params;

    const res = await api.get(`http://localhost:5000/api/movies/${id}`);
    console.log(res.data);

    return res.data;
  };

  async componentDidMount() {
    console.log(this.props.match);
    const { movie } = await this.showDetail();
    this.setState({ movie });
  }

  render() {
    const { movie } = this.state;
    console.log(movie);

    return (
      <div>
        <h1>{movie.Title}</h1>
      </div>
    );
  }
}

export default MovieDetails;
