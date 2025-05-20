import { create } from "zustand";

interface ILoadingStore {
	isLoading: boolean;
	startLoading: () => void;
	stopLoading: () => void;
}

const useLoadingStore = create<ILoadingStore>(set => ({
	isLoading: false,
	startLoading: () => set({ isLoading: true }),
	stopLoading: () => set({ isLoading: false }),
}));

export default useLoadingStore;
