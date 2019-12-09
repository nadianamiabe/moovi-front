import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import "tachyons";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout>
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px", float: "right" }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Entrar</Menu.Item>
        <Menu.Item key="3">Se Cadastre!</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px", marginTop: 64 }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        ,
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>Created by Moovi ©2019</Footer>
  </Layout>,

  document.getElementById("root")
);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
