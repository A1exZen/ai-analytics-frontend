import React, { useState } from "react";
import useLoadingStore from "../zustand/useLoadingStore";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { uploadImg } from "@/assets/index.js";

export const UploadPDF = () => {
	const [file, setFile] = useState<File | null>(null);
	const [analysis, setAnalysis] = useState<string | null>(null);
	const { startLoading, stopLoading, isLoading } = useLoadingStore();

	// Максимальный размер файла (10 МБ)
	const MAX_FILE_SIZE = 10 * 1024 * 1024;

	// Обработка выбора файла
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			if (selectedFile.type !== "application/pdf") {
				toast.error("Пожалуйста, выберите файл PDF.");
				setFile(null);
				return;
			}
			if (selectedFile.size > MAX_FILE_SIZE) {
				toast.error("Файл слишком большой. Максимальный размер: 10 МБ.");
				setFile(null);
				return;
			}
			setFile(selectedFile);
		} else {
			setFile(null);
		}
	};

	// Обработка перетаскивания файла
	const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files[0];
		if (droppedFile) {
			if (droppedFile.type !== "application/pdf") {
				toast.error("Пожалуйста, выберите файл PDF.");
				setFile(null);
				return;
			}
			if (droppedFile.size > MAX_FILE_SIZE) {
				toast.error("Файл слишком большой. Максимальный размер: 10 МБ.");
				setFile(null);
				return;
			}
			setFile(droppedFile);
		} else {
			setFile(null);
		}
	};

	// Отправка файла на сервер для анализа
	const handleUpload = async () => {
		if (!file) {
			toast.error("Файл не выбран.");
			return;
		}

		startLoading();
		setAnalysis(null);

		const formData = new FormData();
		formData.append("pdf", file);

		try {
			const response = await axios.post(
				"http://localhost:5001/api/analyze-pdf",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					onUploadProgress: (progressEvent) => {
						const progress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total!
						);
						console.log(`Загружено: ${progress}%`);
					},
				}
			);

			setAnalysis(response.data.analysis);
			toast.success("Анализ успешно завершён!");
		} catch (error: any) {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data.error || "Ошибка загрузки файла");
			} else {
				toast.error("Произошла ошибка при анализе PDF.");
			}
		} finally {
			stopLoading();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			{/* Зона загрузки */}
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "spring" }}
				className="flex flex-col items-center justify-center mx-2 p-10 lg:w-1/3 lg:h-1/3 border-2 border-dashed border-gray-400 dark:border-gray-200 rounded-lg bg-slate-100 dark:bg-zinc-900"
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleFileDrop}
			>
				<img src={uploadImg} className="w-16 h-16" alt="Upload Icon" />
				<p className="text-gray-600 dark:text-white">Перетащите PDF файл или</p>
				<input
					type="file"
					accept="application/pdf"
					onChange={handleFileChange}
					className="hidden"
					id="fileInput"
				/>
				<label
					htmlFor="fileInput"
					className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
				>
					Выберите файл
				</label>
				{file && (
					<div className="mt-5 flex flex-col items-center">
						<p className="text-gray-700 dark:text-gray-200 text-center">
							Выбранный файл: {file.name}
						</p>
						<button
							onClick={handleUpload}
							className={`px-4 py-2 mt-2 text-white rounded-lg ${
								isLoading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-green-600 hover:bg-green-800"
							}`}
							disabled={isLoading}
						>
							{isLoading ? "Обработка..." : "Отправить на анализ"}
						</button>
					</div>
				)}
			</motion.div>

			{/* Результат анализа */}
			{analysis && (
				<div className="mt-6 p-4 border border-gray-300 bg-gray-50 dark:bg-gray-800 rounded max-w-xl w-full">
					<h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
						Результат анализа:
					</h3>
					<pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                        {analysis}
                    </pre>
				</div>
			)}
		</div>
	);
};