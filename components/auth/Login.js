import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

import { closeModal } from "../../reducers/reducerActions";
import { getTranslation } from '../../constants/HELPER';
import firebase from '../../firebase';


class Login extends Component{
  constructor(props){
		super(props);
		this.state={ mail: '', password: '', error: '' };
		this.getTranslation = getTranslation.bind(this);
  }

  login = () => {
    if(this.validateLoginForm()){
      firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password)
      .then(() => {
        this.props.closeModal();
      })
      .catch((error)=>{
        console.error(error);
        this.setState({ loginErrors:  this.getTranslation(error.code) || `${error.code} : ${error.message}` });
      });
    }
  }

  validateLoginForm = () => {
      let error = '';
      let loginDisabled = false;
      if(this.state.mail === ''){
        error = 'Email is empty';
        loginDisabled = true;
      }
      else if(this.state.password === ''){
        error = 'Password is empty';
        loginDisabled = true;
      }
      this.setState({ error });
      return loginDisabled === false;
  }

  render(){
    return(
      <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>                    
        <View>
          <Text>Already a member?</Text>
          <Text style={{color:'red', margin: 2}}>{this.state.loginErrors}</Text>
          <Text style={{fontWeight:'bold', margin: 2}}>Email</Text>
          <TextInput style={{borderWidth: 1, margin: 2}} textContentType={'emailAddress'} placeholder="E-mail address" onChange={(loginMail) => {console.log(loginMail);this.setState({loginMail})}}/>
          <Text style={{fontWeight:'bold', margin: 2}}>Password</Text>
          <TextInput style={{borderWidth: 1, margin: 2}} textContentType={'password'} secureTextEntry={true} placeholder="Password" onChangeText={(loginPass) => this.setState({loginPass})}/>
        </View>
        <Button title="Sign up" onPress={()=>this.login()} disabled={this.state.loginDisabled}/>
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);