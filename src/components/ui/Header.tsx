// import { logo, iconLogo } from '../assets';

import {motion} from "framer-motion";
import {Link, useLocation} from "react-router-dom";
import React, {useState} from "react";

const Header: React.FC = () => {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<motion.header
			className={`absolute top-0 left-0 z-50 w-full flex justify-center items-center flex-col bg-opacity-60 backdrop-blur-md px-2`}
			initial={{y: -50, opacity: 0}}
			animate={{y: 0, opacity: 1}}
			transition={{type: 'spring', stiffness: 50}}
		>
			<nav
				className={`flex justify-between items-center w-full max-w-7xl px-5 md:px-0 py-4`}>
				{/*<img src='' alt='LOGO' className='object-contain'/>*/}
				<Link to='/' className='font-bold text-xl'>LOGO</Link>

				{/*Desktop*/}
				<div className='hidden md:flex gap-8 items-center font-semibold'>
					<Link to='/about-us'
					      className={`nav__link ${location.pathname === '/about-us' ? 'text-blue-700' : ''}`}>О
						нас</Link>
					<Link to='/contacts'
					      className={`nav__link ${location.pathname === '/contacts' ? 'text-blue-700' : ''}`}>Контакты</Link>
					<div className='flex gap-3'>
						<button
							type='button'
							className='main_btn'
						>
							Авторизация
						</button>
						<Link to='/plans' className='main_btn'>Тарифы</Link>
					</div>
				</div>
				{/*Burger*/}
				<div className="md:hidden flex items-center">
					<button
						className="p-2 focus:outline-none"
						onClick={toggleMenu}
						aria-label="Toggle Menu"
					>
						<div className="w-6 h-0.5 bg-black mb-1"></div>
						<div className="w-6 h-0.5 bg-black mb-1"></div>
						<div className="w-6 h-0.5 bg-black"></div>
					</button>
				</div>
			</nav>
			{/* Mobile Menu */}
			{menuOpen && (
				<motion.div
					className="w-full bg-white absolute top-14 left-0 px-10 py-6 shadow-md flex flex-col gap-4 md:hidden"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 50 }}
				>
					<Link
						to="/about-us"
						className="nav__link text-lg"
						onClick={() => setMenuOpen(false)}
					>
						О нас
					</Link>
					<Link
						to="/contacts"
						className="nav__link text-lg"
						onClick={() => setMenuOpen(false)}
					>
						Контакты
					</Link>
					<button
						type="button"
						className="main_btn w-full"
						onClick={() => setMenuOpen(false)}
					>
						Авторизация
					</button>
					<Link
						to="/plans"
						className="main_btn w-full text-center"
						onClick={() => setMenuOpen(false)}
					>
						Тарифы
					</Link>
				</motion.div>
			)}
		</motion.header>
	);
};

export default Header;
