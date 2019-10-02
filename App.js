import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { View } from 'react-native';

import firebase from './firebase';
import AppNavigator from './navigation/AppNavigator';
import languageReducer from './reducers/LanguageReducer';
import STYLES from './constants/STYLES';
import { loggedIn, loggedOut } from './reducers/reducerActions';

const store = createStore(languageReducer);

export default class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        store.dispatch(loggedIn(user));
      } else {
        store.dispatch(loggedOut());
      }
    });
  }

  render(){
    return (
      <Provider store={ store }>
        <View style={STYLES.pageContainer}>
          <AppNavigator/>
        </View>
      </Provider>
    );
  };
}