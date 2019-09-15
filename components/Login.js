import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';

export default class Login extends Component{
    constructor(props){
        super(props)
		this.state={mail:'', password:'', confirm:'', signUpDisabled:true, loginDisabled:true, errors:{mail:'', password:'', confirm:''}};
    }

    render(){
        return(
            <View style={{display:'flex', flexDirection:'row',flexWrap: 'wrap',justifyContent: 'space-evenly',alignItems: 'center',backgroundColor: "white",margin: 22}}>

                <View style={{display:'flex', justifyContent: "flex-start", alignItems: "stretch", minWidth:wp(10)}}>
                    <View style={{display:'flex', flexWrap:'wrap', flexShrink:1}}>
                        <Text style={{textAlign:'center'}}>Create your WaitForMe account.</Text>
                        <Text style={{textAlign:'center'}}>It’s free and only takes a minute.</Text>
                        <Text style={{fontWeight:'bold', margin: 2}}>Email</Text>
                        <TextInput style={{borderWidth: 1, margin: 2}} placeholder="E-mail address" onChangeText={(mail) => this.setState({mail})} onBlur={()=>this.validateSignUpForm()}/>
                        <Text style={{color:'red', margin: 2}}>{this.state.errors.mail}</Text>
                        <Text style={{fontWeight:'bold', margin: 2}}>Password</Text>
                        <TextInput style={{borderWidth: 1, margin: 2}} placeholder="Password" onChangeText={(password) => this.setState({password})} onBlur={()=>this.validateSignUpForm()}/>
                        <Text style={{color:'red', margin: 2}}>{this.state.errors.password}</Text>
                        <Text style={{margin:2, flexShrink:1, textAlign:'left'}}>Passwords must be at least 8 characters long and contain at least 1 letter, 1 number and a special character</Text>
                        <Text style={{fontWeight:'bold', margin: 2}}>Confirm password</Text>
                        <TextInput style={{borderWidth: 1, margin: 2}} placeholder="Confirm password" onChangeText={(confirm) => this.setState({confirm})} onBlur={()=>this.validateSignUpForm()}/>
                        <Text style={{color:'red', margin: 2}}>{this.state.errors.confirm}</Text>
                    </View>
                    <Button title="Sign up" onPress={()=>this.signUp()} disabled={this.state.signUpDisabled}/>
                </View>
                <View>
                    <Text>AZEAZEAZEAZ</Text>
                </View>
            </View>
        )
    }
}