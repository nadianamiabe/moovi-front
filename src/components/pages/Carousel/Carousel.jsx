import React, { Component } from 'react';
import { Carousel } from 'antd';
import './Carousel.css';
class CarouselHome extends Component {
  render() {
    return (
      <Carousel autoplay>
        <div className="marvel"></div>
        <div className="liga-da-jutica"></div>
        <div className="toy-story"></div>
        <div className="fast-and-furious"></div>
      </Carousel>

      // mountNode
    );
  }
}

export default CarouselHome;
