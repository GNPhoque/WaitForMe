import { Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBrowserApp } from '@react-navigation/web';

import HomeScreen from '../screens/HomeScreen';
import Contact from '../screens/ContactScreen';
import EmailVerification from '../components/auth/EmailVerification';
import Booking from '../screens/Booking';
import Account from '../screens/Account';

//TEMP
import Test from '../components/test';

const createApp = Platform.select({
	web: config => createBrowserApp(config),
	default: config => createAppContainer(config),
});

export default createApp(
	createSwitchNavigator({
		HomeScreen : {screen: HomeScreen, path: ''},
		Booking : {screen: Booking, path: 'Booking'},
		Contact : {screen: Contact, path: 'Contact'},
		Account : {screen: Account, path: 'Account'},
		EmailVerification : {screen : EmailVerification, path: 'confirm_email/:uid'},
		test : {screen: Test, path: 'test'}
	},{
		initialRouteName:'HomeScreen',
	})
);