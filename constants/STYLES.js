import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const STYLES = StyleSheet.create({
	//GLOBAL
	screenContainer: {		
		flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
	},
	text24: {
		color:'white',
		margin:8,
		fontSize: 24
	},
	text16: {
		color:'white',
		margin:8,
		fontSize: 16
	},
	textHeader: {
		color:'white',
		margin: 8,
		fontSize: 24,
		fontWeight: 'bold'
	},
	links: {
		margin:8,
		flexDirection: 'row',
		backgroundColor: 'black',
		alignItems: 'center'
	},
	//MODAL
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
		borderColor: "rgba(0, 0, 0, 0.1)",
		flexDirection:'row'		
	},
	authModalContent: {		
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		alignItems: 'stretch',
    backgroundColor: "white",
    padding: 22,
    borderRadius: 4,
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
	//APP.TSX
  pageContainer: {
		display:'flex',
    flex: 1,
    backgroundColor: '#fff',
	},
	//HEADER.TSX
	headerBar: {
		minHeight: 70,
		backgroundColor:'black',
		justifyContent: 'space-between',
		alignItems:'flex-start',
		flexDirection: 'row'
	},
	headerLeftPart: {
		backgroundColor:'black',
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerRightPart: {
		backgroundColor:'black',
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerLanguageSelector: {
		backgroundColor: 'black',
		flexDirection: 'row',
		alignItems : 'center',
	},
  logo: {
    width: 64,
    height: 64,
		resizeMode: 'contain',
		backgroundColor: 'white'
	},
	headerFlag: {
		height: 32,
		width: 32,
		resizeMode: 'contain',
		backgroundColor: 'black',
		margin: 8
	},
	//FOOTER.TSX
	footer: {
		backgroundColor:'black',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	footerTopPart: {
		backgroundColor: 'black',
		flexDirection: 'row',
		alignItems: 'center'
	},
	footerMainPart: {		
		flexWrap: 'wrap',
		backgroundColor:'black',
		justifyContent: 'flex-start',
		flexDirection: 'row'
	},
	footerMenu: {
		backgroundColor:'black',
		flexDirection: 'column',
		alignItems: 'center',
	},
	footerRightPart: {
		backgroundColor:'black',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	//MAPS
	maps: {
		height: hp(50),
		margin: 8
	},
	//HOMESCREEN.TSX
  homeContent: {
    backgroundColor: '#fff',
		justifyContent: 'flex-start',
	},
	homeText: {		
		margin: 8,
		fontSize: 24,
		textAlign: 'center'
	},
	homeMain: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		alignItems: 'stretch'
	},
	homeFrame: {
		flex: 1,
		borderWidth: 1,
		margin: 32,
		minWidth: 300,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	homeFramedTextHeader: {
		margin: 8,
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	homeFramedText: {
		margin: 8,
		fontSize: 24,
	},

	//CONTACTSCREEN.TSX

	//FORMS
	validationError: {
		color:'red'
	}
});

export default STYLES;
