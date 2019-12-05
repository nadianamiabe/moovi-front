import React, { Component } from 'react';
import api from '../../../api/api';

export class AllTheaters extends Component {
  state = {
    allTheaters: [],
  }

  async componentDidMount() {
    const resp = await this.getAllTheatersData();
    this.setState({
      allTheaters: resp.data.message,
    })
    console.log(resp.data)
  }

  getAllTheatersData = async () => {
    const allData = await api({
      method: "get",
      url: "http://localhost:5000/api/movie-theater/all-places",
    })
    return allData;
  }
  render() {
    return (
      <div>
        <p>{this.state.allTheaters}</p>
      </div>
    )
  }
}


