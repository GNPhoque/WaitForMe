import React, { Component } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import Modal from 'modal-enhanced-react-native-web';

export default class ModalComponent extends Component{

    constructor(props){
        super(props);
        this.state = { visibleModal: 0};
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View >
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    
      _renderModalContent = () => (
        <View>
          <Text>Hello!</Text>
          {this._renderButton("Close", () => this.setState({ visibleModal: null }))}
        </View>
      );

      render() {
        return (
          <View>
            {this._renderButton("Default modal", () =>
              this.setState({ visibleModal: 1 })
            )}
            {this._renderButton("Sliding from the sides", () =>
              this.setState({ visibleModal: 2 })
            )}
            {this._renderButton("A slower modal", () =>
              this.setState({ visibleModal: 3 })
            )}
            {this._renderButton("Fancy modal!", () =>
              this.setState({ visibleModal: 4 })
            )}
            {this._renderButton("Bottom half modal", () =>
              this.setState({ visibleModal: 5 })
            )}
            {this._renderButton("Modal that can be closed on backdrop press", () =>
              this.setState({ visibleModal: 6 })
            )}
            {this._renderButton("Swipeable modal", () =>
              this.setState({ visibleModal: 7 })
            )}
            {this._renderButton("Scrollable modal", () =>
              this.setState({ visibleModal: 8 })
            )}
            <Modal isVisible={this.state.visibleModal === 1}>
              {this._renderModalContent()}
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 2}
              animationIn="slideInLeft"
              animationOut="slideOutRight"
            >
              {this._renderModalContent()}
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 3}
              animationInTiming={2000}
              animationOutTiming={2000}
              backdropTransitionInTiming={2000}
              backdropTransitionOutTiming={2000}
            >
              {this._renderModalContent()}
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 4}
              backdropColor="red"
              backdropOpacity={1}
              animationIn="slideInDown"
              animationOut="zoomOutUp"
              animationInTiming={1000}
              animationOutTiming={1000}
              backdropTransitionInTiming={1000}
              backdropTransitionOutTiming={1000}
            >
              {this._renderModalContent()}
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 5}
            >
              {this._renderModalContent()}
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 6}
              onBackdropPress={() => this.setState({ visibleModal: null })}
            >
              {this._renderModalContent()}
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 7}
              onSwipe={() => this.setState({ visibleModal: null })}
              swipeDirection="left"
            >
              {this._renderModalContent()}
            </Modal>
          </View>
        );
    }
}
