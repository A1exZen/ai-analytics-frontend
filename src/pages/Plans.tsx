import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export const Plans = () => {
	return (
		<div className='flex flex-col w-full bg-slate-50 dark:bg-background mt-[74px] py-10 px-6 '>
			{/*<div className='h-full bg-slate-50'/>*/}
			<div className='flex flex-col items-center'>
				<h1 className='text-3xl font-extrabold text-black dark:text-white sm:text-4xl text-center max-w-4xl'>
					Обновите тариф для новых возможностей.
				</h1>
				<h2 className='desc'>Выберите план, который подходит для вас!</h2>
			</div>
			<motion.div
				className='flex-grow-2 grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto mt-10  '
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<motion.div
					className='relative bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-md flex flex-col gap-5 border-border border'
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 250 }}
				>
					<div className='text-center '>
						<h2 className='text-xl font-semibold mb-2'>Базовый Тариф</h2>
						<p className=' text-gray-500 dark:text-gray-400'>
							Идеально для новичков, чтобы начать изучать аналитику сайта.
						</p>
					</div>
					<div className='relative flex items-center mx-auto gap-2'>
						<p className='text-5xl font-bold'>0$</p>
						<p className='translate-y-[-0.5rem] font-semibold text-gray-500 dark:text-gray-300  text-xs uppercase'>
							/МЕСЯЦ
						</p>
					</div>
					<div className='flex flex-col'>
						<div className='text-slate-600 dark:text-gray-300   flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b border-slate-200 dark:border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-400' />
							Доступ к базовым метрикам и аналитике
						</div>
						<div className='text-slate-600 dark:text-gray-300   flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b border-slate-200 dark:border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-400' />
							<p>Ограничение запросов</p>
						</div>
						<div className='text-slate-600 dark:text-gray-300  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b border-slate-200 dark:border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-400' />
							Отчеты в текстовом формате
						</div>
						<div className='text-slate-600 dark:text-gray-300   flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b border-slate-200 dark:border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-400' />
							Поддержка по электронной почте
						</div>
						<div className='text-slate-600  dark:text-gray-300  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b border-slate-200 dark:border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-400' />
							Бесплатно навсегда
						</div>
					</div>
					<div>
						<div className='w-full text-center rounded-xl border border-blue-700 cursor-pointer bg-white py-2 px-4 font-semibold text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:border hover:border-transparent hover:text-white'>
							Начать
						</div>
					</div>
				</motion.div>
				{/*-------------------------------*/}
				<motion.div
					className='plans_card_gradient relative p-8 rounded-2xl shadow-md flex flex-col gap-5 dark:text-white border-border border'
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 250 }}
				>
					<div className='text-center'>
						<h2 className='text-xl font-semibold font-sans'>Премиум Тариф</h2>
						<p className=' text-gray-500 dark:text-gray-300'>
							Для профессионалов и бизнеса с расширенным функционалом и
							поддержкой.
						</p>
					</div>
					<div className='relative flex items-center mx-auto gap-2'>
						<p className='text-5xl font-bold'>0,98$</p>
						<p className='translate-y-[-0.5rem] font-semibold text-gray-500 dark:text-gray-300 text-xs uppercase'>
							/МЕСЯЦ
						</p>
					</div>
					<div className='flex flex-col '>
						<div className='text-slate-600 dark:text-slate-200 flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-200' />
							Доступ ко всем метрикам и премиум-аналитике
						</div>
						<div className='text-slate-600 dark:text-slate-200  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-200' />
							Неограниченное количество запросов
						</div>
						<div className='text-slate-600 dark:text-slate-200 flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-200' />
							Детализированная визуализация данных
						</div>
						<div className='text-slate-600 dark:text-slate-200  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-200' />
							Генерация кастомных отчетов
						</div>
						<div className='text-slate-600 dark:text-slate-200  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-300 rounded-lg'>
							<FaCheckCircle className='fill-slate-800 dark:fill-slate-200' />
							Бесплатная пробная версия на 14 дней
						</div>
					</div>
					<div>
						<div className='w-full text-center rounded-xl border border-blue-700 cursor-pointer bg-white py-2 px-4 font-semibold text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:border hover:border-transparent hover:text-white'>
							Начать
						</div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};
