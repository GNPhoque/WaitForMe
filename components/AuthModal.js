import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import { connect } from 'react-redux';
import Modal from 'modal-enhanced-react-native-web';

import STYLES from "../constants/STYLES";
import { closeModal } from "../reducers/reducerActions";
import { getTranslation, navigate } from '../constants/HELPER';

class AuthModal extends Component{
	constructor(props){
		super(props);
		this.state={mail:'', password:'', confirm:'', signUpDisabled:true, loginDisabled:true, errors:{mail:'', password:'', confirm:''}};
		this.getTranslation = getTranslation.bind(this);
		this.navigate = navigate.bind(this);
    }

    signUp = () => {
        var signUpFunc = firebase.functions().httpsCallable('testOnCall');
		signUpFunc({email: this.state.mail, password: this.state.password })
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

    validateSignUpForm = () => {
        console.log('lost focus');
        let errors = {mail: '', password: '', confirm: ''};
        let signUpDisabled = true;
        const regexPaswd = new RegExp("^(?=.*[a-z][A-Z])(?=.*[0-9])(?=.*[!\\/.@#\$%\^&\*])(?=.{8,})")
        if (!this.state.mail.includes('@'))
            errors.mail='Missing @ symbol';
        if (!this.state.password.match(regexPaswd))
            errors.password = 'Password is not valid';
        if (this.state.password !== this.state.confirm)
            errors.confirm = 'Passwords do not match';        
        if (errors.mail === '' && errors.password === '' && errors.confirm === '')
            signUpDisabled = false;
        this.setState({errors, signUpDisabled});
    }

    render(){
        return(
            <Modal
                isVisible={this.props.modal.show_auth_modal}
                onBackdropPress={() => this.props.closeModal()}
                >
                <View style={STYLES.authModalContent}>

                    <View style={{flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
                        <View>
                            <Text>Create your WaitForMe account. It’s free and only takes a minute.</Text>
                            <Text style={{fontWeight:'bold', margin: 2}}>Email</Text>
                            <TextInput style={{borderWidth: 1, margin: 2}} placeholder="E-mail address" onChangeText={(mail) => this.setState({mail})} onBlur={()=>this.validateSignUpForm()}/>
                            <Text style={{color:'red', margin: 2}}>{this.state.errors.mail}</Text>
                            <Text style={{fontWeight:'bold', margin: 2}}>Password</Text>
                            <TextInput style={{borderWidth: 1, margin: 2}} placeholder="Password" onChangeText={(password) => this.setState({password})} onBlur={()=>this.validateSignUpForm()}/>
                            <Text style={{color:'red', margin: 2}}>{this.state.errors.password}</Text>
                            <Text>Passwords must be at least 8 characters long and contain at least 1 letter, 1 number and a special character</Text>
                            <Text style={{fontWeight:'bold', margin: 2}}>Confirm password</Text>
                            <TextInput style={{borderWidth: 1, margin: 2}} placeholder="Confirm password" onChangeText={(confirm) => this.setState({confirm})} onBlur={()=>this.validateSignUpForm()}/>
                            <Text style={{color:'red', margin: 2}}>{this.state.errors.confirm}</Text>
                        </View>
                        <Button title="Sign up" onPress={()=>this.signUp()} disabled={this.state.signUpDisabled}/>
                    </View>

                    {/* <View style={{borderLeftWidth: 1}}/> */}

                    <View style={{flexDirection: "column", justifyContent: "flex-start", margin: 32, alignItems: "center"}}>
                        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={STYLES.homeFramedTextHeader}>{this.getTranslation('frameText2')}</Text>
                            <Text style={STYLES.homeText}>{this.getTranslation('engage1')}</Text>
                        </View>
                        <View style={{alignContent: 'flex-end'}}>
                            <TouchableOpacity style={{margin:8}}>
                                <Button onPress={()=>console.log('click')} title={this.getTranslation('becomeWaiter')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () => dispatch(closeModal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);