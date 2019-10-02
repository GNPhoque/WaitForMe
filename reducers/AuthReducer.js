import firebase from '../firebase';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
  privileges: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  console.log('AuthReducer', action.type)
  switch (action.type) {
    case 'LOGGED_IN':{
      console.log(action.payload);
      return { ...state, isLoggedIn: true, user: action.payload };
    }

    case 'LOGGED_OUT':{
      console.log(action.payload);
      return { ...INITIAL_STATE }
    }

    default:
      return { ...state }
  }
};

export default authReducer;