import React from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const LoggedNavbar = ({activeItem, handleItemClick, logoutUser}) => {

  return (
    <Menu size='large' inverted fixed="top" borderless="true">
      <Menu.Item header> 
        <Image size="tiny" src="/images/Logo-moovi.png"  alt="logo"/>
      </Menu.Item>
      <Menu.Item
        link
        href="/"
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        color="blue"
      />
      <Menu.Item
        link
        href="/movies/now-playing"
        name='movies'
        active={activeItem === 'movies'}
        onClick={handleItemClick}
        color="blue"
      />
      <Menu.Item
        link
        href="/theaters"
        name='cinemas'
        active={activeItem === 'cinemas'}
        onClick={handleItemClick}
        color="blue"
      />
      <Menu.Menu borderless="true" position="right">
        <Menu.Item>
          <Link to="/">
            <Button basic inverted color="blue" onClick={logoutUser}>
              Logout
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Image avatar size="mini" src="/images/avatar.png" alt="user" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>

  )
}

export default LoggedNavbar;