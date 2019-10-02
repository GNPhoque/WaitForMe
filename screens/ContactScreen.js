import React, {Component} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import STYLES from '../constants/STYLES';

class ContactScreen extends Component{
	constructor(props){
		super(props);
		this.state={mail:'', subject:'', message:'', errors:{mail:'', subject:'', message:''}};
	}

	componentDidMount(){
		document.title = this.props.language.languageFile.tabNameContact;
	}

	sendMail(){
		if(this.validate()){
      console.log("sending mail");
      console.log(this.props.language.languageFile.companyMail);
			fetch('https://us-central1-waitforme-bf9ec.cloudfunctions.net/sendMail', {
			method: 'POST',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
					dest:this.props.language.languageFile.companyMail,
					subject:this.state.subject,
					message:`CONTACT INFO : mail=${this.state.mail}\n\n${this.state.message}`
				}),
			})
			.then((response) => response.text())
			.then((responseValue)=> console.log(responseValue))
			.catch((error) => {
				console.error(error);
			});;
		}
		else(console.log('VALIDATE : FALSE'));
	}

	validate = () => {
		let isFormValid = true;
		let state = {...this.state.errors};
		const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!mailReg.test(this.state.mail)){
			state={...state, mail:'Invalid mail format'};
			isFormValid = false;
	}
		else {
			state={...state, mail:''};
		}
		if(!this.state.subject || this.state.subject.length === 0){
		state = {...state, subject:'Insert subject'};
			isFormValid = false;
	}
		else {
		state = {...state, subject:''};
		}
		if(!this.state.message || this.state.message.length <= 30){
			state = {...state, message:'Message is too short'};
			isFormValid = false;
	}
		else {
			state = {...state, message:''};
		}
		this.setState({errors:state})
		return isFormValid;
	}

	render(){
		return(
			<View style={STYLES.screenContainer}>
				<View>
					<Header navigation={this.props.navigation}/>
					<Text>Contact Screen</Text>
					<View style={{
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between'}}>
						<Text style={STYLES.validationError}>{this.state.errors.mail}</Text>
						<TextInput style={{ borderWidth:1, margin: 8 }} placeholder="Your mail" onChangeText={(mail) => this.setState({mail})}/>
						<Text style={STYLES.validationError}>{this.state.errors.subject}</Text>
						<TextInput style={{ borderWidth:1, margin: 8 }} placeholder="Subject" onChangeText={(subject) => this.setState({subject})}/>
						<Text style={STYLES.validationError}>{this.state.errors.message}</Text>
						<TextInput style={{ borderWidth:1, margin: 8 }} placeholder="Your message" onChangeText={(message) => this.setState({message})} multiline={true} numberOfLines={15}/>
					</View>
					<Button title="SEND MAIL" onPress={()=>this.sendMail()}/>
				</View>
				<Footer/>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
  const { language } = state;
  return { language };
};

export default connect(mapStateToProps)(ContactScreen);