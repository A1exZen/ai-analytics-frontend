

import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useThemeStore from "../../zustand/useThemeStore";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import toast from "react-hot-toast";
import useUserStore from "../../zustand/useUserStore";
import {logo} from '@/assets/index.js'

const Header: React.FC = () => {
	const location = useLocation();
	const { theme, toggleTheme } = useThemeStore();
	const { user } = useUserStore();

	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			toast.success("Вы вышли из аккаунта!");
		} catch (error) {
			toast.error("Ошибка при выходе.");
			console.error("Error signing out:", error);
		}
	};

	return (
		<motion.header
			className={`absolute top-0 left-0 z-50 w-full flex justify-center items-center flex-col bg-opacity-60 backdrop-blur-md px-5 dark:text-white`}
			initial={{ y: -50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring", stiffness: 50 }}
		>
			<nav
				className={`flex justify-between items-center w-full max-w-7xl px-2 md:px-0 py-4`}
			>
				<Link
					to='/'
					className='font-bold text-xl flex gap-1 items-center justify-center'
				>
					<motion.img
						src={logo}
						alt='LOGO'
						className='object-cover w-8 h-8'
						initial={{ rotate: 0 }}
						animate={{ rotate: 360 }}
						transition={{
							duration: 1,
							delay: 0.5,
							ease: "easeInOut",
						}}
					/>
					<span className='uppercase text-center dark_blue_gradient font-black text-2xl'>
						Analytics
					</span>
				</Link>
				{/*Desktop*/}
				<div className='hidden md:flex gap-8 items-center font-semibold'>
					<NavLink
						to='/upload-pdf'
						className={({ isActive }) =>
							`nav__link ${
								isActive ? "text-blue-700 dark:text-blue-400 before:w-full" : ""
							}`
						}
					>
						Анализ PDF
					</NavLink>
					<NavLink
						to='/contacts'
						className={({ isActive }) =>
							`nav__link ${
								isActive ? "text-blue-700 dark:text-blue-400 before:w-full" : ""
							}`
						}
					>
						Контакты
					</NavLink>
					<div className='flex gap-3'>
						<NavLink to='/plans' className='main_btn'>
							Тарифы
						</NavLink>
						{user ? (
							<Link to='/' className='main_btn_outline' onClick={handleSignOut}>
								Выход
							</Link>
						) : (
							<NavLink to='/sign-up/login' className='main_btn'>
								Авторизация
							</NavLink>
						)}
					</div>
					<div className='flex items-center space-x-1'>
						<span>{theme === "light" ? "☀️" : "🌙"}</span>
						<button
							onClick={toggleTheme}
							className='relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300 dark:bg-gray-600 transition-colors'
						>
							<span
								className={`${
									theme === "light" ? "translate-x-6" : "translate-x-1"
								} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
							/>
						</button>
					</div>
				</div>
				{/*Burger*/}
				<div className='md:hidden flex items-center'>
					<button
						className='p-2 focus:outline-none'
						onClick={toggleMenu}
						aria-label='Toggle Menu'
					>
						<div className='w-6 h-0.5 bg-black dark:bg-white mb-1'></div>
						<div className='w-6 h-0.5 bg-black dark:bg-white mb-1'></div>
						<div className='w-6 h-0.5 bg-black dark:bg-white'></div>
					</button>
				</div>
			</nav>
			{/* Mobile Menu */}
			{menuOpen && (
				<motion.div
					className='w-full bg-white dark:bg-backgroundDark absolute top-14 left-0 px-7 py-6 shadow-md flex flex-col gap-4 md:hidden'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 50 }}
				>
					<div className='flex justify-between items-center gap-5'>
						<div className='flex-1 flex flex-col gap-3'>
							<Link
								to='/about-us'
								className='nav__link text-lg'
								onClick={() => setMenuOpen(false)}
							>
								О нас
							</Link>
							<Link
								to='/contacts'
								className='nav__link text-lg'
								onClick={() => setMenuOpen(false)}
							>
								Контакты
							</Link>
						</div>
						<div className='flex items-center space-x-1'>
							<span>{theme === "light" ? "☀️" : "🌙"}</span>
							<button
								onClick={toggleTheme}
								className='relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300 dark:bg-gray-600 transition-colors'
							>
								<span
									className={`${
										theme === "light" ? "translate-x-6" : "translate-x-1"
									} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
								/>
							</button>
						</div>
					</div>
					<NavLink
						to='/plans'
						className='main_btn w-full text-center'
						onClick={() => setMenuOpen(false)}
					>
						Тарифы
					</NavLink>
					{user ? (
						<NavLink
							to='/sign-up/login'
							type='button'
							className='main_btn w-full flex justify-center'
							onClick={() => setMenuOpen(false)}
						>
							Авторизация
						</NavLink>
					) : (
						<Link
							to='/'
							className='main_btn w-full text-center'
							onClick={handleSignOut}
						>
							Выход
						</Link>
					)}
				</motion.div>
			)}
		</motion.header>
	);
};

export default Header;
