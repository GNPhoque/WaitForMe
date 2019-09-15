import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import Login from './Login';

export default class Responsive extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
        backgroundColor: "white",
        padding: 22,
        borderRadius: 4,
            borderColor: "rgba(0, 0, 0, 0.1)",}}>

                    <Login/>

                    {/* <View style={{borderLeftWidth: 1}}/> */}

                    <View style={{flexDirection: "column", justifyContent: "flex-start", margin: 32, alignItems: "center", width:wp(100)}}>
                        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{margin: 8,fontSize: 28,fontWeight: 'bold'}}>{}</Text>
                            <Text style={{margin: 8,fontSize: 24}}>{'engage1'}</Text>
                        </View>
                        <View style={{alignContent: 'flex-end'}}>
                            <TouchableOpacity style={{margin:8}}>
                                <Button onPress={()=>console.log('click')} title={'becomeWaiter'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        )
    }
}