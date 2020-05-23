import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        let markerData = [];
        markerData = props.location.map(loc => {
            return {
                name: loc.title,
                position: {
                    lat: loc.lat,
                    lng: loc.lng
                }
            };
        });
        markerData.push({
            name: "Current position",
            position: {
                lat: 13.0827,
                lng: 80.2707
            }
        });
        this.state = {
            markers: markerData,
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {}
        };
    }


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

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        return (
            <Map
                google={this.props.google}
                style={{
                    width: "50%",
                    height: "100%",
                }}
                initialCenter={{
                    lat: 13.0827,
                    lng: 80.2707
                }}
                zoom={10}>
                {this.state.markers.map((marker, index) => (
                    <Marker
                        position={marker.position}
                        draggable={false}
                        onClick={this.onMarkerClick}
                        name={marker.name}
                    >
                    </Marker>
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyD5eTNNRzPBVuU5mGkfYFNPa46_P2qNVgo'
})(MapContainer);