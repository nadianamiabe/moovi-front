import React from 'react';
import { Button, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const SignInNavbar = (props) => {

  return (
    <Menu borderless size='large' inverted fixed="top">
      <Menu.Item header> 
        <Image size="tiny" src="/images/Logo-moovi.png"  alt="logo"/>
      </Menu.Item>
      <Menu.Item
        name='home'
        active={props.activeItem === 'home'}
        onClick={props.handleItemClick}
        color="blue"
      />
      <Menu.Menu borderless position="right">
        <Menu.Item>
          <Link to="/users/login">
            <Button basic inverted color="blue" >
              Login
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/users/signup">
            <Button basic inverted color="blue" style={{marginLeft: '-20px'}}>
              Signup
            </Button>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
export default SignInNavbar;