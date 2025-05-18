import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BenefitCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

const cardVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
	hover: {
		scale: 1.05,
		y: -10,
		boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
		transition: { duration: 0.3 },
	},
	float: {
		y: [0, -10, 0],
		transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
	},
};

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
	return (
		<motion.div
			className="relative p-6 bg-white dark:bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all"
			variants={cardVariants}
			whileHover="hover"
			animate="float"
		>
			<div className="w-12 h-12 text-blue-500 mb-4">{icon}</div>
			<h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
			<p className="text-gray-600 dark:text-gray-400">{description}</p>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
		</motion.div>
	);
};

export default BenefitCard;