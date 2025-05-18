import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface FAQItemProps {
	faq: { question: string; answer: string };
	index: number;
	expandedFAQ: number | null;
	setExpandedFAQ: (index: number | null) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index, expandedFAQ, setExpandedFAQ }) => {
	return (
		<motion.div
			className="bg-white dark:bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-md border border-gray-200 dark:border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.2, duration: 0.5 }}
		>
			<button
				className="w-full p-4 flex justify-between items-center text-left"
				onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
			>
				<span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{faq.question}</span>
				<HelpCircle className={`w-6 h-6 text-gray-600 dark:text-gray-400 transform transition-transform ${expandedFAQ === index ? "rotate-180" : ""}`} />
			</button>
			<motion.div
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: expandedFAQ === index ? "auto" : 0, opacity: expandedFAQ === index ? 1 : 0 }}
				transition={{ duration: 0.3 }}
				className="overflow-hidden"
			>
				<p className="p-4 pt-0 text-gray-600 dark:text-gray-400">{faq.answer}</p>
			</motion.div>
		</motion.div>
	);
};

export default FAQItem;