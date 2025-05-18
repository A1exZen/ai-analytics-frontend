import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
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

};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
	return (
		<motion.div
			className="p-6 bg-white dark:bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all"
			variants={cardVariants}
			whileHover="hover"
			animate="float"
		>
			<div className="w-12 h-12 text-blue-500 mb-4">{icon}</div>
			<h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
			<p className="text-gray-600 dark:text-gray-400">{description}</p>
		</motion.div>
	);
};

export default FeatureCard;