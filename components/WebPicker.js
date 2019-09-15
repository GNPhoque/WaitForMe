import React, { Component } from 'react';
import { createElement } from 'react-native-web';

export default class WebPicker extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return createElement('input', this.props);
    }
}