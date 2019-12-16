import React, { Component } from "react";
import { Layout, Menu } from "antd";

class navbar extends Component {
  logoutUser = () => {
    localStorage.removeItem("loggedUser");
    this.setState({ isUserAuthenticated: false });
  };

  render() {
    const { Header } = Layout;
    return (
      <Header>
        {this.props.UserAuthenticated ? (
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
                <a href="/movies/now-playing">Movies</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="/all-movie-theaters">Cinemas</a>
              </Menu.Item>
              <Menu.Item key="2">
                <a onClick={this.logoutUser}>Logout</a>
              </Menu.Item>
            </Menu>
          </Header>
        ) : (
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
      </Header>
    );
  }
}

export default navbar;
