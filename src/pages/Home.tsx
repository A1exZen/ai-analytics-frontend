import {motion} from "framer-motion";
import React, {FormEvent, useEffect, useState} from "react";
import {Search} from "../components/ui/Search.tsx";
import {macPreview} from '@/assets/index.js'
import "@/styles/loader.css";
import {Loader} from "../components/Loader.tsx";
import useLoadingStore from "../zustand/useLoadingStore.ts";
import toast, {Toaster} from "react-hot-toast";

export const Home: React.FC = () => {
	const {isLoading} = useLoadingStore();
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			{isLoading && <Loader/>}
			{error && toast.error(`${error}`)}
			<div className='main'/>
			<motion.main
				className='mt-32 pb-10 sm:pt-32 w-full flex flex-col items-center gap-16 z-10 px-2'
				initial={{y: 50, opacity: 0}}
				animate={{y: 0, opacity: 1}}
				transition={{type: "spring", stiffness: 50}}
			>
				<div>
					<h1 className='head_text'>
						Аналитика
						{/*<br className='max-md:hidden'/>*/}
						<span className='blue_gradient '> Сайтов</span>
					</h1>
					<h2 className='desc'>
						Повышайте трафик и позиции в выдаче с помощью комплексного
						SEO-анализа. Получайте ежедневные отчеты о состоянии сайта и
						рекомендации по его улучшению.
					</h2>
				</div>
				{/* Search */}
				<Search setError={setError}/>
				<div className='flex items-center justify-center'>
					<motion.img initial={{opacity: 0, scale: 0.8}}
					            animate={{opacity: 1, scale: 1}}
					            transition={{duration: 0.5, ease: 'easeInOut',bounce: 0.2}}
					            src={macPreview} alt='preview'
					            className="max-w-[80%] my-16 md:max-w-[60%] drop-shadow-xl"/>
				</div>
			</motion.main>
		</>
	);
};
