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
    }

  }

  async componentDidMount() {
    const resp = await this.getAllTheatersData();
    this.setState({
      allTheaters: resp.data,
    })
    // this.getLocation()
    console.log(resp.data)
  }

  getAllTheatersData = async () => {
    const allData = await api({
      method: "get",
      url: "http://localhost:5000/api/movie-theater/all-places",
    })
    return allData;
  }

  // getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.getCoordinates)
  //   }
  // }

  // getCoordinates = (position) => {
  //   this.setState({
  //     currentPos: {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     }
  //   })
  //   console.log('current position is:',  this.state.currentPos)
  // }

//   listAllData = () => {
//     const { allTheaters } = this.state; 
//     return allTheaters.map((oneTheater) => {
//       return <h1 key={`this is ${oneTheater.name}`} >{oneTheater.name}</h1>;
//     })
// }
  

render() {
  const listOfData =  this.state.allTheaters;
  const { currentPos } = this.state 
  return (
    <Container>
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
      <MyGoogleComponent />
      <h1>My curret positin is : latitude: {currentPos.latitude} and longitude:{currentPos.latitude} </h1>
    </Container>
          )
        }
      }
      
      
      
      // <div>
      //   {this.listAllData()}
      // </div>