import {motion} from "framer-motion";
import {FaCheckCircle} from "react-icons/fa";

export const Plans = () => {
	return (
		<>

			<div className="w-full h-full bg-slate-100 mt-[74px] py-10 px-2">
				{/*<div className='gradient'/>*/}
				<div className='flex flex-col items-center'>
					<h1
						className='mt-5 text-4xl font-extrabold text-black sm:text-5xl text-center max-w-3xl'>Обновите
						тариф для новых возможностей.</h1>
					<h2 className='desc'>
						Выберите план, который подходходит для вас!
					</h2>
				</div>
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto mt-10"
					initial={{opacity: 0}}
					animate={{opacity: 1}}>
					<motion.div
						className="relative bg-white p-10  rounded-2xl shadow-md flex flex-col  gap-5"
						whileHover={{scale: 1.05}}
						transition={{type: "spring", stiffness: 250}}>
						<div className='text-center'>
							<h2 className="text-xl font-medium mb-2">Базовый Тариф</h2>
							<p className=" text-gray-400">Идеально для новичков, чтобы начать
								изучать аналитику сайта.</p>
						</div>
						<div className='relative flex items-center mx-auto gap-2'>
							<p className="text-5xl font-bold">0$</p>
							<p
								className="translate-y-[-0.5rem] font-semibold text-gray-500 text-xs uppercase">
								/Monthly</p>
						</div>
						<div
							className="flex flex-col">
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Доступ к базовым метрикам и аналитике
							</div>
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								<p>
									Ограничение запросов: <b>до 100 в месяц</b>
								</p>
							</div>
							<div
								className="text-slate-600 flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Отчеты в текстовом формате
							</div>
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Поддержка по электронной почте
							</div>
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Бесплатно навсегда
							</div>
						</div>
						<div>
							<div
								className='w-full text-center rounded-xl border border-blue-700 cursor-pointer bg-white py-2 px-4 font-semibold text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:border hover:border-transparent hover:text-white'>Начать
							</div>
						</div>
					</motion.div>
					{/*-------------------------------*/}
					<motion.div
						className="plans_card_gradient relative p-10 rounded-2xl shadow-md flex flex-col gap-5"
						whileHover={{scale: 1.05}}
						transition={{type: "spring", stiffness: 250}}>
						<div className='text-center'>
							<h2 className="text-xl font-medium font-sans">Премиум Тариф</h2>
							<p className="text-sm text-gray-500">Для профессионалов и бизнеса
								с расширенным функционалом и поддержкой.</p>
						</div>
						<div className='relative flex items-center mx-auto gap-2'>
							<p className="text-5xl font-bold">12$</p>
							<p
								className="translate-y-[-0.5rem] font-semibold text-gray-500 text-xs uppercase">
								/Monthly</p>
						</div>
						<div
							className="flex flex-col ">
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Доступ ко всем метрикам и премиум-аналитике
							</div>
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Неограниченное количество запросов
							</div>
							<div
								className="text-slate-600 flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Детализированная визуализация данных
							</div>
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Генерация кастомных отчетов
							</div>
							<div
								className="text-slate-600  flex gap-2 w-full items-center p-2 transition-all hover:bg-slate-100 border-b botder-slate-200 rounded-lg">
								<FaCheckCircle className='fill-slate-800'/>
								Бесплатная пробная версия на 14 дней
							</div>
						</div>
						<div>
							<div
								className='w-full text-center rounded-xl border border-blue-700 cursor-pointer bg-white py-2 px-4 font-semibold text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:border hover:border-transparent hover:text-white'>Начать
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</>
	);
};
