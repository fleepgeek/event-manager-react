import globalTypes from "./actionTypes";

export const showMessage = message => ({
	type: globalTypes.SHOW_MESSAGE,
	payload: { message }
});

export const hideMessage = () => ({
	type: globalTypes.HIDE_MESSAGE
});

export const showLoading = () => ({
	type: globalTypes.SHOW_LOADING
});

export const hideLoading = () => ({
	type: globalTypes.HIDE_LOADING
});

export const showModal = () => ({
	type: globalTypes.SHOW_MODAL
});

export const hideModal = () => ({
	type: globalTypes.HIDE_MODAL
});
