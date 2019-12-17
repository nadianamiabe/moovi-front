import React, { Component } from "react";
import { PlayerWrapper, ResponsivePlayer } from "./VideoPLayer.styles";

class VideoPlayer extends Component {
  render() {
    return (
      <PlayerWrapper>
        <ResponsivePlayer url={this.props.url} controls light width="100%" />
      </PlayerWrapper>
    );
  }
}

export default VideoPlayer;
