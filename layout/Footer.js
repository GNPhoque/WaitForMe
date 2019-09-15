import React, {Component} from 'react';
import { View, Text } from 'react-native';
import STYLES from '../constants/STYLES';

class Footer extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View style={STYLES.footer}>
				<View style={STYLES.footerTopPart}>
				<Text style={STYLES.textHeader}>WaitForMe</Text>
				</View>
				<View style={STYLES.footerMainPart}>
					<View style={STYLES.footerMenu}>
						<Text style={STYLES.textHeader}>Language</Text>
						<Text style={STYLES.text16}>En</Text>
						<Text style={STYLES.text16}>Fr</Text>
					</View>
					<View style={STYLES.footerMenu}>
						<Text style={STYLES.textHeader}>Contact us</Text>
					</View>
					<View style={STYLES.footerMenu}>
						<Text style={STYLES.textHeader}>Social media</Text>
						<Text style={STYLES.text16}>Facebook</Text>
						<Text style={STYLES.text16}>Youtube</Text>
					</View>
				</View>
			</View>
		)
	}
}

export default Footer;