import { Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBrowserApp } from '@react-navigation/web';

import HomeScreen from '../screens/HomeScreen';
import Contact from '../screens/ContactScreen';
import EmailVerification from '../components/EmailVerification';
import Responsive from '../components/Responsive';
import Login from '../components/Login';
import Maps from '../screens/Maps';
import Test from '../components/test';
import Booking from '../screens/Booking';

const createApp = Platform.select({
	web: config => createBrowserApp(config),
	default: config => createAppContainer(config),
});

export default createApp(
	createSwitchNavigator({
		HomeScreen : {screen: HomeScreen, path: ''},
		Booking : {screen: Booking, path: 'Booking'},
		Contact : {screen: Contact, path: 'Contact'},
		EmailVerification : {screen : EmailVerification, path: 'confirm_email/:uid'},
		Responsive : {screen: Login, path: 'responsive'},
		Maps : {screen: Maps, path: 'Maps'},
		test : {screen: Test, path: 'test'}
	},{
		initialRouteName:'HomeScreen',
	})
);