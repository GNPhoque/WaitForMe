export const setLanguage = (payload) => {
	return { 
			type: 'SET_LANGUAGE', 
			payload 
	}
};

export const showAuthModal = () => {
	return {
		type: 'SHOW_AUTH_MODAL'
	}
}

export const showBaseModal = () => {
	return {
		type: 'SHOW_BASIC_MODAL'
	}
}

export const closeModal = () => {
	return {
		type: 'CLOSE_MODAL'
	}
}