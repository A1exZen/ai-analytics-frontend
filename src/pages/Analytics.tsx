import { motion } from "framer-motion"
import React, { useState } from "react"
import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryLegend,
	VictoryTheme,
	VictoryTooltip,
} from "victory"
import { Data } from "../types/types.ts"

import PerformanceGauges from "@/components/ui/analytics/PerformanceGauges.tsx"
import { SEO } from "@/components/ui/analytics/SEO.tsx"
import TrafficMap from "@/components/ui/analytics/TrafficMap.tsx"
import { removeProtocol } from "@/utils/removeProtocol.ts"
import { useAnalysisStore } from "@/zustand/useAnalysisStore.ts"
import { BiSolidLike } from "react-icons/bi"
import { FaInfoCircle } from "react-icons/fa"
import { MdSpaceDashboard } from "react-icons/md"
import { RiFolderInfoLine } from "react-icons/ri"
import TrafficType from "../components/ui/analytics/TrafficType.tsx"
import { Card } from "../components/ui/Card"
import { Info } from "./Info.tsx"

interface IPerfomanceItem {
	x: "Mobile" | "Desktop"
	y: number
}

const Analytics: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"1" | "2" | "3">("1")
	const [isLocked] = useState(true)
	const { currentAnalysis } = useAnalysisStore()

	if (!currentAnalysis) {
		return (
			<div className="p-6 max-w-5xl mx-auto">
				Анализ не найден. Выберите анализ из истории.
			</div>
		)
	}
	const { url, data } = currentAnalysis
	console.log("Raw data:", data)
	console.log("Data type:", typeof data)
	const parsedData = typeof data === "string" ? JSON.parse(data) : data
	console.log("Parsed data:", parsedData)
	const { pageSpeed, openAIAnalysis }: Data = parsedData
	console.log("PageSpeed:", pageSpeed)

	if (!data || !pageSpeed || !pageSpeed.metrics) {
		return (
			<div className="mt-32 p-6 max-w-5xl mx-auto">
				<h1 className="text-3xl font-bold mb-4">
					Анализ сайта: {removeProtocol(url)}
				</h1>
				<p>Данные анализа отсутствуют или повреждены.</p>
			</div>
		)
	}

	const { metrics } = pageSpeed

	const trafficData = [
		{
			x: "Органический",
			y: openAIAnalysis?.traffic_distribution?.organic || 0,
		},
		{ x: "Социальный", y: openAIAnalysis?.traffic_distribution?.social || 0 },
		{
			x: "Реферальный",
			y: openAIAnalysis?.traffic_distribution?.referral || 0,
		},
		{ x: "Прямой", y: openAIAnalysis?.traffic_distribution?.direct || 0 },
		{ x: "Платный", y: openAIAnalysis?.traffic_distribution?.paid || 0 },
	]
	const deviceData = [
		{ x: "Мобильные", y: openAIAnalysis?.device_distribution?.mobile || 0 },
		{ x: "Десктоп", y: openAIAnalysis?.device_distribution?.desktop || 0 },
		{ x: "Планшеты", y: openAIAnalysis?.device_distribution?.tablet || 0 },
	]
	const performanceData: IPerfomanceItem[] = [
		{ x: "Mobile", y: openAIAnalysis?.performance_scores?.mobile || 0 },
		{ x: "Desktop", y: openAIAnalysis?.performance_scores?.desktop || 0 },
	]
	const dataPageSpeed = [
		{
			x: "Индекс скорости",
			y: parseFloat(metrics.speedIndex),
			fill: "#4F46E5",
		},
		{ x: "FCP", y: parseFloat(metrics.firstContentfulPaint), fill: "#06B6D4" },
		{
			x: "Время блокировки",
			y: parseFloat(metrics.totalBlockingTime) / 1000,
			fill: "#EF4444",
		},
		{
			x: "LCP",
			y: parseFloat(metrics.largestContentfulPaint),
			fill: "#F59E0B",
		},
		{
			x: "Интерактивность",
			y: parseFloat(metrics.interactive),
			fill: "#10B981",
		},
	]
	const competitors = openAIAnalysis.competitors
		? openAIAnalysis.competitors.split(", ").map(item => item.trim())
		: []

	return (
		<motion.main
			className="w-full h-full bg-background mt-[74px] py-5 sm:py-10 px-2 sm:px-5 dark:text-white"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="grid gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-7xl m-[0_auto]"
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{/*-------------------------1 Line Card-------------------------*/}
				<motion.div
					className="relative flex flex-col sm:flex-row justify-between flex-wrap items-center bg-white dark:bg-gray-800 p-3 sm:p-5 rounded-xl shadow-md md:pt-5 pt-8"
					initial={{ scale: 0.95, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.4 }}
				>
					<div className="absolute flex gap-1 top-0 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-2xl border-4 border-white dark:bg-gray-600 dark:border-gray-800">
						<div
							className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-101 duration-200 ${
								activeTab === "1" ? "bg-white dark:bg-gray-500" : ""
							}`}
							onClick={() => setActiveTab("1")}
						>
							<MdSpaceDashboard className="fill-gray-500 dark:fill-white" />
							<span
								className={`text-xs sm:text-sm font-medium text-gray-500 dark:text-white ${
									activeTab === "1" ? "text-gray-700" : ""
								}`}
							>
								Анализ
							</span>
						</div>
						<div
							className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 duration-200 ${
								activeTab === "2" ? "bg-white dark:bg-gray-500" : ""
							}`}
							onClick={() => setActiveTab("2")}
						>
							<RiFolderInfoLine className="fill-gray-500 dark:fill-white" />
							<span
								className={`text-xs sm:text-sm font-medium text-gray-500 dark:text-white ${
									activeTab === "2" ? "text-gray-700" : ""
								}`}
							>
								Инфо
							</span>
						</div>

						<div
							className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 duration-200 ${
								activeTab === "3" ? "bg-white dark:bg-gray-500" : ""
							}`}
							onClick={() => setActiveTab("3")}
						>
							<RiFolderInfoLine className="fill-gray-500 dark:fill-white" />
							<span
								className={`text-xs sm:text-sm font-medium text-gray-500 dark:text-white ${
									activeTab === "3" ? "text-gray-700" : ""
								}`}
							>
								Дополнительно
							</span>
						</div>
					</div>
					<div className="text-center sm:text-left mb-3 sm:mb-0">
						<h1 className="font-bold text-lg sm:text-xl mb-1">
							{removeProtocol(url)}
						</h1>
						<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
							{openAIAnalysis.purpose}
						</p>
					</div>
					<div className="text-center sm:text-left">
						<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mr-2">
							Домен:
						</span>
						<a
							href={url}
							target="_blank"
							className="text-blue-500 dark:text-blue-400 hover:underline text-xs sm:text-sm break-all"
						>
							{url}
						</a>
					</div>
				</motion.div>
				{/*-----------------------------------------------------------------*/}
				{activeTab === "1" && (
					<>
						{/*--------------------4 Cards in Line--------------------*/}
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<Card
								title="Внешние / Внутренние ссылки"
								isPositive={2 >= 0}
								isLocked={false}
								customValue={
									<>
										<span className="text-2xl sm:text-3xl font-bold text-blue-600">
											{openAIAnalysis.links.internal_links}
										</span>
										<span className="text-2xl sm:text-3xl px-1">/</span>
										<span className="text-2xl sm:text-3xl font-bold text-orange-400">
											{openAIAnalysis.links.external_links}
										</span>
									</>
								}
							/>
							<Card
								title="Среднее время на сайте"
								value={`${openAIAnalysis.user_engagement_metrics.average_time_on_site} s`}
								isLocked={false}
							/>

							<Card
								title="Статус SSL сертификата"
								tooltip={openAIAnalysis.ssl_certificate.security_measures}
								customValue={
									<>
										<span className={`text-lg sm:text-xl font-bold`}>
											{openAIAnalysis.ssl_certificate.status}
										</span>
									</>
								}
								isLocked={false}
							/>
							<Card
								title="Средняя скорость загрузки страницы"
								tooltip={openAIAnalysis.average_loading_speed.notes}
								customValue={
									<>
										<span
											className={`text-2xl sm:text-3xl font-bold ${
												Number(
													openAIAnalysis.average_loading_speed.milliseconds
												) > 250
													? "text-red-600"
													: "text-green-600"
											} `}
										>
											{openAIAnalysis.average_loading_speed.milliseconds} ms
										</span>
									</>
								}
								isLocked={false}
							/>
						</motion.div>
						{/*-------------------Grafics---------------------*/}
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<TrafficType trafficData={trafficData} deviceData={deviceData} />
							<div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md flex flex-col">
								<div className="flex justify-center items-center">
									<h2 className="font-medium text-gray-600 dark:text-gray-200 text-sm sm:text-base">
										Показатель Отказов
									</h2>
								</div>
								<div className="h-[300px] sm:h-[400px] min-[500px]:h-[550px] md:h-full flex items-center">
									<VictoryChart
										domainPadding={{ x: 30 }}
										height={300}
										theme={VictoryTheme.clean}
									>
										{/* Легенда */}
										<VictoryLegend
											x={40}
											y={-20}
											orientation="horizontal"
											style={{
												labels: { fill: "var(--foreground)", fontSize: 8 },
											}}
											gutter={15}
											data={dataPageSpeed
												.slice(0, Math.ceil(dataPageSpeed.length / 2))
												.map(d => ({
													name: d.x,
													symbol: { fill: d.fill },
												}))}
										/>
										<VictoryLegend
											x={100}
											y={300}
											orientation="horizontal"
											style={{
												labels: { fill: "var(--foreground)", fontSize: 8 },
											}}
											gutter={15}
											data={dataPageSpeed
												.slice(Math.ceil(dataPageSpeed.length / 2))
												.map(d => ({
													name: d.x,
													symbol: { fill: d.fill },
												}))}
										/>
										<VictoryAxis
											style={{ tickLabels: { fontSize: 8, angle: -0 } }}
										/>
										<VictoryAxis dependentAxis tickFormat={t => `${t}s`} />

										<VictoryBar
											data={dataPageSpeed}
											labels={({ datum }) => `${datum.y}s`}
											labelComponent={<VictoryTooltip />}
											style={{
												data: {
													fill: ({ datum }) => datum.fill,
													width: 20,
												},
											}}
											animate={{ duration: 700, easing: "bounce" }}
										/>
									</VictoryChart>
								</div>
							</div>
							<PerformanceGauges performanceData={performanceData} />
						</motion.div>
						{/*----------------------------------------*/}
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<SEO openAIAnalysis={openAIAnalysis} />
							<div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md flex flex-col justify-between">
								<div className="flex justify-between items-center">
									<h2 className="font-medium text-gray-600 dark:text-gray-200 mb-3 text-sm sm:text-base">
										Прочие данные
									</h2>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-400">
									<Card
										title="Страниц за сессию"
										value={
											openAIAnalysis.user_engagement_metrics
												.page_views_per_session
										}
										isLocked={false}
										className="border border-border"
									/>
									<Card
										title="Авторитет домена"
										customValue={
											<>
												<span
													className={`text-2xl sm:text-3xl font-bold ${
														Number(openAIAnalysis.domain_authority) > 70
															? "text-green-600"
															: "text-red-600"
													} `}
												>
													{openAIAnalysis.domain_authority}
												</span>
											</>
										}
										isLocked={false}
										className="border border-border"
									/>
									<div className="col-span-2">
										<Card
											tooltip={openAIAnalysis.mobile_optimization.score.toLocaleString()}
											title="Оптимизация для мобильных устройств"
											className="border border-border"
											customValue={
												<div className="text-xl sm:text-2xl text-gray-800 dark:text-gray-400 font-semibold">
													{openAIAnalysis.mobile_optimization.status}
												</div>
											}
											isLocked={false}
										/>
									</div>
								</div>
							</div>
						</motion.div>
						{/*----------------------------------------*/}
						<motion.div
							className="grid grid-cols-1 gap-3 sm:gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md flex flex-col justify-between">
								<div className="flex justify-between items-center mb-2">
									<h2 className="font-medium text-gray-600 dark:text-gray-200 text-sm sm:text-base">
										Бизнес
									</h2>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-400">
									<Card
										title="Конкуренты"
										className="border border-border"
										isLocked={false}
										customValue={
											<div className="flex flex-wrap gap-2">
												{competitors.map((competitor, index) => (
													<span
														key={index}
														className="inline-block text-base sm:text-xl font-bold text-blue-700 bg-gray-300 px-2 border rounded-lg"
													>
														{competitor}
													</span>
												))}
											</div>
										}
									/>
									<Card
										title="Доля рынка"
										className="border border-border"
										isPositive={openAIAnalysis.market_share > 50}
										value={`${openAIAnalysis.market_share} %`}
										isLocked={false}
									/>
									<Card
										className="border border-border"
										title="Упоминания в соц. сетях"
										value={`~ ${openAIAnalysis.social_mentions}`}
										isLocked={false}
									/>
								</div>
							</div>
						</motion.div>
						<motion.div
							className="grid grid-cols-1 gap-3 sm:gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md">
								<h2 className="font-medium text-gray-600 dark:text-gray-200 mb-3 text-sm sm:text-base">
									География трафика
								</h2>
								<TrafficMap
									trafficGeography={openAIAnalysis.traffic_geography}
								/>
							</div>
						</motion.div>
						{/*-----------------------------------------*/}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md flex flex-col justify-between"
						>
							<div className="flex justify-between items-center mb-2">
								<h2 className="font-medium text-gray-600 dark:text-gray-200 text-sm sm:text-base">
									Рекомендации
								</h2>
							</div>
							<div className="flex flex-col items-center justify-center text-gray-400 mt-2 gap-2">
								{Object.entries(openAIAnalysis.recommendations).map(
									([key, value]) => (
										<div
											key={key}
											className={`transition-all ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-600 px-4 sm:px-7 py-2 sm:py-3 rounded-xl flex justify-between items-center gap-3 sm:gap-5 w-full border-b border-gray-300 dark:border-gray-600`}
										>
											<div className="flex gap-3 sm:gap-5 items-center">
												<BiSolidLike className="fill-yellow-700" />
												<h2
													className={`font-medium text-gray-600 dark:text-gray-100 text-sm sm:text-base`}
												>
													{value}
												</h2>
											</div>
											<FaInfoCircle
												className={`flex justify-center items-center size-4 sm:size-5 cursor-pointer ${
													isLocked ? "blur-[2px]" : ""
												}`}
											/>
										</div>
									)
								)}
							</div>
						</motion.div>
					</>
				)}

				{activeTab === "2" && <Info />}

				{activeTab === "3" && (
					<section className="mb-8">
						<h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
							Детальный анализ
						</h2>
						<ol className="space-y-3 sm:space-y-5">
							<li className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 dark:border-gray-900">
								<h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-3 sm:mb-4">
									<span className="mr-2 text-blue-500">📊</span> Анализ
									производительности (Lighthouse)
								</h3>
								<p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
									Данные анализа недоступны.
								</p>
							</li>
						</ol>
					</section>
				)}
			</motion.div>
		</motion.main>
	)
}

export default Analytics
