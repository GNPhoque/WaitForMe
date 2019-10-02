import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from 'react-redux';
import Modal from 'modal-enhanced-react-native-web';

import STYLES from "../../constants/STYLES";
import { closeModal } from "../../reducers/reducerActions";
import { getTranslation, navigate } from '../../constants/HELPER';

class ConfirmModal extends Component{
	constructor(props){
		super(props);
		this.state={ date: this.props.date, address: this.props.address };
		this.getTranslation = getTranslation.bind(this);
		this.navigate = navigate.bind(this);
  }

  calculateEstimation = () => {
    return ((this.state.estimatedTime / 30) + (this.state.estimatedTime % 30 > 0 ? 1 : 0)) * 10;
  }

  render(){
    return(
      <Modal
        isVisible={this.props.modal.show_confirm_modal}
        onBackdropPress={() => this.props.closeModal()}
      >
        <View style={STYLES.authModalContent}>
          <View style={{flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
            <View>
              <Text style={{fontWeight:'bold', margin: 2}}>Date : {this.state.date}</Text>
              <Text style={{fontWeight:'bold', margin: 2}}>Address : {this.state.address}</Text>
              <Text style={{fontWeight:'bold', margin: 2}}>Estimated wait time : {this.state.estimatedTime}</Text>
              <Text style={{fontWeight:'bold', margin: 2}}>Estimation : {this.state.estimation}</Text>
            </View>
            <Button title="Confirm" onPress={()=>this.confirm()}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);