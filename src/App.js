import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {Menu, Sidebar, Segment} from 'semantic-ui-react';
import NewNavbar from './components/pages/Navbar/NewNavbar';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import './App.css';
import PrivateRoute from './router/PrivateRoute';
import Movies from './components/pages/movies/Movies';
import MovieDetails from './components/pages/MovieDetails/MovieDetails';
import Checkout from './components/pages/Subscription/Checkout';
import Home from './components/pages/Home/Home';
import AllTheaters from './components/pages/AllTheaters/AllTheaters';
import { Layout } from 'antd';
import api from './api/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isUserAuthenticated: false,
      isUserSubscribed: false,
      visible: false,
      movies: [],
      allLoaded: false
    };

    const authToken = localStorage.getItem('loggedUser');

    if (authToken) this.state.isUserAuthenticated = true;
  }

  authenticateUser = () => {
    this.setState({ isUserAuthenticated: true });
  };

  logoutUser = () => {
    localStorage.removeItem('loggedUser');
    if (this.state.visible) {
      this.setState({visible: false,  isUserAuthenticated: false });
    } else {
      this.setState({isUserAuthenticated: false });
    }
  };

  setVisible = () => {
    const{ visible } = this.state; 
    this.setState({visible: !visible});
  }

  updateSubscribed = () => {
    api
      .get(`${process.env.REACT_APP_API_URL}/payments/status`)
      .then(response => {
        this.setState({ isUserSubscribed: response.data.status });
      })
      .catch(err => console.log(err));
  };

  getMovies = () => {
    api
      .get(`${process.env.REACT_APP_API_URL}/movies/now-playing`)
      .then(response => {
        console.log('movies: ', response);
        this.setState({ movies: response.data.slice(), allLoaded: true });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { Footer } = Layout;
    const {visible, isUserAuthenticated, isUserSubscribed, movies } = this.state;

    return (
      <div>
        <NewNavbar setVisible={this.setVisible} isAuth={isUserAuthenticated} logoutUser={this.logoutUser}/>
        <Sidebar.Pushable style={{margin: 0}} as={Segment}>
          <Sidebar
            style={{paddingTop: '80px'}}
            direction="right"
            as={Menu}
            animation="overlay"
            inverted
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as={Link} to="/movies/now-playing" onClick={this.setVisible} >
              Filmes
            </Menu.Item>
            <Menu.Item as={Link} to="/theaters" onClick={this.setVisible}>
              Cinemas
            </Menu.Item>
            <Menu.Item as={Link} to="#" onClick={this.setVisible}>
              Dashboard
            </Menu.Item>
            <Menu.Item as={Link} to="#" onClick={this.setVisible} >
              My Account
            </Menu.Item>
            <Menu.Item as={Link} to="/" onClick={this.logoutUser}>
              Logout
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <div style={{paddingBottom: '70px'}}>
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

                <PrivateRoute
                  exact
                  path="/movies/now-playing"
                  component={Movies}
                  isAuth={isUserAuthenticated}
                  isSubscribed={isUserSubscribed}
                  movies={movies}
                  getMovies={this.getMovies}
                  updateSubscribed={this.updateSubscribed}
                />
                <PrivateRoute
                  exact
                  path="/subscribe/:planId"
                  component={Checkout}
                  isAuth={isUserAuthenticated}
                  isSubscribed={isUserSubscribed}
                  updateSubscribed={this.updateSubscribed}
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
                  path="/theaters"
                  component={AllTheaters}
                  isAuth={isUserAuthenticated}
                  isSubscribed={isUserSubscribed}
                  movies={movies}
                  getMovies={this.getMovies}
                />
              </Switch>
            </div>
         </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Footer style={{ 
          position: "absolute", 
          bottom: 0, 
          width: '100%', 
          height: '70px', 
          textAlign: 'center' }}>
            Created by Moovi ©2019
        </Footer>
      </div>
    );
  }
}

export default App;
