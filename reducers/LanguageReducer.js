import { combineReducers } from 'redux';

import modalReducer from './ModalReducer';
import authReducer from './AuthReducer';
import STRINGS_en from '../constants/STRINGS.en';
import STRINGS_fr from '../constants/STRINGS.fr';
import IMAGES from '../constants/IMAGES';

const INITIAL_STATE = {
  current: 'Français',
  possible: [
		{lang: 'English', img: IMAGES.en},
		{lang: 'Français', img: IMAGES.fr},
	],
	languageFile: STRINGS_fr,
};

const languageReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		
		case 'SET_LANGUAGE':{
			const languageFile = INITIAL_STATE.possible.filter(element=> element.lang == action.payload)[0];
			if(languageFile){
				return { ...state, current: action.payload, languageFile: action.payload === 'Français' ? STRINGS_fr : STRINGS_en }
			}
			else return {...state};
		}

    default:
      return state
  }
};

export default combineReducers({
	language: languageReducer,
  modal: modalReducer,
  auth: authReducer
});