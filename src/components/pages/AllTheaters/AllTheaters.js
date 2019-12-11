import React, { Component } from 'react';
import api from '../../../api/api';
import { List, Avatar } from 'antd';
import { Container } from './AllTheaters.styles'

export class AllTheaters extends Component {
  state = {
    allTheaters: [],
  }

  async componentDidMount() {
    const resp = await this.getAllTheatersData();
    this.setState({
      allTheaters: resp.data,
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

//   listAllData = () => {
//     const { allTheaters } = this.state; 
//     return allTheaters.map((oneTheater) => {
//       return <h1 key={`this is ${oneTheater.name}`} >{oneTheater.name}</h1>;
//     })
// }
  

render() {
  const listOfData =  this.state.allTheaters;
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
    </Container>
          )
        }
      }
      
      
      
      // <div>
      //   {this.listAllData()}
      // </div>