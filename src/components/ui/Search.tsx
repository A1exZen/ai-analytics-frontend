import { IoClose, IoSearch } from "react-icons/io5";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { motion } from "framer-motion";
import useLoadingStore from "../../zustand/useLoadingStore";
import toast from "react-hot-toast";
import { getRootUrl } from "@/utils/getRootUrl.ts";
import { auth, fireDB } from "@/config/firebase.ts"; // Импортируем Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface SearchProps {
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface SearchResponse {
	message: string;
	data: any;
}

interface Analysis {
	id: string;
	type: string;
	identifier: string;
	result: any;
	timestamp: string;
}

export const Search: React.FC<SearchProps> = ({ setError }) => {
	const { startLoading, stopLoading } = useLoadingStore();
	const [url, setUrl] = useState("");
	const navigate = useNavigate();
	const [searchHistory, setSearchHistory] = useState<string[]>([]); // История поиска (для всех)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [user] = useAuthState(auth); // Получаем текущего пользователя
	const [showAnalysisHistory, setShowAnalysisHistory] = useState(false); // Состояние для отображения истории анализа

	// Проверка, существует ли анализ в Firestore
	const checkExistingAnalysis = async (url: string) => {
		if (!user) return null;

		const userAnalysesRef = collection(fireDB, `analyses/${user.uid}/userAnalyses`);
		const q = query(userAnalysesRef, where("type", "==", "url"), where("identifier", "==", url));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			return doc.data().result as any;
		}
		return null;
	};

	// Сохранение анализа в Firestore
	const saveAnalysisToFirestore = async (url: string, analysisResult: any) => {
		if (!user) {
			toast.error("Пожалуйста, авторизуйтесь, чтобы сохранить анализ.");
			return;
		}

		const analysisRef = doc(collection(fireDB, `analyses/${user.uid}/userAnalyses`));
		await setDoc(analysisRef, {
			type: "url",
			identifier: url,
			result: analysisResult,
			timestamp: new Date().toISOString(),
		});
	};

	// Загрузка истории поиска из localStorage (для всех пользователей)
	useEffect(() => {
		const savedHistory = localStorage.getItem("searchHistory");
		if (savedHistory) {
			setSearchHistory(JSON.parse(savedHistory));
		}
	}, []);

	// Загрузка истории анализа из Firestore (только для авторизованных)
	const fetchAnalysisHistory = async () => {
		if (!user) return [];

		const userAnalysesRef = collection(fireDB, `analyses/${user.uid}/userAnalyses`);
		const q = query(userAnalysesRef, where("type", "==", "url"), orderBy("timestamp", "desc"));
		const querySnapshot = await getDocs(q);

		const analyses: Analysis[] = [];
		querySnapshot.forEach((doc) => {
			analyses.push({ id: doc.id, ...doc.data() } as Analysis);
		});
		return analyses;
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
		setError(null);
		startLoading();
		const query = getRootUrl(url);
		console.log("Searching for query:", query);

		// Проверяем, есть ли уже анализ для этого URL
		const existingAnalysis = await checkExistingAnalysis(query);
		if (existingAnalysis) {
			stopLoading();
			navigate("/analytics", {
				state: {
					query,
					data: existingAnalysis,
				},
			});
			toast.success("Анализ загружен из истории!");
			return;
		}

		try {
			const response = await axios.post<SearchResponse>(
				"http://localhost:5001/api/analyze",
				{
					query,
				}
			);

			const data = response.data.data;
			stopLoading();
			navigate("/analytics", {
				state: {
					query,
					data,
				},
			});
			console.log("DATA:", data);

			// Сохраняем анализ в Firestore для авторизованных пользователей
			if (user) {
				await saveAnalysisToFirestore(query, data);
			}

			// Обновляем историю поиска в localStorage для всех пользователей
			const updatedHistory = [url, ...searchHistory.filter((item) => item !== url)].slice(0, 5);
			setSearchHistory(updatedHistory);
			localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
			setIsDropdownOpen(false);
		} catch (error: any) {
			console.error("Error while searching:", error);
			if (error.response) {
				toast.error(`Ошибка: ${error.response.data.message}`);
			} else if (error.request) {
				toast.error("Ошибка при подключении к серверу. Попробуйте позже.");
			} else {
				toast.error("Ошибка при поиске. Попробуйте позже.");
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

	// Переключение отображения истории анализа
	const toggleAnalysisHistory = async () => {
		if (!user) {
			toast.error("Пожалуйста, авторизуйтесь, чтобы просмотреть историю анализа.");
			return;
		}
		setShowAnalysisHistory(!showAnalysisHistory);
		if (!showAnalysisHistory) {
			const analyses = await fetchAnalysisHistory();
			// Здесь можно добавить отображение анализа (например, в модальном окне или новом компоненте)
			console.log("Analysis History:", analyses);
			toast.success("История анализа загружена!");
		}
	};

	return (
		<div className="flex flex-col max-w-3xl w-full gap-2">
			<form className="form relative" onSubmit={handleSearch}>
				<button
					type="submit"
					className="absolute left-3 -translate-y-1/2 top-1/2 p-1"
				>
					<IoSearch size={20} className="dark:fill-white cursor-pointer" />
				</button>
				<input
					className="w-full input rounded-xl px-10 py-3 border-2 border-gray-200 dark:border-gray-800 focus:outline-hidden focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md bg-gray-50 dark:bg-gray-700 dark:text-white"
					placeholder="Поиск..."
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					onFocus={() => setIsDropdownOpen(true)}
					onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
				/>
				<button
					onClick={() => setUrl("")}
					type="reset"
					className={`absolute transition duration-500 -translate-y-1/2 top-1/2 p-1 ${
						isDropdownOpen ? "-translate-x-[70px]" : "-translate-x-10"
					}`}
				>
					<IoClose
						size={20}
						className="hover:rotate-90 transition duration-500 dark:fill-white"
					/>
				</button>
				<button
					type="button"
					className={`absolute transition duration-500 right-3 -translate-y-1/2 top-1/2 p-1 ${
						isDropdownOpen ? "" : "hidden"
					}`}
				>
					<RiDeleteBinLine
						size={20}
						className="transition hover:rotate-45 duration-300 dark:fill-white"
						onClick={clearSearchHistory}
					/>
				</button>
			</form>
			{isDropdownOpen && searchHistory.length > 0 && (
				<motion.ul
					className="mt-2 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-md"
					initial={{ opacity: 0, y: -15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
					}}
				>
					{searchHistory
						.filter((item) => item.includes(url))
						.map((item, index) => (
							<li
								key={index}
								className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg"
								onMouseDown={() => handleSelectHistory(item)}
							>
								{item}
							</li>
						))}
				</motion.ul>
			)}
			{/* Кнопка для отображения истории анализа */}
			{user && (
				<button
					onClick={toggleAnalysisHistory}
					className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
				>
					{showAnalysisHistory ? "Скрыть историю анализа" : "Показать историю анализа"}
				</button>
			)}
			{/* Место для отображения истории анализа (можно улучшить с модальным окном) */}
			{showAnalysisHistory && user && (
				<div className="mt-2 p-4 border border-gray-300 bg-gray-50 dark:bg-gray-800 rounded max-w-xl">
					<h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
						История анализа
					</h3>
					{/* Здесь можно отобразить анализы */}
					{/* Пока только лог для демонстрации */}
					<p className="text-gray-700 dark:text-gray-200">
						Загрузите историю анализа в модальное окно или компонент для отображения.
					</p>
				</div>
			)}
		</div>
	);
};

export default Search;