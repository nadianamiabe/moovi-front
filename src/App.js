import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import "./App.css";
import PrivateRoute from "./routes/PrivateRoutes";
import Movies from "./components/movies/Movies";

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
            <Link to="/movies/all-movies">Movies</Link>
          </div>
        ) : (
          <div>
            <h1>Não estou logado</h1>
            <Link to="/users/login">Entrar</Link>
            <Link to="/users/signup">Se cadastre!</Link>
          </div>
        )}

        <Movies />
        <Switch>
          <Route
            exact
            path="/users/login"
            render={props => (
              <Login {...props} authenticateUser={this.authenticateUser} />
            )}
          />
          <Route exact path="/users/signup" component={Signup} />
          <Route exact path="/movies/all-movies" component={Movies} />
          <PrivateRoute
            exact
            path="/movies/all-movies"
            component={Movies}
            isAuth={isUserAuthenticated}
            teste="banana"
          />
        </Switch>
      </div>
    );
  }
}

export default App;
