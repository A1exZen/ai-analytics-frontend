import { motion } from "framer-motion";

interface ProcessStepProps {
	step: string;
	title: string;
	description: string;
}

const containerVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description }) => {
	return (
		<motion.div className="flex items-center gap-6" variants={containerVariants}>
			<div className="text-5xl font-bold text-blue-500">{step}</div>
			<div>
				<h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
				<p className="text-gray-600 dark:text-gray-400">{description}</p>
			</div>
		</motion.div>
	);
};

export default ProcessStep;