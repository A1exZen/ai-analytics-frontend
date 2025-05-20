import { IoClose, IoSearch } from "react-icons/io5";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { motion } from "framer-motion";
import useLoadingStore from "../../zustand/useLoadingStore";
import toast from "react-hot-toast";
import { getRootUrl } from "@/utils/getRootUrl.ts";
import useUserStore from "@/zustand/useUserStore.ts";
import { useAnalysisStore } from "@/zustand/useAnalysisStore.ts";
import {Analysis} from "@/types/types.ts";
import {createAnalysis} from "@/api/analyzeApi.ts";

const fadeIn = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut"},
	},
};

interface SearchProps {
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}
const Search: React.FC<SearchProps> = ({ setError }) => {
	const { startLoading, stopLoading } = useLoadingStore();
	const [url, setUrl] = useState("");
	const navigate = useNavigate();
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { user, token } = useUserStore();
	const { setCurrentAnalysis, addToCache, setAnalysisHistory, analysisHistory } = useAnalysisStore();

	useEffect(() => {
		const savedHistory = localStorage.getItem("searchHistory");
		if (savedHistory) {
			setSearchHistory(JSON.parse(savedHistory));
		}
	}, []);

	const checkCachedAnalysis = (url: string): Analysis | null => {
		return useAnalysisStore.getState().cachedAnalyses.find((analysis) => analysis.url === url) || null;
	};

	const saveToCache = (analysis: Analysis) => {
		addToCache(analysis);
		localStorage.setItem("cachedAnalyses", JSON.stringify(useAnalysisStore.getState().cachedAnalyses));
	};

	const isValidUrl = (url: string): boolean => {
		const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
		return urlRegex.test(url);
	};

	const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isValidUrl(url)) {
			setError("Введите корректный адрес сайта.");
			stopLoading();
			return;
		}
		if (!user || !token) {
			toast.error("Пожалуйста, авторизуйтесь для выполнения анализа.");
			stopLoading();
			return;
		}

		setError(null);
		startLoading();
		const query = getRootUrl(url);

		const cachedAnalysis = checkCachedAnalysis(query);
		if (cachedAnalysis) {
			stopLoading();
			setCurrentAnalysis(cachedAnalysis);
			navigate(`/analytics/${cachedAnalysis.id}`);
			toast.success("Анализ загружен из кэша!");
			return;
		}

		try {
			const response = await createAnalysis(query);
			console.log("Raw response data:", response);
			const { id, data } = response;
			stopLoading();
			const newAnalysis: Analysis = {
				id,
				url: query,
				data,
				createdAt: new Date().toISOString(),
			};
			setCurrentAnalysis(newAnalysis);
			saveToCache(newAnalysis);

			const updatedAnalysisHistory = [newAnalysis, ...analysisHistory].slice(0, 5);
			setAnalysisHistory(updatedAnalysisHistory);

			const updatedSearchHistory = [url, ...searchHistory.filter((item) => item !== url)].slice(0, 5);
			setSearchHistory(updatedSearchHistory);
			localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
			navigate(`/analytics/${id}`);
		} catch (error: unknown) {
			console.error("Error while searching:", error);
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Произошла неизвестная ошибка.");
			}
			stopLoading();
		}
	};

	const handleSelectHistory = (selectedQuery: string) => {
		setUrl(selectedQuery);
		setIsDropdownOpen(false);
	};

	const clearSearchHistory = () => {
		setSearchHistory([]);
		localStorage.removeItem("searchHistory");
		setIsDropdownOpen(false);
	};

	return (
		<motion.section
			className="px-4 sm:px-6 lg:px-8 max-w-5xl md:w-3xl mx-auto relative"
			initial="hidden"
			whileInView="visible"
			viewport={{ amount: 0.5, once:true }}
		>
			<motion.form className="relative" onSubmit={handleSearch} variants={fadeIn}>
				<div className="relative flex items-center">
					<IoSearch size={20} className="absolute left-4 text-gray-500 dark:text-gray-400" />
					<input
						className="w-full pl-12 pr-24 py-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 focus:outline-none focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-md"
						placeholder="Введите URL для анализа..."
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						onFocus={() => setIsDropdownOpen(true)}
						onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
					/>
					{url && (
						<button
							onClick={() => setUrl("")}
							type="reset"
							className="absolute right-12 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-300"
						>
							<IoClose size={20} className="hover:rotate-90 transition duration-300" />
						</button>
					)}
					<button
						type="submit"
						className="absolute right-3 p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
					>
						<IoSearch size={20} />
					</button>
				</div>

				{isDropdownOpen && searchHistory.length > 0 && (
					<motion.ul
						className="absolute w-full mt-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 rounded-lg shadow-lg max-h-60 overflow-y-auto"
						initial={{ opacity: 0, y: -15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<li className="flex justify-between items-center px-4 py-2 border-b border-gray-200/30 dark:border-gray-700/30">
							<span className="text-gray-700 dark:text-gray-300 font-semibold">История поиска</span>
							<button
								onClick={clearSearchHistory}
								className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition duration-300"
							>
								<RiDeleteBinLine size={20} className="hover:rotate-45 transition duration-300" />
							</button>
						</li>
						{searchHistory
							.filter((item) => item.includes(url))
							.map((item, index) => (
								<li
									key={index}
									className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 cursor-pointer rounded-lg transition duration-200"
									onMouseDown={() => handleSelectHistory(item)}
								>
									{item}
								</li>
							))}
					</motion.ul>
				)}
			</motion.form>
		</motion.section>
	);
};

export default Search;