

import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import MapView from 'react-native-web-maps';
import { connect } from 'react-redux';

import STYLES from '../constants/STYLES';
import BaseScreen from '../layout/BaseComponent';
import { getTranslation, navigate } from '../constants/HELPER';
import AuthModal from '../components/AuthModal';
import firebase from '../firebase';


class HomeScreen extends Component{
	constructor(props){
		super(props);
		this.state = { message: ''};
		this.getTranslation = getTranslation.bind(this);
		this.navigate = navigate.bind(this);
	}

	testClick = () => {
		var addMessage = firebase.functions().httpsCallable('testOnCall');
		addMessage({email: "lafont_jordan@hotmail.fr", password: 'azeaze' })
		.then((result) => {
			// Read result of the Cloud Function.
			console.log(result)
			if(result.data.errorInfo){
				console.log(result.data.errorInfo.message)
			}
			this.setState({message: result.data});
		}).catch(function(error) {
			// Getting the Error details.
			var code = error.code;
			var message = error.message;
			var details = error.details;
			// ...
			console.log(error);
		});
	}

	componentDidMount(){
		document.title = this.getTranslation('tabNameHome');
	}

	render(){
		return(
			<BaseScreen 
				navigation={this.props.navigation} 
				content={
					<View>
						<MapView 
            style={{height:1300, width:900}}
            region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
            }}>
            </MapView>
					</View>
			}/>
		)
	}
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(HomeScreen);