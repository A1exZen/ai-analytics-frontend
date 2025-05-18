import {motion} from "framer-motion";
import {ArrowRight} from "lucide-react";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import useUserStore from "@/zustand/useUserStore.ts";

const fadeIn = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

const HeroSection: React.FC = () => {
	const {user, checkAuth} = useUserStore();
	const [ , setProgress] = useState(0);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev < 100 ? prev + 1 : 100));
		}, 50);
		return () => clearInterval(interval);
	}, []);

	return (
		<section
			className="relative text-center max-w-7xl min-h-screen flex flex-col items-center justify-center mx-auto">

				<motion.h1
					className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
					animate={fadeIn}
				>
					Автоматическая аналитика качества сайта
					<br className="max-md:hidden"/>
					<motion.span
					             className="text-gray-700 dark:text-gray-200 ml-2">
						 для интернет-магазинов
					</motion.span>
				</motion.h1>
				<motion.p
					className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-300"
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.4, duration: 0.8}}
				>
					Повышайте продажи и конверсию с помощью аналитики: SEO, скорость,
					usability, безопасность — всё в одном месте.
				</motion.p>
				<motion.div
					className="flex md:flex-row flex-col gap-4 justify-center"
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.6, duration: 0.8}}
				>
					{user ? (
						<Link
							to={'/analytics'}
							className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all text-white"
						>
							Начать анализ
							<ArrowRight className="ml-2 inline"/>
						</Link>
					) : (
						<>
							<Link
								to="/sign-up/register"
								className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all text-white"
							>
								Попробовать бесплатно
								<ArrowRight className="ml-2 inline"/>
							</Link>
							<Link
								to="/sign-up/login"
								className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
							>
								Войти
							</Link>
						</>
					)}
				</motion.div>
				{/*<motion.div
        className="mt-12 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Демо-анализ сайта...</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{progress}% завершено</p>
      </motion.div>*/}
				<motion.div
					className="mt-16 flex gap-8 justify-center"
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 1.0, duration: 0.8}}
				>
					<div>
						<p className="text-5xl font-bold text-blue-400">1200+</p>
						<p className="text-gray-600 dark:text-gray-400">Довольных
							клиентов</p>
					</div>
					<div>
						<p className="text-5xl font-bold text-blue-400">5000+</p>
						<p className="text-gray-600 dark:text-gray-400">Анализов в месяц</p>
					</div>
				</motion.div>

		</section>
	);
};

export default HeroSection;