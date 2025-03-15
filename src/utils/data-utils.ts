import axios from "axios";

export const getData = async <T>(url: string, query: string): Promise<T> => {
	try {
		const response = await axios.post<T>(url, { query });
		return response.data;
	} catch (error) {
		console.error("Error in getData:", error);
		throw error;
	}
};
