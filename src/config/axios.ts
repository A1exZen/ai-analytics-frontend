import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 120000,
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