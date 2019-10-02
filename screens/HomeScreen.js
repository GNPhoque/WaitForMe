import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';

import { getTranslation, navigate, isWider } from '../constants/HELPER';
import BaseScreen from '../layout/BaseComponent';
import AuthModal from '../components/modal/AuthModal';
import firebase from '../firebase';
import STYLES from '../constants/STYLES';


class HomeScreen extends Component{
	constructor(props){
		super(props);
		this.state = { message: ''};
		this.getTranslation = getTranslation.bind(this);
		this.navigate = navigate.bind(this);
	}

  createUserFromFrontendFirebase = () => {
    firebase.auth().createUserWithEmailAndPassword('support@wait', 'aaaaaa').catch((error) => {
      console.error(error.code);
      console.error(error.message);
      console.error(this.getTranslation(error.code) || `${error.code} : ${error.message}`);
      return;
    });
  }

  logout = () => {
    firebase.auth().signOut()
    .catch((error)=>console.error(error));
  }

	testClick = () => {
    firebase.auth().signInWithEmailAndPassword('lafont_jordan@hotmail.fr', 'azeaze')
    // .then((data)=>{
    //   console.log('AUTH SUCCESS');
    //   data.user.getIdTokenResult().then((token)=>{
    //     console.log(token)
    //   })
    // })
    .catch(function(error) {
      console.error('AUTH FAILURE');
      console.error(error);
      console.error(error.message);
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
										<Button onPress={()=>this.navigate('Booking')} title={this.getTranslation('hireWaiter')}/>
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
										<Button onPress={()=>this.logout()} title={'LOGOUT'}/>
										<Button onPress={()=>this.createUserFromFrontendFirebase()} title={'LOGOUT'}/>
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