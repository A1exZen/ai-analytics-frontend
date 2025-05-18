import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: "http://localhost:5001",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = Cookies.get("jwt");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			Cookies.remove("jwt");
			window.location.href = "/sign-up/login";
		}
		return Promise.reject(error);
	}
);

export default api;