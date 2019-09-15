import React from 'react';
import { Modal, View, Text, Button } from "react-native";
import STYLES from "./STYLES";
import { useMediaQuery } from 'react-responsive';

export function navigate(screen){
    this.props.navigation.navigate(screen);
}

export function getTranslation(field){
    return this.props.language.languageFile[field];
}

export function isWider(width){
    const isDesktop = useMediaQuery({ minWidth: width });
    return isDesktop;
}