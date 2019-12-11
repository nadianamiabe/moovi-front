import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

class navbar extends Component {
  render() {
    const { Header } = Layout;
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', float: 'right' }}
        >
          <Menu.Item key="1">Entrar</Menu.Item>
          <Menu.Item key="2">Se Cadastre!</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default navbar;
