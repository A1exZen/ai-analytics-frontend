import {fetchAllAnalyses} from "@/api/analyzeApi.ts"
import {macPreview} from "@/assets"
import "@/styles/loader.css"
import {Analysis} from "@/types/types.ts"
import ScrollToTop from "@/utils/ScrollToTop.tsx"
import {motion} from "framer-motion"
import React, {useEffect, useRef, useState} from "react"
import toast from "react-hot-toast"
import {FaHistory} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import {Loader} from "../components/Loader.tsx"
import Search from "../components/ui/Search.tsx"
import {useAnalysisStore} from "../zustand/useAnalysisStore.ts"
import useLoadingStore from "../zustand/useLoadingStore.ts"
import useUserStore from "../zustand/useUserStore.ts"

const dropdownVariants = {
	hidden: {opacity: 0, y: -20, scale: 0.95},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {duration: 0.3, ease: "easeOut"},
	},
}

const HomeAnalytics: React.FC = () => {
	const {isLoading} = useLoadingStore()
	const [error, setError] = useState<string | null>(null)
	const [showAnalysisHistory, setShowAnalysisHistory] = useState(false)
	const [isLoadingHistory, setIsLoadingHistory] = useState(false)
	const {user, token} = useUserStore()
	const {setCurrentAnalysis} = useAnalysisStore()
	const navigate = useNavigate()
	const menuRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [allAnalyses, setAllAnalyses] = useState<Analysis[]>([])

	useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					menuRef.current &&
					!menuRef.current.contains(event.target as Node) &&
					buttonRef.current &&
					!buttonRef.current.contains(event.target as Node)
				) {
					setShowAnalysisHistory(false)
				}
			}

			if (showAnalysisHistory) {
				const loadAnalyses = async () => {
					try {
						setIsLoadingHistory(true)
						const analyses = await fetchAllAnalyses()
						console.log(
							"Loaded analysis history:",
							analyses.map(analysis => ({
								...analysis,
								data:
									typeof analysis.data === "string"
										? JSON.parse(analysis.data)
										: analysis.data,
							}))
						)
						setAllAnalyses(analyses)
					} catch (err) {
						toast.error((err as Error).message || "Ошибка загрузки истории")
					} finally {
						setIsLoadingHistory(false)
					}
				}
				loadAnalyses()
				document.addEventListener("mousedown", handleClickOutside)
			} else {
				setAllAnalyses([])
			}

			return () => {
				document.removeEventListener("mousedown", handleClickOutside)
			}
		}, [showAnalysisHistory]
	)

	const toggleAnalysisHistory = () => {
		if (!user || !token) {
			toast.error(
				"Пожалуйста, авторизуйтесь, чтобы просмотреть историю анализа."
			)
			return
		}
		setShowAnalysisHistory(!showAnalysisHistory)
	}

	const handleSelectAnalysis = (analysis: Analysis) => {
		setCurrentAnalysis(analysis)
		navigate(`/analytics/${analysis.id}`)
		toast.success("Анализ загружен!")
	}

	return (
		<>
			<ScrollToTop/>
			{isLoading && <Loader/>}
			{error && toast.error(`${error}`)}
			<div className="main"/>
			<motion.main
				className="mt-20 pb-10 sm:pt-32 w-full flex flex-col items-center gap-16 z-10 px-2 relative"
				initial={{y: 50, opacity: 0}}
				animate={{y: 0, opacity: 1}}
				transition={{type: "spring", stiffness: 50}}
			>
				<div>
					<h1 className="head_text">
						Анализ
						<span className="blue_gradient "> Сайтов</span>
					</h1>
					<h2 className="desc">
						Повышайте трафик и позиции в выдаче с помощью комплексного
						SEO-анализа. Получайте отчеты о состоянии сайта и рекомендации по
						его улучшению.
					</h2>
				</div>

				{user && (
					<div className="absolute top-4 right-4 z-20">
						<motion.button
							ref={buttonRef}
							onClick={toggleAnalysisHistory}
							className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
							whileHover={{scale: 1.1, rotate: 10}}
							whileTap={{scale: 0.9}}
						>
							<FaHistory size={20}/>
						</motion.button>

						{showAnalysisHistory && (
							<motion.div
								ref={menuRef}
								className="absolute top-16 right-0 w-80 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 rounded-lg shadow-lg max-h-96 overflow-y-auto"
								variants={dropdownVariants}
								initial="hidden"
								animate="visible"
							>
								<h3
									className="text-lg font-semibold text-gray-800 dark:text-gray-200 px-4 py-3 border-b border-gray-200/30 dark:border-gray-700/30">
									История анализа
								</h3>
								{isLoadingHistory ? (
									<div className="flex items-center justify-center p-4">
										<div className="flex justify-center items-center p-4">
											<div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
										</div>
									</div>
								) : allAnalyses.length > 0 ? (
									<div className="py-2">
										{allAnalyses.map(analysis => (
											<motion.div
												key={analysis.id}
												className="px-4 py-2 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition duration-200"
												onClick={() => handleSelectAnalysis(analysis)}
												whileHover={{scale: 1.02}}
											>
												<p
													className="text-gray-700 dark:text-gray-300 font-semibold truncate">
													{analysis.url}
												</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">
													{new Date(analysis.createdAt).toLocaleDateString(
														"ru-RU",
														{
															day: "2-digit",
															month: "2-digit",
															year: "numeric",
															hour: "2-digit",
															minute: "2-digit",
														}
													)}
												</p>
											</motion.div>
										))}
									</div>
								) : (
									<p className="text-gray-600 dark:text-gray-400 px-4 py-3">
										История анализа пуста. Начните новый анализ!
									</p>
								)}
							</motion.div>
						)}
					</div>
				)}

				{/* Search */}
				<Search setError={setError}/>

				<div className="flex items-center justify-center">
					<motion.img
						initial={{opacity: 0, scale: 0.8}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.5, ease: "easeInOut", bounce: 0.2}}
						src={macPreview}
						alt="preview"
						className="max-w-[80%] my-16 md:max-w-[60%] drop-shadow-xl"
					/>
				</div>
			</motion.main>
		</>
	)
}

export default HomeAnalytics
