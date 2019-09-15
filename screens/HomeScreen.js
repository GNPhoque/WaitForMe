import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
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
						<Text style={STYLES.homeText}>{`${this.getTranslation('intro1')}\n${this.getTranslation('intro2')}\n\n${this.getTranslation('intro3')}`}</Text>

						<View style={STYLES.homeMain}>

							<View style={STYLES.homeFrame}>
								<View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
									<Text style={STYLES.homeFramedTextHeader}>{this.getTranslation('frameText1')}</Text>
									<Text style={STYLES.homeText}>{this.getTranslation('waitDesc1')}</Text>
									<Text style={STYLES.homeText}>{this.getTranslation('waitDesc2')}</Text>
									<Text style={STYLES.homeText}>{this.getTranslation('waitDesc3')}</Text>
									<Text style={STYLES.homeFramedTextHeader}>{this.getTranslation('waitDesc4')}</Text>
								</View>
								<View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
									<TouchableOpacity style={{margin:8}}>
										<Button onPress={()=>this.navigate('Contact')} title={this.getTranslation('hireWaiter')}/>
									</TouchableOpacity>
								</View>
							</View>

							{/* <View style={{borderLeftWidth: 1}}/> */}

							<View style={STYLES.homeFrame}>
								<View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
									<Text style={STYLES.homeFramedTextHeader}>{this.getTranslation('frameText2')}</Text>
									<Text style={STYLES.homeText}>{this.getTranslation('engage1')}</Text>
								</View>
								<View style={{alignContent: 'flex-end'}}>
									<TouchableOpacity style={{margin:8}}>
										{/* <Button onPress={()=>this.setState({modal:this.navigate('Contact')})} title={this.getTranslation('becomeWaiter')}/> */}
										<Button onPress={()=>this.testClick()} title={this.getTranslation('becomeWaiter')}/>
									</TouchableOpacity>
								</View>
							</View>
						</View>

						<AuthModal/>

					</View>
			}/>
		)
	}
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(HomeScreen);