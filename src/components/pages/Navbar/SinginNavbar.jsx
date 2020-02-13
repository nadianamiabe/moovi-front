import React from 'react';
import { Button, Menu, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const SignInNavbar = (props) => {

  return (
    <Menu borderless size='large' inverted fixed="top">
      <Menu.Item header as={Link} to="/">
        <Image size="small" src="/images/Logo-moovi2.png"  alt="logo"/>
      </Menu.Item>
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
            <Button basic inverted color="blue" style={{marginLeft: '-30px'}}>
              Signup
            </Button>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
export default SignInNavbar;