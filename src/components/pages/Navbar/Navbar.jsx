import React, { Component } from 'react';
import { Layout, Menu } from 'antd';


import { Link } from 'react-router-dom';

const navbar = (props) => {
    const { Header } = Layout;
    const verifyLogin = this.props.isAuth;
    return (
      <div>
        {verifyLogin ? (
          <Header
            style={{
              position: 'fixed',
              background: '#feb400',
              zIndex: 1,
              width: '100%'
            }}
          >
            <div className="logo" />
            <img src="../images/Logo-moovi.png" width="120" alt="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['0']}
              style={{
                background: '#000000',
                lineHeight: '64px',
                float: 'right'
              }}
            >
              <Menu.Item key="0">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/movies/now-playing">Movies</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/all-movie-theaters">Cinemas</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link onClick={this.props.logoutUser} to="/">
                  Logout
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
        ) : (
          <Header
            style={{
              position: 'fixed',
              background: '#feb400',
              zIndex: 1,
              width: '100%'
            }}
          >
            <div className="logo" />
            <img src="../images/Logo-moovi.png" width="120" alt="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['0']}
              style={{
                background: '#000000',
                lineHeight: '64px',
                float: 'right'
              }}
            >
              <Menu.Item key="0">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/users/login">Entrar</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/users/signup"> Se Cadastre!</Link>
              </Menu.Item>
            </Menu>
          </Header>
        )}
      </div>
    );
  
}

export default navbar;
