import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PlacesAutocomplete, { geocodeByAddress,getLatLng } from 'react-places-autocomplete';

import IMAGES from '../constants/IMAGES';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

export default class GooglePlacesAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      center: { lat: 48.858370, lng: 2.294481 }, //Eiffel Tower
      address: '',
      selectedAddress: '',
      marker: null,
      place : null
    };
  }

  handleMapMounted = (map) => {
    this.map = map;
  }

  handleInputChange = address => {
    this.setState({ address });
  };

  handleInputSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          this.setState({
            center: { 
              lat: latLng.lat, 
              lng: latLng.lng 
            },
            selectedAddress: address
          })
      })
      .catch(error => console.error('Error', error));
  };

  setSuggestion(suggestion, mode){
    if(mode == "autocomplete"){
      this.handleInputSelect(suggestion.description);
    }    
    this.setState({ 
      address : suggestion.description,
      place : {
        id : suggestion.placeId,
        name : suggestion.formattedSuggestion.mainText,
        address : suggestion.formattedSuggestion.secondaryText
      }
    });
    this.refs.autocomplete.handleInputOnBlur();
  }

  selectPlace(){
    this.props.onSelectPlace({
      ...this.state.place,
      location : {
          lat : this.state.center.lat,
          lng : this.state.center.lng
      }
    });
  }

  _attemptReverseGeocodeAsync = async (coords) => {
    const url = `https://eu1.locationiq.com/v1/reverse.php?key=a6e4c1aab7ea2f&lat=${coords.latitude}&lon=${coords.longitude}&format=json`;
    return fetch(url)
    .then(function (response) {
        return response.json()
            .then(function (value) {
                return value;
            });
    })
    .catch((e)=>{return e})
  };

  onPress = (position) => {
    const coords = {latitude:position.latLng.lat(), longitude:position.latLng.lng()};
    this._attemptReverseGeocodeAsync(coords).then(result => {
      this.setState({
        selectedAddress:result.display_name,
        address:result.display_name,
        marker: <Marker draggable={false} position={{lat:coords.latitude, lng:coords.longitude}}/>
      })
    })
    .catch((error)=> {
      console.log('error',error);
    })
  };

  render() {
    console.log('state',this.state);
    if (!this.state.center)
      return (
        <View>
          <ActivityIndicator />
        </View>
      );

    return (
      // <BaseScreen
      // navigation={this.props.navigation} 
      // content={

      <View style={{flex:1}}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<View style={{ height: 1, flex : 1 }} />}
          mapElement={<div style={{ height: '50%', margin: 8 }} />}
          center={this.state.center}
          onDragStart={this.props.onRegionChange}
          onDragEnd={this.onDragEnd}
          defaultZoom={15}
          onClick={(position)=>this.onPress(position)}
          defaultOptions={{
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            //zoomControl: false,
            rotateControl: false,
            fullscreenControl: false
          }}
        >
          {this.state.marker}
        </GoogleMapContainer>
        <View style={{width : "100%", position : "absolute", top : 48, left : 0, height: 45,paddingLeft: 15,paddingRight : 15}}>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleInputChange}
            onSelect={(data) => this.handleInputSelect(data, true)}
            ref="autocomplete"
            searchOptions={{
              location: new google.maps.LatLng(this.state.center.lat, this.state.center.lng),
              radius: 20000 * 1000
            }}
          >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: this.props.searchText,
                  className: 'location-search-input',
                })}
                style={{width : "calc(100% - 15px)", height : 43, border: "none",borderRadius : 4, paddingLeft : 15}}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: 'white', cursor: 'pointer', width : "calc(100% - 15px)", paddingLeft : 15 }
                    : { backgroundColor: 'white', cursor: 'pointer', width : "calc(100% - 15px)", paddingLeft : 15 };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      onClick={() => this.setSuggestion(suggestion, "autocomplete")}
                    >
                      <div style={{width : "100%", height : 28, paddingTop : 7.5, marginBottom : 2, fontWeight : "bold"}}>{suggestion.formattedSuggestion.mainText}</div>
                      <div style={{width : "100%", height : 28, marginTop : 2, marginBottom : 2}}>{suggestion.formattedSuggestion.secondaryText}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          </PlacesAutocomplete>
        </View>
      </View>
      
    // }s
    );
  }
}