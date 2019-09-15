import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import WebPicker from '../components/WebPicker';
import BaseScreen from '../layout/BaseComponent';
import MapView from 'react-native-maps';
import STYLES from '../constants/STYLES';
import GoogleMapsAutoComplete from '../components/GoogleMapsAutoComplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Booking extends Component {
  constructor(props){
    super(props);
    const val = this.getMinDateTime();
    this.state = { 
      minDate: val.minDate, minTime: val.minTime, 
      bookingDate: val.minDate, bookingTime: '12:00', 
      address: '',
      marker: null,
      errors: { date: '', time: '' } }
  }

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

  validateForm = () => {
    let errors = { date: ''};
    if(new Date(`${this.state.minDate}T${this.state.minTime}`) >= new Date(`${this.state.bookingDate}T${this.state.bookingTime}`)){
    console.log("KO")
    errors.date = 'Booking date must be in at least 24 hours.';
    }
    this.setState({errors});
    if(errors.date == '')
    this.bookWait();
  }

  bookWait = () => {
    this.setState({address:'azeaze'})
    //Call book function
  }

  setMarker = (coord) => {
    this.setState({marker: <MapView.Marker coordinate={{latitude:coord.latLng.lat(), longitude:coord.latLng.lng()}}/>})
  }

  render(){
    console.log(this.state);
    return(
      <BaseScreen 
      navigation={this.props.navigation}
      content={
        <View>
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
          <GooglePlacesAutocomplete
  placeholder='Enter Location'
  minLength={2}
  autoFocus={false}
  returnKeyType={'default'}
  fetchDetails={true}
  styles={{
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth:0
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16
    },
    predefinedPlacesDescription: {
      color: '#1faadb'
    },
  }}
  currentLocation={false}
/>
          <TextInput placeholder="Address" onChangeText={(address) => this.setState({address})} value={this.state.address}/>
          <MapView 
          style={STYLES.maps}
          region={{
              latitude: 48.858370,
              longitude: 2.294481,
              latitudeDelta: 0.1,
              longitudeDelta: 0.05,
          }}
          onPress={(coord, point) => this.setMarker(coord, point)}>
            {this.state.marker}
          </MapView>
          <Button title={'Submit'} onPress={()=>this.validateForm()}/>
        </View>
      }>
      </BaseScreen>
    )
  }
}