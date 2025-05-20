import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useThemeStore from "../../zustand/useThemeStore";
import toast from "react-hot-toast";
import useUserStore from "../../zustand/useUserStore";
import {
	useAnalysisStore
} from "@/zustand/useAnalysisStore.ts";
import { logo } from '@/assets/index.ts';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const { theme, toggleTheme } = useThemeStore();
	const { user, logout } = useUserStore();
	const { clearHistory } = useAnalysisStore();

	const [menuOpen, setMenuOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const handleSignOut = async () => {
		try {
			logout();
			navigate("/");
			toast.success("Вы вышли из аккаунта!");
		} catch (error) {
			toast.error("Ошибка при выходе.");
			console.error("Error signing out:", error);
		}
	};


	const handleClearHistory = () => {
		clearHistory();
		toast.success("История анализов очищена!");
		setDropdownOpen(false);
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
					<span
						className='uppercase text-center dark_blue_gradient font-black text-2xl'>
            Analytics
          </span>
				</Link>
				{/* Desktop */}
				<div className='hidden md:flex gap-8 items-center font-semibold'>
					{user && (
						<NavLink
							to='/analytics'
							className={({ isActive }) =>
								`nav__link ${
									isActive ? "text-blue-700 dark:text-blue-400 before:w-full" : ""
								}`
							}
						>
							Анализ
						</NavLink>
					)}

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
						{/*<NavLink to='/plans' className='main_btn'>*/}
						{/*	Тарифы*/}
						{/*</NavLink>*/}
						{user ? (
							<div className="relative">
								<button
									onClick={toggleDropdown}
									className='cursor-pointer main_btn_outline flex items-center gap-2'
								>
									Действия
									<svg
										className={`w-4 h-4 transform transition-transform ${
											dropdownOpen ? "rotate-180" : ""
										}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{dropdownOpen && (
									<motion.div
										className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-900 z-50"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.2 }}
									>
										<button
											onClick={handleClearHistory}
											className="cursor-pointer w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
										>
											Удалить историю
										</button>
										<button
											onClick={handleSignOut}
											className="cursor-pointer w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-b-lg transition-colors"
										>
											Выход
										</button>
									</motion.div>
								)}
							</div>
						) : (
							<NavLink to='/sign-up/login' className='main_btn'>
								Войти
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
				{/* Burger */}
				<div className='md:hidden flex items-center'>
					<button
						className='p-2 focus:outline-hidden'
						onClick={toggleMenu}
						aria-label='Toggle Menu'
					>
						<div className='w-6 h-0.5 bg-black dark:bg-white mb-1'></div>
						<div className='w-6 h-0.5 bg-black dark:bg-white mb-1'></div>
						<div className='w-6 h-0.5 bg-black dark:bg-white'></div>
					</button>
				</div>
			</nav>
			{menuOpen && (
				<motion.div
					className='w-full bg-white dark:bg-background border-b-2 border-gray-600 absolute top-14 left-0 px-7 py-6 shadow-md flex flex-col gap-4 md:hidden'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 50 }}
				>
					<div className='flex justify-between items-center gap-5'>
						<div className='flex-1 flex flex-col gap-3'>
							<Link
								to='/analytics'
								className='nav__link text-lg'
								onClick={() => setMenuOpen(false)}
							>
								Анализ
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
						<div className="relative">
							<button
								onClick={toggleDropdown}
								className='main_btn w-full flex justify-center items-center gap-2'
							>
								Действия
								<svg
									className={`w-4 h-4 transform transition-transform ${
										dropdownOpen ? "rotate-180" : ""
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{dropdownOpen && (
								<motion.div
									className="mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-900 z-50"
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.2 }}
								>
									<button
										onClick={handleSignOut}
										className="w-full text-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
									>
										Выход
									</button>
									<button
										onClick={handleClearHistory}
										className="w-full text-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
									>
										Удалить историю
									</button>
								</motion.div>
							)}
						</div>
					) : (
						<NavLink
							to='/sign-up/login'
							className='main_btn w-full flex justify-center'
							onClick={() => setMenuOpen(false)}
						>
							Авторизация
						</NavLink>
					)}
				</motion.div>
			)}
		</motion.header>
	);
};

export default Header;