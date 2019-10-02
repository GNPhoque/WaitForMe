import { useMediaQuery } from 'react-responsive';

export function navigate(screen){
    this.props.navigation.navigate(screen);
}

export function getTranslation(field){
    return this.props.language.languageFile[field];
}

export function isWider(width){
    return useMediaQuery({ minWidth: width });
}

export function isLoggedIn(){
  return this.props.auth.isLoggedIn;
}