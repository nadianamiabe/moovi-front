import React, { Component } from "react";
import api from '../../../api/api';

class MovieDetails extends Component {
  state = {
    tmdbDetail: {},
    omdbDetail: {},
  };

  async componentDidMount() {
    const data = await this.getDetails();
    console.log(data);
    const { tmdbDetail, omdbDetail } = data;
    this.setState({ tmdbDetail, omdbDetail });
  }

  getDetails = async () => {
    const { id } = this.props.computedMatch.params;
    console.log(id);
    const res = await api.get(`http://localhost:5000/api/movies/${id}`);
    return res.data;
  };

  render() {
    const { title } = this.state.tmdbDetail;
    return (
      <div>
        <p>{title}</p>
      </div>
    );
  }
}

export default MovieDetails;
