import React from 'react';
import { Menu, Image, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {BreakpointProvider, Breakpoint} from 'react-socks';


const LoggedNavbar = ({setVisible, activeItem, handleItemClick, logoutUser}) => {

  return (
    <BreakpointProvider>
      <Breakpoint small up>
        <Menu size="large" inverted fixed="top" borderless>
          <Menu.Item header> 
            <Image size="small" src="/images/Logo-moovi2.png"  alt="logo"/>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/"
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            color="blue"
          />
          <Menu.Item
            as={Link} 
            to="/movies/now-playing"
            name='movies'
            active={activeItem === 'movies'}
            onClick={handleItemClick}
            color="blue"
          />
          <Menu.Item
            as={Link}
            to="/theaters"
            name='cinemas'
            active={activeItem === 'cinemas'}
            onClick={handleItemClick}
            color="blue"
          />
          <Menu.Menu position="right">
            <Menu.Item 
              as={Link}
              to="#"
              name = "dashboard" 
              active={activeItem === 'dashboard'}
              onClick={handleItemClick}
              color="blue" 
            />
            <Menu.Item>
              <Dropdown pointing="top right" icon={<Image avatar size="mini" src="/images/avatar.png" alt="user" />}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/" onClick={logoutUser} text="Logout" />
                  <Dropdown.Item  text ="My Account" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Breakpoint>
      <Breakpoint small down>
        <Menu sixe="large" bordeless inverted fixed="top">
          <Menu.Item header as={Link} to="/"> 
            <Image size="small" src="/images/Logo-moovi2.png"  alt="logo"/>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item onClick={setVisible} icon={<Icon name="bars" size="large" />}/>    
          </Menu.Menu>
        </Menu>
      </Breakpoint>
    </BreakpointProvider>
  )
}

export default LoggedNavbar;