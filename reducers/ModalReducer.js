const INITIAL_STATE = {
  show_confirm_modal:false,
  show_auth_modal:false
}

const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SHOW_AUTH_MODAL':{
      return {
        show_confirm_modal:false,
        show_auth_modal:true
      };
    }
		case 'SHOW_CONFIRM_MODAL':{
      return {
        show_confirm_modal:true,
        show_auth_modal:false
      };
    }
		case 'CLOSE_MODAL':{
      return {
          show_confirm_modal:false,
          show_auth_modal:false
      };
    }
    default:
      return state
  }
};

export default modalReducer;