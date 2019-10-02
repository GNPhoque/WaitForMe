import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PlacesAutocomplete, { geocodeByAddress,getLatLng } from 'react-places-autocomplete';

import BaseScreen from '../layout/BaseComponent';
import WebPicker from '../components/WebPicker';
import ConfirmModal from '../components/modal/ConfirmModal';
import { showConfirmModal } from '../reducers/reducerActions';
import { navigate, getTranslation } from '../constants/HELPER';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

class Booking extends Component {
  constructor(props){
    super(props);
    const val = this.getMinDateTime();
    this.state = { 
      minDate: val.minDate, minTime: val.minTime, 
      bookingDate: val.minDate, bookingTime: '12:00', 
      center: { lat: 48.858370, lng: 2.294481 }, //Eiffel Tower
      address: '',
      marker: null,
      selectedAddress: '',
      place : null,
      errors: { date: '', time: '' } 
    }
		this.getTranslation = getTranslation.bind(this);
		this.navigate = navigate.bind(this);
  }

  //DATETIME
  getMinDateTime = () => {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const vDate = `${year}-${ month < 10 ? '0' + month : month }-${ day < 10 ? '0' + day : day }`;
    const vTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return { minDate: vDate, minTime: vTime };
  }

  formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let formattedDate = `${year}-${ month < 10 ? '0' + month : month }-${ day < 10 ? '0' + day : day }`;
    return formattedDate;
  }

  //SUBMIT
  validateForm = () => {
    let errors = { date: '', address: '' };
    if(new Date(`${this.state.minDate}T${this.state.minTime}`) >= new Date(`${this.state.bookingDate}T${this.state.bookingTime}`))
      errors.date = this.getTranslation('errorDate');
    /*TODO : VALIDATE ADDRESS HERE
    if(!isvalid(address)) //geocode?
    errors.address = this.getTranslation('errorAddress');
    */
    this.setState({errors});
    if(errors.date == '' && errors.address == '')
      this.props.showConfirmModal();
  }

  //MAPS
  setMarker = (coord) => {
    this.setState({marker: <Marker coordinate={{latitude:coord.latLng.lat(), longitude:coord.latLng.lng()}}/>})
  }

  _attemptReverseGeocodeAsync = async (coords) => {
    const url = `https://eu1.locationiq.com/v1/reverse.php?key=a6e4c1aab7ea2f&lat=${coords.latitude}&lon=${coords.longitude}&addresdetails=1&format=json`;
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
      console.log(result)
      this.setState({
        selectedAddress:result.display_name,
        address:result.display_name,
        marker: <Marker draggable={false} position={{lat:coords.latitude, lng:coords.longitude}}/>
      })
    })
    .catch((error)=> {
      console.error(error);
    })
  };

  handleMapMounted = (map) => {
    this.map = map;
  }

  //AUTOCOMPLETE
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
      .catch(error => console.error(error));
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

  render(){
    return(
      <BaseScreen 
        navigation={this.props.navigation}
        content={
          <View>
            <View style={{flexDirection:'row'}}>       
              <Text>Date</Text>       
              <WebPicker 
                type={'date'}
                onChange={(v)=> this.setState({ bookingDate: this.formatDate(new Date(v.target.value)) }) } 
                min={ this.state.minDate } 
                value={ this.state.bookingDate } 
              />
              <Text style={{color:'red'}}>{this.state.errors.date}</Text>
              <WebPicker 
                type='time'
                onChange={(t)=>this.setState({ bookingTime : t.target.value})}
                min='08:00'
                max='22:00'
                value={ this.state.bookingTime } 
              />          
            </View>            
            <View style={{height:"300"}}>
              <GoogleMapContainer
                handleMapMounted={this.handleMapMounted}
                containerElement={<View style={{ flex : 1 }} />}
                mapElement={<div style={{ minHeight: 500, margin: 8 }} />}
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
                    location: new window.google.maps.LatLng(this.state.center.lat, this.state.center.lng),
                    radius: 200 * 10
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
            <Button title={'Submit'} onPress={()=>this.validateForm()}/>
            <ConfirmModal/>
          </View>
        }>
      </BaseScreen>
    )
  }
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		showConfirmModal: () => dispatch(showConfirmModal()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);