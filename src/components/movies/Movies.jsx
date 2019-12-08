import React, { Component } from "react";
import api from "../../api/api";

class Movies extends Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    console.log("moviessssssss");
    const { data } = await api({
      url: `http://localhost:5000/api/movies/now-playing`,
      method: "GET"
    });
    console.log(data);

    this.setState({
      movies: data.slice()
    });
  }

  showMovies = movies => {
    return movies.map((movie, index) => {
      return (
        <div key={index}>
          <h1>{movie.name}</h1>
        </div>
      );
    });
  };
  render() {
    const { movies } = this.state; 
    return (
      <div>
        <h1>{this.showMovies(movies)}</h1>
      </div>
    );
  }
}

export default Movies;
