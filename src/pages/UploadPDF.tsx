import React, { useState } from "react";
import useLoadingStore from "../zustand/useLoadingStore";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { uploadImg } from "@/assets/index.js";

export const UploadPDF = () => {
	const [file, setFile] = useState<File | null>(null);
	const [analysis, setAnalysis] = useState<any | null>(null);
	const { startLoading, stopLoading, isLoading } = useLoadingStore();

	// Обработка выбора файла
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile && selectedFile.type === "application/pdf") {
			if (selectedFile.size > 10 * 1024 * 1024) {
				// Ограничение размера файла до 10 МБ
				toast.error("Файл слишком большой. Максимальный размер: 10 МБ.");
				return;
			}
			setFile(selectedFile);
		} else {
			setFile(null);
			toast.error("Пожалуйста, выберите файл PDF.");
		}
	};

	// Обработка перетаскивания файла
	const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files[0];
		if (droppedFile && droppedFile.type === "application/pdf") {
			if (droppedFile.size > 10 * 1024 * 1024) {
				toast.error("Файл слишком большой. Максимальный размер: 10 МБ.");
				return;
			}
			setFile(droppedFile);
		} else {
			setFile(null);
			toast.error("Пожалуйста, выберите файл PDF.");
		}
	};

	// Отправка файла на сервер
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
						// Индикатор загрузки
						const progress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total!
						);
						console.log(`Загружено: ${progress}%`);
					},
				}
			);

			setAnalysis(response.data.analysis);
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
		<div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 dark:bg-backgroundDark">
			{/* Зона загрузки */}
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "spring" }}
				className="flex flex-col items-center justify-center mx-2 p-10 lg:w-1/3 lg:h-1/3 border-2 border-dashed border-gray-400 dark:border-gray-200 rounded-lg bg-white dark:bg-mainGray"
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
						<p className="text-gray-700 text-center">
							Выбранный файл: {file.name}
						</p>
						<button
							onClick={handleUpload}
							className="px-4 py-2 mt-2 text-white bg-green-600 rounded-lg hover:bg-green-800"
							disabled={isLoading}
						>
							{isLoading ? "Обработка..." : "Отправить на анализ"}
						</button>
					</div>
				)}
			</motion.div>

			{/* Результат анализа */}
			{analysis && (
				<div className="mt-6 p-4 border border-gray-300 bg-gray-50 rounded max-w-xl w-full">
					<h3 className="font-bold text-lg mb-2">Результат анализа:</h3>
					<pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-200">
            {typeof analysis === "string" ? analysis : JSON.stringify(analysis, null, 2)}
          </pre>
				</div>
			)}
		</div>
	);
};