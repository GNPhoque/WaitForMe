import React, { Component } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { connect } from 'react-redux';

import STYLES from "../../constants/STYLES";
import { closeModal } from "../../reducers/reducerActions";
import { getTranslation } from '../../constants/HELPER';
import firebase from '../../firebase';

class AuthModal extends Component{
	constructor(props){
		super(props);
		this.state={ mail:'', password:'', confirm:'', signUpDisabled:true, signupErrors:{ main: '', confirm: '' } };
		this.getTranslation = getTranslation.bind(this);
  }

  createUser = () => {
    if(this.validateSignUpForm()){
      firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
      .then(() => {
        this.closeModal();
      })
      .catch((error) => {
        this.setState({ errors: { main: this.getTranslation(error.code) || `${error.code} : ${error.message}` } });
        return;
      });
    }
  }

  validateSignUpForm = () => {
      let errors = {main: '', confirm: ''};
      let signUpDisabled = true;
      if(this.state.mail == '')
        errors.main = 'Email is empty';
      if (this.state.password !== this.state.confirm)
          errors.confirm = 'Passwords do not match';
      if(errors.main == '' && errors.confirm == '')
        signUpDisabled = false;
      this.setState({errors, signUpDisabled});
      return signUpDisabled === false;
  }

  render(){
    return(
      <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>                    
        <View>
          <Text>Create your WaitForMe account. It’s free and only takes a minute.</Text>
          <Text style={{color:'red', margin: 2}}>{this.state.signupErrors.main}</Text>
          <Text style={{color:'red', margin: 2}}>{this.state.signupErrors.confirm}</Text>
          <Text style={{fontWeight:'bold', margin: 2}}>Email</Text>
          <TextInput style={{borderWidth: 1, margin: 2}} textContentType={'addressCity'}  placeholder="E-mail address" onSelectionChange={(t)=>{console.log('selectChange');console.log(t)}} onChangeText={(mail) => this.setState({mail})}/>
          <Text style={{fontWeight:'bold', margin: 2}}>Password</Text>
          <TextInput style={{borderWidth: 1, margin: 2}} textContentType={'password'} secureTextEntry={true} placeholder="Password" onChangeText={(password) => this.setState({password})}/>
          <Text style={{fontWeight:'bold', margin: 2}}>Confirm password</Text>
          <TextInput style={{borderWidth: 1, margin: 2}} textContentType={'password'} secureTextEntry={true} placeholder="Confirm password" onChangeText={(confirm) => this.setState({confirm})}/>
        </View>
        <Button title="Sign up" onPress={()=>this.createUser()} disabled={this.state.signUpDisabled}/>
      </View>
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