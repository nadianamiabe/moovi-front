import React, { Component } from "react";
import axios from "axios";

class MovieDetails extends Component {
  state = {
    movie: {}
  };

  async componentDidMount() {
    const movie = await this.showDetails;
    this.setState({ movie });
  }

  showDetails = async () => {
    const { movieId } = this.props.match.params;
    console.log(movieId);

    const res = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
    return res.data;
  };

  render() {
    const { title } = this.state.movie;
    return (
      <div>
        <p>{title}</p>
      </div>
    );
  }
}

export default MovieDetails;
