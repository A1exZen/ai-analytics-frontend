import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {ChartColumnBig} from "lucide-react";

export const Loader = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + (100 / (60000 / 500));
			});
		}, 600);
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = originalStyle;
			clearInterval(interval)
		};
	}, []);

	return (
		<motion.div
			className="fixed w-full h-full z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 0.3}}
		>
			<div
				className="relative w-33 h-33 mb-12 flex items-center justify-center">
				<motion.div
					className="absolute inset-0 rounded-full border-8 border-t-blue-500 border-b-purple-500 border-l-gray-300  border-r-gray-300"
					animate={{rotate: 360, scale: [1, 1.2, 1]}}
					transition={{
						repeat: Infinity,
						repeatType: "loop",
						duration: 2.5,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="rounded-full bg-gray-300 p-3 "
					animate={{scale: [1, 1.4, 1]}}
					transition={{
						repeat: Infinity,
						repeatType: "loop",
						duration: 4,
						ease: "easeInOut",
					}}
				>
					<ChartColumnBig
						className="w-10 h-10 text-indigo-600 z-10"/>
				</motion.div>
			</div>

			<motion.div
				className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-6"
				animate={{y: [0, -5, 0]}}
				transition={{repeat: Infinity, duration: 2, ease: "easeInOut"}}
			>
				Ваш анализ скоро будет готов
			</motion.div>

			<div className="w-80">
				<div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
					<motion.div
						className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
						initial={{width: 0}}
						animate={{width: `${progress}%`}}
						transition={{duration: 0.6, ease: "linear"}}
					/>
				</div>
				<div className="text-sm text-gray-500 mt-2 text-center">
					{Math.round(progress)}%
				</div>
			</div>
		</motion.div>
	);
};
