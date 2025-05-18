import { motion } from "framer-motion";
import ProcessStep from "./ProcessStep";

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

const ProcessSection: React.FC = () => {
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
				<span>Как это</span>{" "}
				<span className="text-purple-500">работает?</span>
			</motion.h2>

			<motion.div className="space-y-12" variants={containerVariants}>
				<motion.div variants={fadeIn}>
					<ProcessStep
						step="01"
						title="Введите URL сайта"
						description="Укажите адрес вашего интернет-магазина для начала анализа."
					/>
				</motion.div>
				<motion.div variants={fadeIn}>
					<ProcessStep
						step="02"
						title="Получите анализ"
						description="ИИ проанализирует ваш сайт по ключевым параметрам: SEO, скорость, usability, безопасность."
					/>
				</motion.div>
				<motion.div variants={fadeIn}>
					<ProcessStep
						step="03"
						title="Следуйте рекомендациям"
						description="Получите чёткие шаги по улучшению сайта и увеличению продаж."
					/>
				</motion.div>
			</motion.div>
		</motion.section>
	);
};

export default ProcessSection;
