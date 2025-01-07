import { motion } from "framer-motion";
import React, { useState } from "react";
import { Search } from "./ui/Search.tsx";
import "@/styles/loader.css";

export const Home: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			{isLoading && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-white/90'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className='spinner'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</motion.div>
			)}
			<div className='main' />
			<motion.main
				className='mt-32 pt-32 w-full flex flex-col items-center gap-16 z-10'
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 50 }}
			>
				<div>
					<h1 className='head_text'>
						Аналитика
						{/*<br className='max-md:hidden'/>*/}
						<span className='blue_gradient '> Сайтов</span>
					</h1>
					<h2 className='desc'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Consectetur, consequatur cum delectus dolor ea, eius eos esse
						facilis ipsam ipsum laboriosam maiores nam optio.
					</h2>
				</div>
				{/* Search */}
				<Search setLoading={setIsLoading} />
			</motion.main>
		</>
	);
};
