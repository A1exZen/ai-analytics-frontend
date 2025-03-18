import React, {SetStateAction, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {Data, PageSpeed, OpenAIAnalysis} from "../types/types.ts";

import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTooltip,
	VictoryTheme,
	VictoryLegend,
} from "victory";

import {IoAnalytics} from "react-icons/io5";
import {Card} from "../components/ui/Card";
import {FaInfoCircle} from "react-icons/fa";
import {Info} from "./Info.tsx";
import {MdLock, MdSpaceDashboard} from "react-icons/md";
import {RiFolderInfoLine} from "react-icons/ri";
import PerformanceGauges
	from "../components/ui/analytics/PerformanceGauges.tsx";
import {BiSolidLike} from "react-icons/bi";
import TrafficType from "../components/ui/analytics/TrafficType.tsx";
import {SEO} from "@/components/ui/analytics/SEO.tsx";
import TrafficMap from "@/components/ui/analytics/TrafficMap.tsx";

function removeProtocol(url: string): string {
	return url.replace(/^(https?:\/\/)?(www\.)?/, '');
}

const Analytics: React.FC = () => {
		const location = useLocation();
		console.log(location.pathname);
		const navigate = useNavigate();

		const {state} = location as { state: { query: string; data: any } | null };
		if (!state) {
			navigate("/");
			return null;
		}
		const {query, data} = state;
		console.log("Query:", query);
		console.log("Data:", data);
		const [activeTab, setActiveTab] = useState<"1" | "2" | "3">("1");
		const [isLocked, setIsLocked] = useState(true);

		const {pageSpeed, openAIAnalysis}: Data = data;
		const {performance, metrics} = pageSpeed;


		const trafficData = [
			{x: "Органический", y: openAIAnalysis?.traffic_distribution?.organic || 0},
			{x: "Социальный", y: openAIAnalysis?.traffic_distribution?.social || 0},
			{x: "Реферальный", y: openAIAnalysis?.traffic_distribution?.referral || 0},
			{x: "Прямой", y: openAIAnalysis?.traffic_distribution?.direct || 0},
			{x: "Платный", y: openAIAnalysis?.traffic_distribution?.paid || 0},
		];
		const deviceData = [
			{x: "Мобильные", y: openAIAnalysis?.device_distribution?.mobile || 0},
			{x: "Десктоп", y: openAIAnalysis?.device_distribution?.desktop || 0},
			{x: "Планшеты", y: openAIAnalysis?.device_distribution?.tablet || 0},
		];
		const performanceData = [
			{x: "Mobile", y: openAIAnalysis?.performance_scores?.mobile || 0},
			{x: "Desktop", y: openAIAnalysis?.performance_scores?.desktop || 0},
		];
		const dataPageSpeed = [
			{x: "Индекс скорости", y: parseFloat(metrics.speedIndex), fill: "#4F46E5"},
			{x: "FCP", y: parseFloat(metrics.firstContentfulPaint), fill: "#06B6D4"},
			{
				x: "Время блокировки",
				y: parseFloat(metrics.totalBlockingTime) / 1000,
				fill: "#EF4444"
			},
			{x: "LCP", y: parseFloat(metrics.largestContentfulPaint), fill: "#F59E0B"},
			{x: "Интерактивность", y: parseFloat(metrics.interactive), fill: "#10B981"}
		];
		const competitors = openAIAnalysis.competitors
			? openAIAnalysis.competitors.split(', ').map(item => item.trim())
			: [];

		return (
			<motion.main
				className='w-full h-full bg-background mt-[74px] py-10 px-5 dark:text-white'
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.5}}
			>
				<motion.div
					className='grid gap-4 mb-6 max max-w-7xl m-[0_auto]'
					initial={{y: 50, opacity: 0}}
					animate={{y: 0, opacity: 1}}
					transition={{duration: 0.5}}
				>
					{/*-------------------------1 Line Card-------------------------*/}
					<motion.div
						className='relative flex justify-between flex-wrap items-center bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md md:pt-5 pt-8'
						initial={{scale: 0.95, opacity: 0}}
						animate={{scale: 1, opacity: 1}}
						transition={{duration: 0.4}}
					>
						<div
							className='absolute flex gap-1 top-0 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-2xl border-4 border-white dark:bg-gray-600 dark:border-gray-800'>
							<div
								className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 duration-200 ${
									activeTab === "1" ? "bg-white dark:bg-gray-500" : ""
								}`}
								onClick={() => setActiveTab("1")}
							>
								<MdSpaceDashboard className='fill-gray-500 dark:fill-white'/>
								<span
									className={`text-sm font-medium text-gray-500 dark:text-white ${
										activeTab === "1" ? "text-gray-700" : ""
									}`}
								>
								Анализ
							</span>
							</div>
							<div
								className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 duration-200 ${
									activeTab === "2" ? "bg-white dark:bg-gray-500" : ""
								}`}
								onClick={() => setActiveTab("2")}
							>
								<RiFolderInfoLine className='fill-gray-500 dark:fill-white'/>
								<span
									className={`text-sm font-medium text-gray-500 dark:text-white ${
										activeTab === "2" ? "text-gray-700" : ""
									}`}
								>
								Инфо
							</span>
							</div>

							<div
								className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
									activeTab === "3" ? "bg-gray-100" : ""
								} ${
									isLocked
										? "cursor-not-allowed opacity-50"
										: "cursor-pointer hover:scale-105"
								}`}
								onClick={() => !isLocked && setActiveTab("3")}
							>
								{isLocked && (
									<MdLock
										className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400'
										size={24}
									/>
								)}
								<div
									className={`flex items-center gap-2 ${
										isLocked ? "blur-[2px]" : ""
									}`}
								>
									<IoAnalytics className='fill-gray-500 dark:fill-white'/>
									<span
										className={`text-sm font-medium ${
											activeTab === "3" ? "text-gray-100" : ""
										}`}
									>
									Аудит
								</span>
								</div>
							</div>
						</div>
						<div>
							<h1 className='font-bold text-xl mb-'>{removeProtocol(query)}</h1>
							<p
								className='text-sm text-gray-500 dark:text-gray-400'>{openAIAnalysis.purpose}</p>
						</div>
						<div>
							<span
								className='text-sm text-gray-500 dark:text-gray-400 mr-2'>Домен:</span>
							<a
								href={query}
								target='_blank'
								className='text-blue-500 dark:text-blue-400 hover:underline'
							>
								{query}
							</a>
						</div>
					</motion.div>
					{/*-----------------------------------------------------------------*/}
					{activeTab === "1" && (
						<>
							{/*--------------------4 Cards in Line--------------------*/}
							<motion.div
								className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.2}}
							>
								<Card
									title='Внешние / Внутренние ссылки'
									isPositive={2 >= 0}
									isLocked={false}
									customValue={
										<>
										<span
											className="text-3xl font-bold text-blue-600">{openAIAnalysis.links.internal_links}</span>
											<span className='text-3xl px-1'>/</span>
											<span
												className=" text-3xl font-bold text-orange-400">{openAIAnalysis.links.external_links}</span>
										</>
									}
								/>
								<Card
									title='Среднее время на сайте'
									value={`${openAIAnalysis.user_engagement_metrics.average_time_on_site} s`}
									isLocked={false}
								/>

								<Card
									title='Статус SSL сертификата'
									tooltip={openAIAnalysis.ssl_certificate.security_measures}
									customValue={
										<>
										<span
											className={`text-xl font-bold`}>{openAIAnalysis.ssl_certificate.status}</span>
										</>
									}
									isLocked={false}
								/>
								<Card
									title='Средняя скорость загрузки страницы'
									tooltip={openAIAnalysis.average_loading_speed.notes}
									customValue={
										<>
										<span
											className={`text-3xl font-bold ${Number(openAIAnalysis.average_loading_speed.milliseconds) > 250 ? 'text-red-600' : 'text-green-600'} `}>{openAIAnalysis.average_loading_speed.milliseconds} ms</span>
										</>
									}
									isLocked={false}
								/>
							</motion.div>
							{/*-------------------Grafics---------------------*/}
							<motion.div
								className='grid grid-cols-1 sm:grid-cols-3 gap-4'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.4}}
							>
								<TrafficType trafficData={trafficData} deviceData={deviceData}/>
								<div
									className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col'>
									<div className='flex justify-center items-center'>
										<h2 className='font-medium text-gray-600 dark:text-gray-200'>
											Показатель Отказов
										</h2>
									</div>
									<div
										className='h-[400px] min-[500px]:h-[550px] md:h-full flex items-center'>
										<VictoryChart domainPadding={{x: 30}}
										              height={350}
										              theme={VictoryTheme.clean}>
											{/* Легенда */}
											<VictoryLegend
												x={40} y={-20}
												orientation="horizontal"
												style={{labels: {fill: "var(--foreground)"},}}
												gutter={15}
												data={dataPageSpeed.slice(0, Math.ceil(dataPageSpeed.length / 2)).map((d) => ({
													name: d.x,
													symbol: {fill: d.fill}
												}))}
											/>
											<VictoryLegend
												x={100} y={350}
												orientation="horizontal"
												style={{labels: {fill: "var(--foreground)"},}}
												gutter={15}
												data={dataPageSpeed.slice(Math.ceil(dataPageSpeed.length / 2)).map((d) => ({
													name: d.x,
													symbol: {fill: d.fill}
												}))}
											/>
											<VictoryAxis
												style={{tickLabels: {fontSize: 10, angle: -0}}}/>
											<VictoryAxis dependentAxis tickFormat={(t) => `${t}s`}/>

											<VictoryBar
												data={dataPageSpeed}
												labels={({datum}) => `${datum.y}s`}
												labelComponent={<VictoryTooltip/>}
												style={{data: {fill: ({datum}) => datum.fill, width: 30}}}
												animate={{duration: 700, easing: "bounce"}}
											/>
										</VictoryChart>
									</div>
								</div>
								<PerformanceGauges performanceData={performanceData}/>
							</motion.div>
							{/*----------------------------------------*/}
							<motion.div
								className='grid grid-cols-1 sm:grid-cols-2 gap-4'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.4}}
							>
								<SEO openAIAnalysis={openAIAnalysis}/>
								<div
									className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between'>
									<div className='flex justify-between items-center'>
										<h2 className='font-medium text-gray-600 dark:text-gray-200 mb-3'>
											Прочие данные
										</h2>

									</div>
									<div
										className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400'>
										<Card
											title='Страниц за сессию'
											value={openAIAnalysis.user_engagement_metrics.page_views_per_session}
											isLocked={false}
											className='border border-border'
										/>
										<Card
											title='Авторитет домена'
											customValue={
												<>
										<span
											className={`text-3xl font-bold ${Number(openAIAnalysis.domain_authority) > 70 ? 'text-green-600' : 'text-red-600'} `}>{openAIAnalysis.domain_authority}</span>
												</>
											}
											isLocked={false}
											className='border border-border'
										/>
										<div className='col-span-2'>
											<Card
												tooltip={openAIAnalysis.mobile_optimization.score.toLocaleString()}
												title='Оптимизация для мобильных устройств'
												className='border border-border'
												customValue={<div className='text-2xl text-gray-800 dark:text-gray-400 font-semibold'>{openAIAnalysis.mobile_optimization.status}</div>}
												isLocked={false}
											/>
										</div>
									</div>
								</div>
							</motion.div>
							{/*----------------------------------------*/}
							<motion.div
								className='grid grid-cols-1 gap-4'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.4}}
							>
								<div
									className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between'>
									<div className='flex justify-between items-center mb-2'>
										<h2 className='font-medium text-gray-600 dark:text-gray-200'>
											Бизнес
										</h2>
									</div>
									<div
										className='grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-400'>
										<Card
											title="Конкуренты"
											className="border border-border"
											isLocked={false}
											customValue={
												<div className="flex flex-wrap gap-2">
													{competitors.map((competitor, index) => (
														<span
															key={index}
															className="inline-block text-xl font-bold text-blue-700 bg-gray-300 px-2 border rounded-lg"
														>
                                {competitor}
                            </span>
													))}
												</div>
											}
										/>
										<Card
											title='Доля рынка'
											className="border border-border"
											isPositive={openAIAnalysis.market_share > 50}
											value={`${openAIAnalysis.market_share} %`}
											isLocked={false}
										/>
										<Card
											className="border border-border"
											title='Упоминания в соц. сетях'
											value={`~ ${openAIAnalysis.social_mentions}`}
											isLocked={false}
										/>
									</div>
								</div>
							</motion.div>
							<motion.div
								className='grid grid-cols-1 gap-4'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.4}}
							>
								<div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
									<h2 className="font-medium text-gray-600 dark:text-gray-200 mb-3">
										География трафика
									</h2>
									<TrafficMap trafficGeography={openAIAnalysis.traffic_geography} />
								</div>
							</motion.div>
							{/*-----------------------------------------*/}
							<motion.div
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.4}}
								className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between'>
								<div className='flex justify-between items-center mb-2'>
									<h2 className='font-medium text-gray-600 dark:text-gray-200'>
										Рекомендации
									</h2>
								</div>
								<div
									className='flex flex-col items-center justify-center text-gray-400 mt-2 gap-2'>
									{Object.entries(openAIAnalysis.recommendations).map(([key, value]) => (
										<div
											key={key}
											className={`transition-all ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700  bg-white dark:bg-gray-600 px-7 py-3 rounded-xl flex justify-between items-center gap-5 w-full border-b border-gray-300 dark:border-gray-600`}
										>
											<div className='flex gap-5 items-center'>
												<BiSolidLike className='fill-yellow-700'/>
												<h2
													className={`font-medium text-gray-600 dark:text-gray-100`}>{value}</h2>
											</div>
											<FaInfoCircle
												className={`flex justify-center items-center size-5 cursor-pointer ${
													isLocked ? "blur-[2px]" : ""
												}`}
											/>
										</div>
									))}
								</div>
							</motion.div>
							{/*----------------------------------------*/}
							<motion.div
								className='w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.2}}
							>
								{/*<div*/}
								{/*	className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">*/}
								{/*	<div className='flex justify-between items-center'>*/}
								{/*		<h2 className="font-medium text-gray-600">Тип устройства</h2>*/}
								{/*		<select*/}
								{/*			className="border border-gray-300 text-gray-600 text-sm rounded-lg py-2 px-1">*/}
								{/*			<option selected>All</option>*/}
								{/*			<option value="">Option 1</option>*/}
								{/*			<option value="">Option 2</option>*/}
								{/*		</select>*/}
								{/*	</div>*/}
								{/*	/!*	Диаграмма 3*!/*/}

								{/*</div>*/}
								{/* <Card
								title='Трафик'
								value={mockData.traffic.value}
								change={mockData.traffic.growth}
								isPositive={mockData.traffic.growth >= 0}
								isLocked={true}
							/>
							<Card
								title='Трафик'
								value={mockData.traffic.value}
								change={mockData.traffic.growth}
								isPositive={mockData.traffic.growth >= 0}
								isLocked={true}
							/>
							<Card
								title='Трафик'
								value={mockData.traffic.value}
								change={mockData.traffic.growth}
								isPositive={mockData.traffic.growth >= 0}
								isLocked={true}
							/>
							<Card
								title='Трафик'
								value={mockData.traffic.value}
								change={mockData.traffic.growth}
								isPositive={mockData.traffic.growth >= 0}
								isLocked={true}
							/> */}
							</motion.div>
						</>
					)
					}

					{
						activeTab === "2" && <Info/>
					}
				</motion.div>
			</motion.main>
		)
			;
	}
;
export default Analytics;
