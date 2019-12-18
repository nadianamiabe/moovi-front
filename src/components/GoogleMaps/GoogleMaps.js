import React, { Component } from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/js?key=AIzaSyCQpuEpO4UtIbYaCSI_-v9_bBuxOgTMbKw&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
      markerIndex: 0
    }),
    {
      onToggleOpen: ({ isOpen }) => index => ({
        isOpen: !isOpen,
        markerIndex: index
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
    const { latitude, longitude } = props.position
    const markersList =  props.list.map((marker, i) => {
      const index = i + 1 ;
      return (
        <Marker  
          key={i}
          label={index.toString()}
          position={{ lat: marker.location.lat, lng: marker.location.lng }} 
          onClick={ () => { props.showTime(marker._id)}
        }
        onMouseOver={ () => { props.onToggleOpen(index)}
        }
        >
          { props.isOpen && props.markerIndex === index &&
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                  <h1 style={{ fontSize: '1rem', }}>{marker.name}</h1> 
                  <p style={{ fontSize: '0.8rem', }}>{marker.address}</p>  
                </div>
              </InfoWindow>
          }
        </Marker>
      )
      })


  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: latitude, lng: longitude }}
          onClick={props.onMarkerClick}
        />
      )}
      {markersList}
    </GoogleMap>
  );
});

class MyGoogleComponent extends Component {
  state = {
    isMarkerShown: true
  };

  componentDidMount = async () => {
    this.delayedShowMarker();
    // await this.getLocation()
  };

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 1000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={() => {
            // showPlaceInfo()
            this.handleMarkerClick();
          }}
          position={this.props.currentPos}
          list={this.props.list}
          showTime= {this.props.showTime}
        />
      </>
    );
  }
}

export default MyGoogleComponent;
