import { create } from "zustand";

type TTheme = "light" | "dark";

interface IThemeStore {
	theme: TTheme;
	toggleTheme: () => void;
}

const useThemeStore = create<IThemeStore>(set => ({
	theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
	toggleTheme: () =>
		set(state => {
			const newTheme = state.theme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return { theme: newTheme };
		}),
}));

export default useThemeStore;
