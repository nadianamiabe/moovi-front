import React, { Component } from 'react'
import LoggedNavbar from './LoggedNavbar';
import SignInNavbar from './SinginNavbar';

export default class NewNavbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const { activeItem } = this.state;
    const {setVisible, isAuth, logoutUser } = this.props;

    return (
      <div>
        {isAuth ? (
          <LoggedNavbar
            setVisible={setVisible}
            logoutUser={logoutUser} 
            handleItemClick={this.handleItemClick}
            activeItem={activeItem} 
          />
        ) : (
          <SignInNavbar 
            setVisible={setVisible}
            activeItem={activeItem}
            handleItemClick={this.handleItemClick}
          />
        )
      }
    </div>
    )
  }
}
