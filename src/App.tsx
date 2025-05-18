import "./styles/App.css";
import Header from "./components/ui/Header.tsx";
import HomeAnalytics from "./pages/HomeAnalytics.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Plans} from "./pages/Plans.tsx";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import useThemeSync from "./hooks/useThemeSync.tsx";
import {Login} from "./pages/sign-up/Login.tsx";
import {Register} from "./pages/sign-up/Register.tsx";
import {Toaster} from "react-hot-toast";
import {UploadPDF} from "./pages/UploadPDF.tsx";
import Contacts from "./pages/Contacts.tsx";
import {logo} from '@/assets'
import Home from "@/pages/Home/Home.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import useUserStore from "@/zustand/useUserStore.ts";
import Analytics from "@/pages/Analytics.tsx";

const App: React.FC = () => {
	const [isLogo, setIsLogo] = useState(true);
	useThemeSync();

	const { checkAuth } = useUserStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLogo(false);
		}, 2500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<BrowserRouter>
			<div className='app font-sans'>
				<Toaster position='top-center' reverseOrder={false}/>
				{isLogo && (
					<motion.div
						className='logo-container absolute inset-0 flex justify-center items-center gap-5'
						initial={{opacity: 0, scale: 0.5}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 1}}
					>
						<motion.img
							src={logo}
							alt='Logo'
							className='w-20 h-20 z-50'
							initial={{opacity: 0, rotate: 0}}
							animate={{opacity: 1, rotate: 360}}
							transition={{duration: 1, ease: "easeInOut"}}
						/>
						<motion.span
							className='uppercase text-center dark_blue_gradient font-black text-4xl z-40'
							initial={{opacity: 0, x: -100}}
							animate={{opacity: 1, x: 0}}
							transition={{
								delay: 1,
								duration: 1.3,
								ease: "easeOut",
							}}
						>
							Analytics
						</motion.span>
					</motion.div>
				)}
				{!isLogo && (
					<>
						<Header/>
						<Routes>
							<Route path='/' element={<Home/>}/>
							<Route path='/plans' element={<Plans/>}/>
							<Route path='/sign-up/login' element={<Login/>}/>
							<Route path='/sign-up/register' element={<Register/>}/>
							<Route path='/contacts' element={<Contacts/>}/>

							<Route element={<ProtectedRoute/>}>
								<Route path='/upload-pdf' element={<UploadPDF/>}/>
								<Route path='/analytics' element={<HomeAnalytics/>}/>
								<Route path='/analytics/:id' element={<Analytics/>}/>
							</Route>
						</Routes>
					</>
				)}
			</div>
		</BrowserRouter>
	);
};

export default App;
