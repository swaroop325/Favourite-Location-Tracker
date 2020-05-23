import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        let markerData = [];
        let initialPosition = props.position ? props.position : {
            lat: 13.0827,
            lng: 80.2707
        }
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
            selectedPlace: {},
            center: initialPosition
        };
    }

    componentWillReceiveProps(nextProps) {
        var that = this;
        var markersList = nextProps.selectLocation;
        navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords;
            markersList.push({
                name: "Current position",
                position: {
                lat: coords.latitude,
                lng: coords.longitude
              }
            });
            that.setState({
                markers: markersList
            });
            that.calculateDistance(markersList);
          })
    }

    calculateDistance(data){
        var lat1 = data[0].position.lat
        var lat2 = data[1].position.lat
        var lon1 = data[0].position.lng
        var lon2 = data[1].position.lng
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344 
            alert("The distance to your favourite location is " +dist+" Kms");
        }
    }


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
                initialCenter={this.state.center}
                center={this.state.center}
                zoom={10}>
                {this.state.markers.map((marker, index) => (
                    <Marker key={index}
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