import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebase';

class EmailVerification extends Component{
    constructor(props){
        super(props);
        this.state = { isProcessDone : false, uid : this.props.navigation.getParam('uid') };
        //appeler la fonction de verif mail en back
        //async, quans la réponse arrive, rediriger vers la homepage
        // this.verifMail(this.props.navigation.getParam('uid'));
    }

    verifMail(uid){
        console.log('fetching on uid : ' + uid);
		var func = firebase.functions().httpsCallable('confirmMail');
            // console.log(func);
            func({ uid : uid })
        .then((responseValue)=> {
            console.log(responseValue);
            this.setState({ isProcessDone : true});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        const display = this.state.isProcessDone ? 'Ready' : 'Processing...';
        return(
            <View>
                {/* <Button title='Validate' onPress={()=>this.verifMail(this.props.navigation.getParam('uid'))}/> */}
                <Button title='Validate' onPress={()=>this.verifMail(this.state.uid)}/>
                <Text>{display}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { language } = state;
    return { language };
  };
  
  export default connect(mapStateToProps)(EmailVerification);