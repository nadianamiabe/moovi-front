import React, { Component } from "react";
// import api from "../../../api/api";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./Movies.css";

class Movies extends Component {
  state = {
    movies: []
  };

  clickHandler = (e, index) => {
    console.log(index);
  };

  async componentDidMount() {
    const { movies } = this.props;
    console.log(this.props);

    this.setState({ movies });
  }

  showMovies = movies => {
    return movies.map((movie, index) => {
      return (
        <div
          style={{ background: "#ECECEC", padding: "30px" }}
          key={movie.tmdb_id}
          className="movie-card"
        >
          <Link to={`/movies/${movie.tmdb_id}`}>
            <Card title={movie.title} bordered={false}>
              <p>{movie.release_date}</p>
              <img
                src={movie.poster_urls[0]}
                alt="movie_image"
                onClick={e => this.clickHandler(e, index)}
              />
              <p>{movie.overview}</p>
              <p>{movie.tmdb_id}</p>
            </Card>
          </Link>
        </div>
      );
    });
  };
  render() {
    const { movies } = this.state;
    console.log(`aqui`, movies);

    return <div>{this.showMovies(movies)}</div>;
  }
}

export default Movies;
