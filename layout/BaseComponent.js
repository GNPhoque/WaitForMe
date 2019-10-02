import React, { Component } from "react";
import STYLES from "../constants/STYLES";
import Header from "./Header";
import { View } from "react-native";
import Footer from "./Footer";

export default class BaseScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        // console.log(this.props.content);
        const Content = <View>{this.props.content}</View>;
        return (
			<View style={STYLES.screenContainer}>
				<View>
					<Header navigation={this.props.navigation}/>
        <View>
        {Content}
      </View>
      </View>
        <View>
          <Footer/>
        </View>
      </View>
    );
  }
}