import React, { Component } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { connect } from 'react-redux';
import Modal from 'modal-enhanced-react-native-web';

import STYLES from "../../constants/STYLES";
import { closeModal } from "../../reducers/reducerActions";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

class AuthModal extends Component{
	constructor(props){
		super(props);
  }

  render(){
    return(
      <Modal
        isVisible={this.props.modal.show_auth_modal}
        onBackdropPress={() => this.props.closeModal()}
        >
        <View style={STYLES.authModalContent}>
          <Signup/>
          <Login/>
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