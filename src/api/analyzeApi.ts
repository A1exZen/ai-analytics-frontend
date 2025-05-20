import {Analysis, Data, ErrorResponse} from "../types/types";
import {AxiosError} from "axios";
import api from "@/config/axios.ts";

interface SearchResponse {
	id: string;
	data: Data;
}

export const fetchAnalysisHistory = async (): Promise<Analysis[]> => {
	try {
		const response = await api.get<Analysis[]>("/api/analyze");
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Failed to fetch analysis history",
		)
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

export const createAnalysis = async (query: string): Promise<SearchResponse> => {
	try {
		const response = await api.post<SearchResponse>("/api/analyze", {query});
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Failed to create analysis",
		)
	}
};

interface TaskStatus {
	taskId: string;
	status: "pending" | "completed" | "failed";
	result?: AnalysisResponse; // Предполагаемый тип из models/Analysis.js
	error?: string;
}

export const getAnalysisStatusViaSSE = (taskId: string, onUpdate: (status: TaskStatus) => void): EventSource => {
	const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/analyze/stream/${taskId}`);

	eventSource.onmessage = (event: MessageEvent) => {
		const status: TaskStatus = JSON.parse(event.data);
		onUpdate(status);
	};

	eventSource.onerror = () => {
		onUpdate({ taskId, status: "failed", error: "SSE connection error" });
		eventSource.close();
	};

	return eventSource;
};