const getHttpError = error => {
	if (error.response) {
		return error.response.data.detail;
	} else if (error.request) {
		return error.request;
	} else {
		return error.message;
	}
	// return error.config;
};

export default getHttpError;
