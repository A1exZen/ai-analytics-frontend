import api from "@/config/axios.ts";
import {AxiosError} from "axios";
import {ErrorResponse} from "@/types/types.ts";

interface LoginResponse {
	user: { id: string; email: string };
	token: string;
}

interface RegisterResponse {
	user: { id: string; email: string };
	token: string;
}


export const login = async (email: string, password: string): Promise<LoginResponse> => {
	try {
		const response = await api.post("/auth/login", { email, password });
		return response.data;
	}catch(error){
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Ошибка авторизации",
		)
	}
};

export const register = async (email: string, password: string): Promise<RegisterResponse> => {
	try {
		const response = await api.post("/auth/register", { email, password });
		return response.data;
	} catch(error){
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Ошибка регистрации",
		)
	}
};

export const googleLogin = async (idToken: string): Promise<LoginResponse> => {
	try {
		const response = await api.post("/auth/google", { idToken });
		return response.data;
	}catch(error){
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Ошибка авторизации Google",
		)
	}
};