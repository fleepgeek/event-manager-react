import axios from "axios";
// import store from "../store";
// let st = store || {};
// console.log(st);

const getToken = () => {
	const token = localStorage.getItem("token");
	return token || "";
};

const httpClient = axios.create({
	baseURL: "http://localhost:8000/api/",
	headers: {
		"Content-Type": "application/json"
	}
});

httpClient.interceptors.request.use(
	config => {
		if (!config.headers.Authorization) {
			const token = getToken();

			if (token) {
				config.headers.Authorization = `JWT ${token}`;
			}
		}

		return config;
	},
	error => Promise.reject(error)
);

export default httpClient;
