import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, Zap } from "lucide-react";

const fadeIn = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
	viewport: {once: false}
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const AudienceSection: React.FC = () => {
	return (
		<motion.section
			className="py-15 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
			initial="hidden"
			whileInView="visible"
			viewport={{ amount: 0.5, once: false }}
			variants={containerVariants}
		>
			<div className="absolute inset-0 bg-transparent -z-10" />
			<motion.h2
				className="text-4xl md:text-6xl font-bold max-w-[75%] text-left mb-12"
				variants={fadeIn}
			>
				<span className="">Для кого</span>{" "}
				<span className="text-purple-500">наш сервис?</span>
			</motion.h2>

			<motion.div className="space-y-8" variants={containerVariants}>
				<motion.div
					className="flex flex-col sm:flex-row items-center gap-6"
					variants={fadeIn}
				>
					<ShoppingCart className="w-12 h-12 text-blue-500 flex-shrink-0" />
					<div className="text-center sm:text-left">
						<h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
							Владельцы интернет-магазинов
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							Улучшайте качество сайта, повышайте конверсию и увеличивайте
							продажи с помощью автоматической аналитики.
						</p>
					</div>
				</motion.div>
				<motion.div
					className="flex flex-col sm:flex-row items-center gap-6"
					variants={fadeIn}
				>
					<TrendingUp className="w-12 h-12 text-blue-500 flex-shrink-0" />
					<div className="text-center sm:text-left">
						<h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
							Маркетологи
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							Получайте данные для оптимизации SEO, анализа конкурентов и роста
							трафика.
						</p>
					</div>
				</motion.div>
				<motion.div
					className="flex flex-col sm:flex-row items-center gap-6"
					variants={fadeIn}
				>
					<Zap className="w-12 h-12 text-blue-500 flex-shrink-0" />
					<div className="text-center sm:text-left">
						<h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
							SEO-специалисты
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							Используйте глубокую аналитику и рекомендации для улучшения
							позиций в поисковой выдаче.
						</p>
					</div>
				</motion.div>
			</motion.div>
		</motion.section>
	);
};

export default AudienceSection;