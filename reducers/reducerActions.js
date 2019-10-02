//LANGUAGE
export const setLanguage = (payload) => {
	return { 
			type: 'SET_LANGUAGE', 
			payload 
	}
};

//MODAL
export const showAuthModal = () => {
	return {
		type: 'SHOW_AUTH_MODAL'
	}
}

export const showConfirmModal = () => {
	return {
		type: 'SHOW_CONFIRM_MODAL'
	}
}

export const closeModal = () => {
	return {
		type: 'CLOSE_MODAL'
	}
}

//AUTH
export const login = (payload) => {
  return {
    type: 'LOGIN',
    payload
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}
export const loggedIn = (payload) => {
  return {
    type: 'LOGGED_IN',
    payload
  }
}

export const loggedOut = () => {
  return {
    type: 'LOGGED_OUT'
  }
}