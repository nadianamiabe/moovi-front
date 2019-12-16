import React, { Component } from 'react';
import api from '../../../api/api';
import { List, Avatar, Icon, Tag } from 'antd';
import { Container } from './AllTheaters.styles'
import MyGoogleComponent from '../../GoogleMaps/GoogleMaps'

export class AllTheaters extends Component {
  state = {
    allTheaters: [],
    currentPos: {
      latitude: null,
      longitude: null, 
    },
    city: null,
    isLoaded: false,
    allSessions: [],
  }

  async componentDidMount() {
    this.getLocation()
  }

  getAllTheatersData = async () => {
    const lat = this.state.currentPos.latitude;
    const lng = this.state.currentPos.longitude;
    const allData = await api({
      method: "get",
      url: `http://localhost:5000/api/movie-theater/all-places/lat/${lat}/lng/${lng}`,
    })
    console.log(allData.data.allPlacesDB)
    return allData;
  }

  getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates)
    }
  }

  getCoordinates = (position) => {
    this.setState({
      currentPos: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    }, async () => {
      const resp = await this.getAllTheatersData();
      this.setState({
        allTheaters: resp.data.allPlacesDB,
        isLoaded: true,
        city: resp.data.userCity,
      })
      console.log(resp.data)
    })
    console.log('current position is:',  this.state.currentPos)
  }

  getSessions = async (id) => {
    this.setState({ allSessions: [] })
    const { city } = this.state
    const resp = await api({
      method: "get",
      url: `http://localhost:5000/api/sessions/${id}/${city}`,
    })
    this.setState({ allSessions: resp.data })
    console.log('this state allSessions', this.state.allSessions
    )
  }


  getIdByName = async (id) => {
    this.setState({ allSessions: [] })
    const { city } = this.state
    const resp = await api({
      method: "get",
      url: `http://localhost:5000/api/sessions/${id}/${city}`,
    })
    this.setState({ allSessions: resp.data })
    console.log('this state allSessions', this.state.allSessions
    )
  }

  renderShowTime = (item) => {
    let timesString = ''
    for (let i = 0; i < item.times.length; i += 1)  {
      timesString += `${item.times[i]}  |  `
    }
    return (
      <List.Item>
          <List.Item.Meta
            avatar={<Avatar shape="square" src="../../../../public/images/cinemark-full-logo.jpg" />}
            title={<a href="https://ant.design">{item.movie}</a>}
            description={timesString}
          />
      </List.Item>
      )
    }

render() {
  const listOfData =  this.state.allSessions;
  const { isLoaded } = this.state 
  return (
    isLoaded ? 
      <Container>
        <MyGoogleComponent 
          currentPos={this.state.currentPos} 
          list={this.state.allTheaters}
          showTime={this.getSessions} />
        <List
        itemLayout="horizontal"
        dataSource={listOfData}
        renderItem={item => (this.renderShowTime(item))}
        />
      </Container>
            :
      <Icon type="loading" style={{ height: '50px', marginTop: '30px', textAlign: 'center' }} />   
  )
        }
}