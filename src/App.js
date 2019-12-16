import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import { Layout, Menu } from "antd";
import "./App.css";
import PrivateRoute from "./router/PrivateRoute";
import Movies from "./components/pages/movies/Movies";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import Checkout from "./components/pages/Subscription/Checkout";
import Home from "./components/pages/Home/Home";
import { AllTheaters } from "./components/pages/AllTheaters/AllTheaters";

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
    const { Header } = Layout;

    return (
      <div>
       {isUserAuthenticated ? ( 
       <Header style={{
          position: "fixed",
          background: "#feb400",
          zIndex: 1,
          width: "100%"
        }}
      >
        <div className="logo" />
        <img src="../images/Logo-moovi.png" width="120" alt="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{
            background: "#000000",
            lineHeight: "64px",
            float: "right"
          }}
        >
          <Menu.Item key="0">
            <a href="/movies/now-playing">Movies</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="/all-movie-theaters">Cinemas</a>
          </Menu.Item>
          <Menu.Item key="2">
          <a onClick={this.logoutUser}>Logout</a>
          </Menu.Item>
        </Menu>
       </Header> ) : (
        <Header
        style={{
          position: "fixed",
          background: "#feb400",
          zIndex: 1,
          width: "100%"
        }}
      >
        <div className="logo" />
        <img src="../images/Logo-moovi.png" width="120" alt="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{
            background: "#000000",
            lineHeight: "64px",
            float: "right"
          }}
        >
          <Menu.Item key="0">
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="/users/login">Entrar</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/users/signup"> Se Cadastre!</a>
          </Menu.Item>
        </Menu>
       </Header>
       )}
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
          />
          <PrivateRoute
            exact
            path="/subscribe/:planId"
            component={Checkout}
            isAuth={isUserAuthenticated}
          />
          <PrivateRoute
            exact
            path="/movies/:id"
            component={MovieDetails}
            isAuth={isUserAuthenticated}
          />
          <PrivateRoute
            exact
            path="/all-movie-theaters"
            component={AllTheaters}
            isAuth={isUserAuthenticated}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
