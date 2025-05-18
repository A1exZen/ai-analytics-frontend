import { create } from "zustand";
import {Analysis} from "@/types/types.ts";

interface AnalysisState {
	currentAnalysis: Analysis | null;
	analysisHistory: Analysis[];
	cachedAnalyses: Analysis[];
	setCurrentAnalysis: (analysis: Analysis | null) => void;
	setAnalysisHistory: (history: Analysis[]) => void;
	setCachedAnalyses: (cache: Analysis[]) => void;
	addToCache: (analysis: Analysis) => void;
	clearCache: () => void;
	clearHistory: () => void;
}

const loadFromLocalStorage = (): Partial<AnalysisState> => {
	const cachedAnalyses = localStorage.getItem("cachedAnalyses");
	const analysisHistory = localStorage.getItem("analysisHistory");
	const currentAnalysis = localStorage.getItem("currentAnalysis");

	return {
		cachedAnalyses: cachedAnalyses ? JSON.parse(cachedAnalyses) : [],
		analysisHistory: analysisHistory ? JSON.parse(analysisHistory) : [],
		currentAnalysis: currentAnalysis ? JSON.parse(currentAnalysis) : null,
	};
};

const saveToLocalStorage = (state: AnalysisState) => {
	localStorage.setItem("cachedAnalyses", JSON.stringify(state.cachedAnalyses));
	localStorage.setItem("analysisHistory", JSON.stringify(state.analysisHistory));
	if (state.currentAnalysis) {
		localStorage.setItem("currentAnalysis", JSON.stringify(state.currentAnalysis));
	} else {
		localStorage.removeItem("currentAnalysis");
	}
};


export const useAnalysisStore = create<AnalysisState>((set) => ({
	currentAnalysis: null,
	analysisHistory: [],
	cachedAnalyses: [],
	...loadFromLocalStorage(),
	setCurrentAnalysis: (analysis) =>
		set((state) => {
			const newState = { ...state, currentAnalysis: analysis };
			saveToLocalStorage(newState);
			return newState;
		}),
	setAnalysisHistory: (history) =>
		set((state) => {
			const newState = { ...state, analysisHistory: history };
			saveToLocalStorage(newState);
			return newState;
		}),
	setCachedAnalyses: (cache) =>
		set((state) => {
			const newState = { ...state, cachedAnalyses: cache };
			saveToLocalStorage(newState);
			return newState;
		}),
	addToCache: (analysis) =>
		set((state) => {
			const updatedCache = [analysis, ...state.cachedAnalyses].slice(0, 2);
			const newState = { ...state, cachedAnalyses: updatedCache };
			saveToLocalStorage(newState);
			return newState;
		}),
	clearCache: () =>
		set((state) => {
			const newState = { ...state, cachedAnalyses: [] };
			saveToLocalStorage(newState);
			return newState;
		}),
	clearHistory: () =>
		set((state) => {
			const newState = { ...state, analysisHistory: [] };
			saveToLocalStorage(newState);
			return newState;
		}),
}));