import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Button, Picker } from 'react-native';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import AuthModal from '../components/modal/AuthModal';
import STYLES from '../constants/STYLES';
import IMAGES from '../constants/IMAGES';
import { navigate, getTranslation, isLoggedIn } from '../constants/HELPER';
import { setLanguage, showAuthModal } from '../reducers/reducerActions';

class Header extends Component{
	constructor(props){
		super(props);
		this.state = { menuOpen: false };
		this.getTranslation = getTranslation.bind(this);
		this.navigate = navigate.bind(this);
		this.isWider = isWider.bind(this);
		this.isLoggedIn = isLoggedIn.bind(this);
	}

	changeLanguage = (language) => {
		this.props.setLanguage(language);
	}

	getCurrentLanguageImage = () => {
		return this.props.language.possible.find(element => {
			return element.lang == this.props.language.current;
		}).img;
	}

	setPickerItems = () => {
		return this.props.language.possible.map((element, index) =>{
			return <Picker.Item label={element.lang} value={element.lang} key={index}/>
		});
	}

	getMenuItems = (style) => {
    const isLarge = this.isWider(750);
    let viewStyle = isLarge ? {
      
    } : {

    }
		return(
			<View style={style}>
				<TouchableOpacity style={STYLES.links} onPress={()=>this.navigate('HomeScreen')}>
					<Text style={STYLES.text16}>{this.getTranslation('home')}</Text>
				</TouchableOpacity>
				<View style={{margin:8, flexDirection: 'row'}}>
					<Image style={STYLES.headerFlag} source={this.getCurrentLanguageImage()}></Image>
					<Picker
						selectedValue={this.props.language.current}
						style={{height: 50, width: 80, color : 'white', borderColor:'black', backgroundColor: 'black'}}
						onValueChange={(itemValue) => this.changeLanguage(itemValue)}>
							{this.setPickerItems()}
					</Picker>
				</View>
				<TouchableOpacity style={STYLES.links} onPress={()=>this.navigate('Contact')}>
					<Text style={STYLES.text16}>{this.getTranslation('contact')}</Text>
				</TouchableOpacity>
				{this.getAuthItems()}
			</View> 
		)
  }
  
  getAuthItems = () => {
    if (this.isLoggedIn()){
      return (
        <View>
          <Text style={{color:'white'}}>{this.props.auth.user.email || 'email'}</Text>
        </View>
      );
    }
    else {
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={STYLES.links} onPress={()=>this.props.showAuthModal()}>
					<Text style={STYLES.text16}>{this.getTranslation('login')}</Text>
          </TouchableOpacity>
          <View style={{margin:8}}>
            <Button onPress={()=>this.props.showAuthModal()} title={this.getTranslation('signup')}/>
          </View>
        </View>
      );
    }
  }

	getLargeScreenMenuItems = () => {
		return this.getMenuItems(STYLES.headerRightPart)
	}

	getSmallScreenMenuItems = () => {
		if(this.state.menuOpen){
			return (				
				<View style={{
					backgroundColor:'black',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'}}>
				
					<TouchableOpacity style={STYLES.links} >
            <Text style={{color:'white', textAlign:'right'}} onPress={()=>this.setState({menuOpen:false})}>▶</Text>
          </TouchableOpacity>
					<TouchableOpacity style={STYLES.links} onPress={()=>this.navigate('HomeScreen')}>
						<Text style={STYLES.text16}>{this.getTranslation('home')}</Text>
					</TouchableOpacity>
					<View style={{margin:8, flexDirection: 'row'}}>
						<Image style={STYLES.headerFlag} source={this.getCurrentLanguageImage()}></Image>
						<Picker
							selectedValue={this.props.language.current}
							style={{height: 50, width: 80, alignItems:'center', color : 'white', borderColor:'black', backgroundColor: 'black'}}
							onValueChange={(itemValue) => this.changeLanguage(itemValue)}>
								{this.setPickerItems()}
						</Picker>
					</View>
					<TouchableOpacity style={STYLES.links} onPress={()=>this.navigate('Contact')}>
						<Text style={STYLES.text16}>{this.getTranslation('contact')}</Text>
					</TouchableOpacity>
					{this.getAuthItems()}
				</View> 
			)
		}
		else{
			return (
				<Text style={{color:'white', fontSize:48}} onPress={()=>this.setState({menuOpen:true})}>≡</Text>
			)
		}		
	}

	render(){
		return(
			<View style={STYLES.headerBar}>

				<View style={STYLES.headerLeftPart}>
					<TouchableOpacity style={STYLES.links}  onPress={()=>this.navigate('HomeScreen')}>
						<Image style={STYLES.logo} source={IMAGES.clock}></Image>
						<Text style={STYLES.text16}>{this.getTranslation('companyName')}</Text>
					</TouchableOpacity>
				</View>

				<MediaQuery minWidth={750}>
					{(matches)=> matches ? this.getLargeScreenMenuItems() : this.getSmallScreenMenuItems()}
				</MediaQuery>		

				<AuthModal/>

			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		setLanguage: (language) => dispatch(setLanguage(language)),
		showAuthModal: () => dispatch(showAuthModal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);