import {
	Analysis,
	AnalysisHistoryItem,
	Data,
	ErrorResponse
} from "../types/types";
import {AxiosError} from "axios";
import api from "@/config/axios.ts";

// interface SearchResponse {
// 	id: string;
// 	data: Data;
// }

interface StartAnalysisResponse {
	taskId: string;
}

interface TaskStatusResponse {
	id: string;
	status: "pending" | "completed" | "failed";
	result?: Data;
	error?: string;
}

export const fetchAnalysisHistory = async (): Promise<AnalysisHistoryItem[]> => {
	try {
		const response = await api.get<AnalysisHistoryItem[]>("/api/analyze");
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Failed to fetch analysis history",
		)
	}
};
export const fetchAllAnalyses = async (): Promise<Analysis[]> => {
	try {
		const response = await api.get<Analysis[]>("/api/analyze/all");
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data.message || "Failed to fetch all analyses");
	}
};

export const fetchAnalysisById = async (id: string): Promise<Analysis> => {
	try {
		const response = await api.get(`/api/analyze/${id}`);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Failed to load analysis",
		)
	}
};

// export const createAnalysis = async (query: string): Promise<SearchResponse> => {
// 	try {
// 		const response = await api.post<SearchResponse>("/api/analyze", {query});
// 		return response.data;
// 	} catch (error) {
// 		const axiosError = error as AxiosError<ErrorResponse>;
// 		throw new Error(
// 			axiosError.response?.data.message || "Failed to create analysis",
// 		)
// 	}
// };

export const startAnalysis = async (query: string): Promise<StartAnalysisResponse> => {
	try {
		const response = await api.post<StartAnalysisResponse>("/api/analyze/start", { query });
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data.message || "Failed to start analysis");
	}
};

export const checkTaskStatus = async (taskId: string): Promise<TaskStatusResponse> => {
	try {
		const response = await api.get<TaskStatusResponse>(`/api/analyze/status/${taskId}`);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data.message || "Failed to check task status");
	}
};