import { motion } from "framer-motion";
import { TrendingUp, Clock, ShoppingCart, Lock } from "lucide-react";
import FeatureCard from "./FeatureCard";
import React from "react";

const fadeIn = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
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


const FeaturesSection: React.FC = () => {

	return (
		<motion.section
			className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
			initial="hidden"
			whileInView="visible"
			viewport={{ amount: 0.5 }}
			variants={containerVariants}
		>
			<div className="absolute inset-0 bg-transparent -z-10" />

			<motion.h2
				className="text-4xl md:text-6xl font-bold max-w-[75%] text-left mb-12"
				variants={fadeIn}
			>
				<span className="">Что анализирует</span>{" "}
				<span className="text-purple-500">наша мартех-система?</span>
			</motion.h2>
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
				variants={containerVariants}
			>
				<FeatureCard
					icon={<TrendingUp className="w-12 h-12 text-blue-500" />}
					title="SEO и позиции"
					description="Анализ ключевых слов, мета-тегов, структуры URL, ошибок индексации и рекомендаций для роста в поисковой выдаче."
				/>
				<FeatureCard
					icon={<Clock className="w-12 h-12 text-purple-500" />}
					title="Скорость загрузки"
					description="Проверка времени загрузки страниц, оптимизация изображений и советы по улучшению Core Web Vitals."
				/>
				<FeatureCard
					icon={<ShoppingCart className="w-12 h-12 text-blue-500" />}
					title="Usability для e-commerce"
					description="Оценка удобства навигации, корзины, фильтров и checkout-процесса для повышения конверсии."
				/>
				<FeatureCard
					icon={<Lock className="w-12 h-12 text-purple-500" />}
					title="Безопасность"
					description="Проверка SSL, уязвимостей, защиты данных клиентов и соответствия стандартам безопасности."
				/>
			</motion.div>
		</motion.section>
	);
};

export default FeaturesSection;