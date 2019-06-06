// Setup config/headers and token
const tokenConfig = token => {
	// Headers
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	// If token, add to headers
	if (token !== null) {
		config.headers["Authorization"] = `JWT ${token}`;
	}
	return config;
};

export default tokenConfig;
