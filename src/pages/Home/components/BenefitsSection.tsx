import { motion } from "framer-motion";
import { BarChart, Shield, Zap } from "lucide-react";
import BenefitCard from "./BenefitCard";

// Универсальная анимация fadeIn
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

const BenefitsSection: React.FC = () => {
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
				<span className="">Преимущества</span>{" "}
				<span className="text-purple-500">нашей системы</span>
			</motion.h2>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-3 gap-6"
				variants={containerVariants}
			>
				<motion.div variants={fadeIn}>
					<BenefitCard
						icon={<BarChart />}
						title="Автоматизация анализа"
						description="ИИ автоматически анализирует сайт, экономя ваше время на ручной проверке."
					/>
				</motion.div>
				<motion.div variants={fadeIn}>
					<BenefitCard
						icon={<Shield />}
						title="Ежедневные отчёты"
						description="Получайте уведомления о проблемах и рекомендации по их устранению каждый день."
					/>
				</motion.div>
				<motion.div variants={fadeIn}>
					<BenefitCard
						icon={<Zap />}
						title="Простота и удобство"
						description="Интуитивно понятный интерфейс позволяет начать анализ всего в пару кликов."
					/>
				</motion.div>
			</motion.div>
		</motion.section>
	);
};

export default BenefitsSection;
