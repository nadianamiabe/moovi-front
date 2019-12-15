import React, { Component } from 'react';
import api from '../../../api/api';
import { List, Avatar } from 'antd';
import { Container } from './AllTheaters.styles'
import MyGoogleComponent from '../../GoogleMaps/GoogleMaps'

export class AllTheaters extends Component {
  state = {
    allTheaters: [],
    currentPos: {
      latitude: null,
      longitude: null, 
    },
    isLoaded: false,

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
    console.log(allData)
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
        allTheaters: resp.data,
        isLoaded: true,
      })
      console.log(resp.data)
    })
    console.log('current position is:',  this.state.currentPos)
  }

//   listAllData = () => {
//     const { allTheaters } = this.state; 
//     return allTheaters.map((oneTheater) => {
//       return <h1 key={`this is ${oneTheater.name}`} >{oneTheater.name}</h1>;
//     })
// }
  

render() {
  const listOfData =  this.state.allTheaters;
  const { isLoaded } = this.state 
  return (
    isLoaded ? 
      <Container>
        <MyGoogleComponent currentPos={this.state.currentPos} list={this.state.allTheaters} />
        <List
        itemLayout="horizontal"
        dataSource={listOfData}
        renderItem={item => (
          <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={item.address}
                    />
                </List.Item>
              )}
              />
      </Container>
            :
      <h1>Is Loading, wait a second</h1>   
  )
        }
}
      
      
      
      // <div>
      //   {this.listAllData()}
      // </div>