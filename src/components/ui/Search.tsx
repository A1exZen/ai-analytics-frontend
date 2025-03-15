import { IoClose, IoSearch } from "react-icons/io5";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { motion } from "framer-motion";
import useLoadingStore from "../../zustand/useLoadingStore";
import toast from "react-hot-toast";
import { getRootUrl } from "../../utils/getRootUrl";

interface SearchProps {
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface SearchResponse {
	message: string;
	data: any;
}

export const Search: React.FC<SearchProps> = ({ setError }) => {
	const { startLoading, stopLoading } = useLoadingStore();
	const [url, setUrl] = useState("");
	const navigate = useNavigate();
	// const setAnalytics = useAnalyticsStore(state => state.setAnalytics);
	const [history, setHistory] = useState<string[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		const savedHistory = localStorage.getItem("searchHistory");
		if (savedHistory) {
			setHistory(JSON.parse(savedHistory));
		}
	}, []);

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
		try {
			// Используем axios для отправки запроса
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
			const updatedHistory = [
				url,
				...history.filter(item => item !== url),
			].slice(0, 5);
			setHistory(updatedHistory);
			localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
			setIsDropdownOpen(false);
		} catch (error: any) {
			console.error("Error while searching:", error);
			// Обработка ошибок от axios
			if (error.response) {
				// Ошибка от сервера
				toast.error(`Ошибка: ${error.response.data.message}`);
			} else if (error.request) {
				// Ошибка с запросом
				toast.error("Ошибка при подключении к серверу. Попробуйте позже.");
			} else {
				// Ошибка в настройке запроса
				toast.error("Ошибка при поиске. Попробуйте позже.");
			}
			stopLoading();
		}
	};

	const handleSelectHistory = (selectedQuery: string) => {
		setUrl(selectedQuery);
		setIsDropdownOpen(false);
	};
	const clearHistory = () => {
		setHistory([]);
		localStorage.removeItem("searchHistory");
		setIsDropdownOpen(false);
	};

	return (
		<div className='flex flex-col max-w-3xl w-full gap-2'>
			<form className='form relative' onSubmit={handleSearch}>
				<button
					type='submit'
					className='absolute left-3 -translate-y-1/2 top-1/2 p-1'
				>
					<IoSearch size={20} className='dark:fill-white' />
				</button>
				<input
					className='w-full input rounded-xl px-10 py-3 border-2 border-gray-200 dark:border-gray-800 focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md dark:bg-mainGray dark:text-white'
					placeholder='Поиск...'
					type='text'
					value={url}
					onChange={e => setUrl(e.target.value)}
					onFocus={() => setIsDropdownOpen(true)}
					onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
				/>
				<button
					onClick={() => setUrl("")}
					type='reset'
					className={`absolute transition duration-500 -translate-y-1/2 top-1/2 p-1 ${
						isDropdownOpen ? "-translate-x-[70px]" : "-translate-x-10"
					}`}
				>
					<IoClose
						size={20}
						className='hover:rotate-90 transition duration-500 dark:fill-white '
					/>
				</button>
				<button
					type='button'
					className={`absolute transition duration-500 right-3 -translate-y-1/2 top-1/2 p-1 ${
						isDropdownOpen ? "" : "hidden"
					}`}
				>
					<RiDeleteBinLine
						size={20}
						className='transition hover:rotate-45 duration-300 dark:fill-white '
						onClick={clearHistory}
					/>
				</button>
			</form>
			{isDropdownOpen && history.length > 0 && (
				<motion.ul
					className='mt-2 bg-white border rounded-lg shadow-md'
					initial={{ opacity: 0, y: -15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
					}}
				>
					{history
						.filter(item => item.includes(url))
						.map((item, index) => (
							<li
								key={index}
								className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
								onMouseDown={() => handleSelectHistory(item)}
							>
								{item}
							</li>
						))}
				</motion.ul>
			)}
		</div>
	);
};
