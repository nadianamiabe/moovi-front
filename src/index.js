import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import 'tachyons';
import App from './App';
import Navbar from './components/pages/Navbar/Navbar';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer } = Layout;

ReactDOM.render(
  <Layout>
    <Navbar />
    <div
      style={{
        background: '#fff',
        padding: 0,
        minHeight: 380,
        marginTop: 50
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
    <Footer style={{ textAlign: 'center' }}>Created by Moovi ©2019</Footer>
  </Layout>,

  document.getElementById('root')
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
