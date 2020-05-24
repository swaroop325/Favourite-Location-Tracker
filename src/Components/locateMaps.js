import React, {  } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
  state = {
    markers: [
      {
        name: "Current position",
        position: {
          lat: 13.0827,
          lng: 80.2707
        }
      }
    ]
  };

  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
    this.props.handleLocation(lat, lng);
  };

  render() {
    return (
      <Map
        google={this.props.google}
        style={{
          position: 'fixed',
          width: "100%",
          height: "55%",
        }}
        initialCenter={{
          lat: 13.0827,
          lng: 80.2707
        }}
        zoom={10}>
        {this.state.markers.map((marker, index) => (
          <Marker
            position={marker.position}
            draggable={true}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
            name={marker.name}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD5eTNNRzPBVuU5mGkfYFNPa46_P2qNVgo'
})(MapContainer);