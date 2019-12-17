import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import "./App.css";
import PrivateRoute from "./router/PrivateRoute";
import Movies from "./components/pages/movies/Movies";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import Checkout from "./components/pages/Subscription/Checkout";
import Home from "./components/pages/Home/Home";
import { AllTheaters } from "./components/pages/AllTheaters/AllTheaters";
import api from './api/api';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isUserAuthenticated: false,
      isUserSubscribed: false,
      movies: null,
      allLoaded: false,
    };

    const authToken = localStorage.getItem("loggedUser");

    if (authToken) {
      this.state.isUserAuthenticated = true;
      
    }
  }

  authenticateUser = () => {
    this.setState({ isUserAuthenticated: true });
  };

  logoutUser = () => {
    localStorage.removeItem("loggedUser");
    this.setState({ isUserAuthenticated: false });
  };

  componentDidMount() {
    this.updateSubscribed();
    this.getMovies();

  }

  updateSubscribed = () => {
      api.get('http://localhost:5000/api/payments/status')
       .then((response) => {
         this.setState({isUserSubscribed: response.data.status})
       })
       .catch(err => console.log(err));
    }

   getMovies = () => {
    api.get('http://localhost:5000/api/movies/now-playing')
     .then((response) => {
        console.log(response);
        this.setState({movies: response.data.slice(), allLoaded: true});
     })
     .catch(err => console.log(err));
   } 

  render() {
    const { isUserAuthenticated, isUserSubscribed, movies, allLoaded } = this.state;

      return (
      allLoaded && (
      <div>
        {/* {isUserAuthenticated ? (
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
        )} */}

        {/* <Movies /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/users/login"
            render={props => (
              <Login {...props} authenticateUser={this.authenticateUser} />
            )}
          />
          <Route exact path="/users/signup" component={Signup} />
          {/* <Route exact path="/movies/now-playing" component={Movies} /> */}
          <PrivateRoute
            exact
            path="/movies/now-playing"
            component={Movies}
            isAuth={isUserAuthenticated}
            isSubscribed={isUserSubscribed}
            movies={movies}
          />
          <PrivateRoute
            exact
            path="/subscribe/:planId"
            component={Checkout}
            isAuth={isUserAuthenticated}
            isSubscribed={isUserSubscribed}
          />
          <PrivateRoute
            exact
            path="/movies/:id"
            component={MovieDetails}
            isAuth={isUserAuthenticated}
            isSubscribed={isUserSubscribed}
          />
          <PrivateRoute
            exact
            path="/all-movie-theaters"
            component={AllTheaters}
            isAuth={isUserAuthenticated}
            isSubscribed={isUserSubscribed}
            movies={movies}
          />
        </Switch>
      </div>
      )
    );
  }
}

export default App;
