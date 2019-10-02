import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import BaseScreen from '../layout/BaseComponent';
import { navigate, getTranslation } from '../constants/HELPER';

class Account extends Component{
  constructor(props){
    super(props);
		this.getTranslation = getTranslation.bind(this);
		this.navigate = navigate.bind(this);
  }

  render(){
    return(
      <BaseScreen
        navigation={this.props.navigation}
        content={
          <View>
            <Text>{this.props.auth.isLoggedIn ? `Welcome home ${this.props.user.email}!` : 'You need to log in to see this part.\nConnexion is in the top right corner ;)'}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch'}}>
              <View style={{borderWidth: 1, minWidth: 300, margin: 8, flexGrow: 1}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Account Management</Text>
                  <Text onPress={() => console.log('1')}>Change your password</Text>
                  <Text onPress={() => console.log('2')}>Close your account</Text>
              </View>
              <View style={{borderWidth: 1, minWidth: 300, margin: 8, flexGrow: 1}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Account Management</Text>
                  <Text onPress={() => console.log('1')}>Change your password</Text>
                  <Text onPress={() => console.log('2')}>Close your account</Text>
              </View>
              <View style={{borderWidth: 1, minWidth: 300, margin: 8, flexGrow: 1}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Account Management</Text>
                  <Text onPress={() => console.log('1')}>Change your password</Text>
                  <Text onPress={() => console.log('2')}>Close your account</Text>
              </View>
              <View style={{borderWidth: 1, minWidth: 300, margin: 8, flexGrow: 1}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Account Management</Text>
                  <Text onPress={() => console.log('1')}>Change your password</Text>
                  <Text onPress={() => console.log('2')}>Close your account</Text>
              </View>
              <View style={{borderWidth: 1, minWidth: 300, margin: 8, flexGrow: 1}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Account Management</Text>
                  <Text onPress={() => console.log('1')}>Change your password</Text>
                  <Text onPress={() => console.log('2')}>Close your account</Text>
              </View>
              <View style={{borderWidth: 1, minWidth: 300, margin: 8, flexGrow: 1}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Account Management</Text>
                  <Text onPress={() => console.log('1')}>Change your password</Text>
                  <Text onPress={() => console.log('2')}>Close your account</Text>
              </View>
            </View>
          </View>
        }
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);