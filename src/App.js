import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import "./App.css";
import PrivateRoute from "./router/PrivateRoute";
import Movies from "./components/pages/movies/Movies";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import Checkout from './components/pages/Subscription/Checkout';
import Home from './components/pages/Home/Home';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isUserAuthenticated: false
    };

    const authToken = localStorage.getItem("loggedUser");

    if (authToken) this.state.isUserAuthenticated = true;
  }

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
          <Route exact path ="/" component={Home} />
          <Route
            exact
            path="/users/login"
            render={props => (
              <Login {...props} authenticateUser={this.authenticateUser} />
            )}
          />
          <Route exact path="/users/signup" component={Signup} />
          {/* <Route exact path="/movies/now-playing" component={Movies} /> */}
          <PrivateRoute exact path="/subscribe/:planId" component={Checkout} isAuth={isUserAuthenticated}/>
          <PrivateRoute
            exact
            path="/movies/now-playing"
            component={Movies}
            isAuth={isUserAuthenticated}
          />
          <PrivateRoute
            exact
            path="/movies/:id"
            component={MovieDetails}
            isAuth={isUserAuthenticated}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
