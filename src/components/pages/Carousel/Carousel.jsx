import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import "./Carousel.css";
class CarouselHome extends Component {
  render() {
    return (
      <Link to="/movies/now-playing">
        <Carousel autoplay>
          <div className="marvel"></div>
          <div className="liga-da-jutica"></div>
          <div className="toy-story"></div>
          <div className="fast-and-furious"></div>
        </Carousel>
      </Link>

      // mountNode
    );
  }
}

export default CarouselHome;
