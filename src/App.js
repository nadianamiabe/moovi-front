import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import "./App.css";
import PrivateRoute from "./router/PrivateRoute";
import Movies from "./components/pages/movies/Movies";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import api from "./api/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isUserAuthenticated: false,
      movies: []
    };

    const authToken = localStorage.getItem("loggedUser");

    if (authToken) this.state.isUserAuthenticated = true;
  }

  async componentDidMount() {
    const movies = await this.showMovies();
    console.log("filmes", movies);

    this.setState({
      movies: movies.slice()
    });
  }

  showMovies = async () => {
    const { data } = await api({
      url: `http://localhost:5000/api/movies/now-playing`,
      method: "GET"
    });
    console.log(data.movies);

    return data.movies;
  };

  authenticateUser = () => {
    this.setState({ isUserAuthenticated: true });
  };

  logoutUser = () => {
    localStorage.removeItem("loggedUser");
    this.setState({ isUserAuthenticated: false });
  };

  render() {
    const { isUserAuthenticated } = this.state;

    return (
      <div>
        {isUserAuthenticated ? (
          <div>
            <h1>Estou logado</h1>
            <button onClick={this.logoutUser}>Logout</button>
            <Link to="/movies/now-playing">Movies</Link>
          </div>
        ) : (
          <div>
            <h1>Não estou logado</h1>
            <Link to="/users/login">Entrar</Link>
            <Link to="/users/signup">Se cadastre!</Link>
          </div>
        )}

        {/* <Movies /> */}
        <Switch>
          <Route
            exact
            path="/users/login"
            render={props => (
              <Login {...props} authenticateUser={this.authenticateUser} />
            )}
          />
          <Route exact path="/users/signup" component={Signup} />
          <PrivateRoute
            route="/movies/now-playing"
            component={() => <Movies movies={this.state.movies} />}
            isAuth={isUserAuthenticated}
          />
          <PrivateRoute
            route="/movies/:id"
            component={() => <MovieDetails movies={this.state.movies} />}
            isAuth={isUserAuthenticated}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
