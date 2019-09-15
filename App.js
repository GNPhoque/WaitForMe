import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import languageReducer from './reducers/LanguageReducer';
import STYLES from './constants/STYLES';

const store = createStore(languageReducer);

export default function App() {
  return (
		<Provider store={ store }>
			<View style={STYLES.pageContainer}>
				<AppNavigator/>
			</View>
		</Provider>
  );
}