import { create } from "zustand";

interface ILoadingStore {
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
	startLoading: () => void;
	stopLoading: () => void;
}

const useLoadingStore = create<ILoadingStore>(set => ({
	isLoading: false,
	setIsLoading: state => set({ isLoading: state }),
	startLoading: () => set({ isLoading: true }),
	stopLoading: () => set({ isLoading: false }),
}));

export default useLoadingStore;
