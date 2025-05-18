import { motion } from "framer-motion";
import { useState } from "react";
import FAQItem from "./FAQItem";
import { faqs } from "@/pages/Home/data.ts";

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

const FAQSection: React.FC = () => {
	const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

	return (
		<motion.section
			className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative overflow-hidden"
			initial="hidden"
			whileInView="visible"
			viewport={{ amount: 0.5, once: false }}
			variants={containerVariants}
		>
			<div className="absolute inset-0 bg-transparent -z-10" />

			<motion.h2
				className="text-4xl md:text-6xl font-bold text-left mb-12"
				variants={fadeIn}
			>
				<span>Часто задаваемые</span>{" "}
				<span className="text-purple-500">вопросы</span>
			</motion.h2>

			<motion.div className="space-y-4" variants={containerVariants}>
				{faqs.map((faq, index) => (
					<motion.div key={index} variants={fadeIn}>
						<FAQItem
							faq={faq}
							index={index}
							expandedFAQ={expandedFAQ}
							setExpandedFAQ={setExpandedFAQ}
						/>
					</motion.div>
				))}
			</motion.div>
		</motion.section>
	);
};

export default FAQSection;
