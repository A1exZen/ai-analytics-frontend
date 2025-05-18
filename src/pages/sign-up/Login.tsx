import { motion } from "framer-motion";
import { FormEvent, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../../zustand/useUserStore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase.ts";
import {googleLogin, login} from "@/api/authApi.ts";

export const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { checkAuth, setUser } = useUserStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const { user, token } = await login(email, password);
			setUser(user, token);
			toast.success("Добро пожаловать!");
			navigate("/");
		} catch (error: any) {
			toast.error(error.message || "Network error. Try again.");
			console.error("Error logging in:", error);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const idToken = await result.user.getIdToken();
			const { user, token } = await googleLogin(idToken);
			setUser(user, token);
			toast.success("Login with Google successful!");
			navigate("/");
		} catch (error) {
			toast.error("Google login failed.");
			console.error("Error in handleGoogleLogin:", error);
		}
	};

	return (
		<>
			<div className="main" />
			<div className="mt-[72px] flex grow items-center justify-center w-fit">
				<motion.div
					className="relative md:w-[400px] max-w-xl bg-gray-100 bg-opacity-10 backdrop-blur-md dark:bg-opacity-10 dark:backdrop-blur-md dark:bg-zinc-800 p-7 mx-3 md:mx-0 rounded-3xl shadow-xl flex flex-col gap-5 border-2 border-gray-200 dark:border-none dark:text-white"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ type: "spring", stiffness: 50 }}
				>
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-1">Авторизация</h2>
						<p className="text-sm text-gray-500 dark:text-gray-300">
							С возвращением! Введите ваши данные.
						</p>
					</div>
					<form className="flex flex-col gap-3" onSubmit={handleEmailLogin}>
						<div className="flex flex-col gap-1">
							<label className="text-xs text-gray-500 dark:text-gray-300">
								Электронная почта
							</label>
							<input
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:border-blue-400 dark:focus:border-blue-400 dark:bg-mainGray"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-xs text-gray-500 dark:text-gray-300">
								Пароль
							</label>
							<input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:border-blue-400 dark:focus:border-blue-400 dark:bg-mainGray"
							/>
						</div>
						<button
							type="submit"
							className="mt-5 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
						>
							Войти
						</button>
					</form>
					<div className="flex items-center">
						<hr className="grow border-t border-gray-300" />
						<span className="px-4 text-gray-500 text-xs">ИЛИ</span>
						<hr className="grow border-t border-gray-300" />
					</div>
					<button
						onClick={handleGoogleLogin}
						className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-1 focus:ring-blue-400"
					>
						<FcGoogle />
						Sign in with Google
					</button>
					<div className="flex justify-center gap-2">
						<p className="text-xs text-gray-600 dark:text-gray-200">
							Нет учетной записи?{" "}
							<Link to="/sign-up/register" className="text-blue-600 dark:text-blue-300 underline">
								Регистрация
							</Link>
						</p>
					</div>
				</motion.div>
			</div>
		</>
	);
};