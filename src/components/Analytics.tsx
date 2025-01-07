import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {MdLock, MdSpaceDashboard} from "react-icons/md";
import {RiFolderInfoLine} from "react-icons/ri";


import {motion} from "framer-motion";
import {mockData} from "@/data/mockData.js";

import {AgCharts} from "ag-charts-react";
import {IoAnalytics, IoLockClosed} from "react-icons/io5";
import {Card} from "./ui/Card";
import {BR, BY, RU, US} from "country-flag-icons/react/3x2";
import {BsInfo} from "react-icons/bs";
import {FaInfo} from "react-icons/fa6";
import {FaInfoCircle} from "react-icons/fa";
import {Info} from "./Info.tsx";


const Analytics: React.FC = () => {
		const location = useLocation();
		const {query, data} = location.state || {query: "", data: ""};
		const [activeTab, setActiveTab] = useState<'1' | '2' | '3'>('1')
		const [isLocked, setIsLocked] = useState(true)
		const [countries, setCountries] = useState([]);

		useEffect(() => {
			// Здесь можно использовать данные из mockData.js
			setCountries(mockData.visitMap.countries);
		}, []);

		const trafficChartOptions = {
			data: mockData.traffic.chart, // Используем данные
			series: [
				{
					xKey: 'date',
					yKey: 'value',
					type: 'line', // Тип графика
				},
			],
			axes: [
				{
					type: 'category',
					position: 'bottom',
					label: {
						formatter: (params) => {
							const date = params.value;
							if (date.includes('.')) {
								return date;
							} else {
								return `${date}`;
							}
						},
					},
				},
				{
					type: 'number',
					position: 'left',
				},
			],
		};
		const bounceRateChartOptions = {
			data: mockData.bounceRate.chart,
			series: [
				{
					type: 'bar',
					xKey: 'date',
					yKey: 'value',
					yName: 'Показатель отказов',
					fill: '#ff7f0e',
				},
			],
			axes: [
				{
					type: 'category',
					position: 'bottom',
				},
				{
					type: 'number',
					position: 'left',
				},
			],
		};
		const donutChartOptions = {
			data: [
				{category: 'Mobile', value: mockData.mobileUserBehavior.mobile},
				{category: 'Desktop', value: mockData.mobileUserBehavior.desktop}
			],
			series: [
				{
					type: 'donut',
					angleKey: 'value',
					calloutLabelKey: 'category',
					innerRadiusRatio: 0.7,
				},
			],

		};


		return (
			<motion.main
				className="w-full h-full bg-slate-100 mt-[74px] py-10"
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.5}}>
				<motion.div className="grid gap-4 mb-6 max max-w-7xl m-[0_auto]"
				            initial={{y: 50, opacity: 0}}
				            animate={{y: 0, opacity: 1}}
				            transition={{duration: 0.5}}>
					{/*-------------------------1 Line Card-------------------------*/}
					<motion.div
						className="relative flex justify-between items-center bg-white p-5 rounded-xl shadow-md"
						initial={{scale: 0.95, opacity: 0}}
						animate={{scale: 1, opacity: 1}}
						transition={{duration: 0.4}}>
						<div
							className="absolute flex gap-1 top-0 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-2xl border-4 border-white">
							<div
								className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 duration-200 ${activeTab === '1' ? 'bg-white' : ''}`}
								onClick={() => setActiveTab('1')}
							>
								<MdSpaceDashboard className='fill-gray-500'/>
								<span
									className={`text-sm font-medium text-gray-500 ${activeTab === '1' ? 'text-gray-700' : ''}`}>Анализ</span>
							</div>
							<div
								className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 duration-200 ${activeTab === '2' ? 'bg-white' : ''}`}
								onClick={() => setActiveTab('2')}
							>
								<RiFolderInfoLine className='fill-gray-500'/>
								<span
									className={`text-sm font-medium text-gray-500 ${activeTab === '2' ? 'text-gray-700' : ''}`}>Инфо</span>
							</div>

							<div
								className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
									activeTab === '3' ? 'bg-gray-100' : ''
								} ${
									isLocked
										? 'cursor-not-allowed opacity-50'
										: 'cursor-pointer hover:scale-105'
								}`}
								onClick={() => !isLocked && setActiveTab('3')}
							>
								{isLocked && (
									<MdLock
										className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
										size={24}
									/>
								)}
								<div
									className={`flex items-center gap-2 ${isLocked ? 'blur-[2px]' : ''}`}>
									<IoAnalytics className="fill-gray-500"/>
									<span
										className={`text-sm font-medium ${
											activeTab === '3' ? 'text-gray-700' : 'text-gray-500'
										}`}
									>
              Аудит
            </span>
								</div>
							</div>
						</div>
						<div>
							<h1 className='font-bold text-xl'>Google.com</h1>
							<p className="text-sm text-gray-500">Данные собраны X часов
								назад</p>
						</div>
						<div>
							<span className='text-sm text-gray-500 mr-2'>Domain:</span>
							<a href="https://google.com" target='_blank'
							   className="text-blue-500 hover:underline">
								google.com
							</a>
						</div>
					</motion.div>
					{/*-----------------------------------------------------------------*/}
					{activeTab === '1' && (
						<>
							{/*--------------------4 Cards in Line--------------------*/}
							<motion.div
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.5, delay: 0.2}}>
								<Card
									title="Трафик"
									value={mockData.traffic.value}
									change={mockData.traffic.growth}
									isPositive={mockData.traffic.growth >= 0}
									isLocked={false}
								/>
								<Card
									title="Показатель отказов"
									value={mockData.bounceRate.value}
									change={mockData.bounceRate.growth}
									isPositive={mockData.bounceRate.growth >= 0}
									isLocked={false}
								/>
								<Card
									title="Время на сайте"
									value={mockData.timeOnSite.value}
									change={mockData.timeOnSite.growth}
									isPositive={mockData.timeOnSite.growth >= 0}
									isLocked={false}
								/>
								<Card
									title="Конверсии"
									value={mockData.conversions.value}
									change={mockData.conversions.growth}
									isPositive={mockData.conversions.growth >= 0}
									isLocked={false}
								/>
							</motion.div>
							{/*-------------------Grafics---------------------*/}
							<motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4"
							            initial={{opacity: 0}}
							            animate={{opacity: 1}}
							            transition={{duration: 0.5, delay: 0.4}}>
								<div
									className="bg-white p-4  rounded-xl shadow-md flex flex-col justify-between">
									<div className='flex justify-between items-center'>
										<h2 className="font-medium text-gray-600">Трафик</h2>
										<select
											className="border border-gray-300 text-gray-600 text-sm rounded-lg py-2 px-1">
											<option selected value='All'>All</option>
											<option value="Option 1">Option 1</option>
											<option value="Option 2">Option 2</option>
										</select>
									</div>
									{/*	Диаграмма 1*/}
									<AgCharts options={trafficChartOptions}/>
								</div>
								<div
									className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
									<div className='flex justify-between items-center'>
										<h2 className="font-medium text-gray-600">Показатель
											Отказов</h2>
										<select
											className="border border-gray-300 text-gray-600 text-sm rounded-lg py-2 px-1">
											<option selected>All</option>
											<option value="">Option 1</option>
											<option value="">Option 2</option>
										</select>
									</div>
									{/*	Диаграмма 2*/}
									<AgCharts options={bounceRateChartOptions}/>
								</div>
								<div
									className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
									<div className='flex justify-between items-center'>
										<h2 className="font-medium text-gray-600">Тип устройства</h2>
										<select
											className="border border-gray-300 text-gray-600 text-sm rounded-lg py-2 px-1">
											<option selected>All</option>
											<option value="">Option 1</option>
											<option value="">Option 2</option>
										</select>
									</div>
									{/*	Диаграмма 3*/}
									<AgCharts options={donutChartOptions}/>
								</div>
							</motion.div>
							{/*----------------------------------------*/}
							<motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4"
							            initial={{opacity: 0}}
							            animate={{opacity: 1}}
							            transition={{duration: 0.5, delay: 0.4}}>
								<div
									className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
									<div className='flex justify-between items-center'>
										<h2 className="font-medium text-gray-600">География
											посетителей</h2>
										<select
											className="border border-gray-300 text-gray-600 text-sm rounded-lg py-2 px-1">
											<option selected>All</option>
											<option value="">Option 1</option>
											<option value="">Option 2</option>
										</select>
									</div>
									<div
										className="flex items-center justify-center text-gray-400">List
									</div>
								</div>
								<div
									className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
									<div className='flex justify-between items-center'>
										<h2 className="font-medium text-gray-600">География
											посетителей</h2>
										<select
											className="border border-gray-300 text-gray-600 text-sm rounded-lg py-2 px-1">
											<option selected>All</option>
											<option value="">Option 1</option>
											<option value="">Option 2</option>
										</select>
									</div>
									<div
										className="flex flex-col items-center justify-center text-gray-400 mt-2 gap-2">
										<motion.div
											className={`bg-white px-7 py-3 rounded-xl flex justify-between items-center gap-5 w-full border-b border-gray-300`}
											whileHover={{backgroundColor: "rgb(234,234,234)"}}
										>
											<div className='flex gap-5'>
												<BY title="United States" className="w-5"/>
												<h2
													className={`font-medium text-gray-600`}>Беларусь</h2>
											</div>
											<FaInfoCircle
												className={`flex justify-center items-center size-5 cursor-pointer ${isLocked ? 'blur-[2px]' : ''}`}/>
										</motion.div>
										<motion.div
											className={`bg-white px-7 py-3 rounded-xl flex justify-between items-center gap-5 w-full border-b border-gray-300`}
											whileHover={{backgroundColor: "rgb(234,234,234)"}}
										>
											<div className='flex gap-5'>
												<RU title="United States" className="w-5"/>
												<h2
													className={`font-medium text-gray-600`}>Россия</h2>
											</div>
											<FaInfoCircle
												className={`flex justify-center items-center size-5 cursor-pointer ${isLocked ? 'blur-[2px]' : ''}`}/>
										</motion.div>
									</div>
								</div>
							</motion.div>
							{/*----------------------------------------*/}
							<motion.div
								className="w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
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
								<Card
									title="Трафик"
									value={mockData.traffic.value}
									change={mockData.traffic.growth}
									isPositive={mockData.traffic.growth >= 0}
									isLocked={true}
								/>
								<Card
									title="Трафик"
									value={mockData.traffic.value}
									change={mockData.traffic.growth}
									isPositive={mockData.traffic.growth >= 0}
									isLocked={true}
								/>
								<Card
									title="Трафик"
									value={mockData.traffic.value}
									change={mockData.traffic.growth}
									isPositive={mockData.traffic.growth >= 0}
									isLocked={true}
								/>
								<Card
									title="Трафик"
									value={mockData.traffic.value}
									change={mockData.traffic.growth}
									isPositive={mockData.traffic.growth >= 0}
									isLocked={true}
								/>

							</motion.div>
						</>
					)}

					{activeTab === "2" && <Info/>}

				</motion.div>
			</motion.main>
		)
			;
	}
;

export default Analytics;
