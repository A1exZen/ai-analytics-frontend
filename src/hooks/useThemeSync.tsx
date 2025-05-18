import { useEffect } from "react";
import useThemeStore from "../zustand/useThemeStore.ts";

const useThemeSync = () => {
	const { theme } = useThemeStore();

	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [theme]);
};

export default useThemeSync;
