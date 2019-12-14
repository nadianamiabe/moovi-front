import React, { Component } from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQpuEpO4UtIbYaCSI_-v9_bBuxOgTMbKw&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
    const {latitude, longitude} = props.position
    return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: -23.56165000482843, lng: -46.66010253294923 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: latitude, lng: longitude }} onClick={props.onMarkerClick} />}

    </GoogleMap>
    )
})

class MyGoogleComponent extends Component {
  state = {
    isMarkerShown: true,
    currentPos: {
      latitude: null,
      longitude: null, 
    }
  }

  componentDidMount = async () => {
    this.delayedShowMarker()
    await this.getLocation()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 1000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  getLocation = () => {
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
    })
    console.log('current position is:',  this.state.currentPos)
  }

  render() {
    console.log()
    return (
      <>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          position={this.state.currentPos}
        />
        <h1>This is position {this.state.currentPos.latitude}</h1>
        <h1>This is position {this.state.currentPos.longitude}</h1>
      </>
    )
  }
}

export default MyGoogleComponent
