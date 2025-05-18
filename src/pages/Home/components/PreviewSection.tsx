import { motion } from "framer-motion";
import { macPreview } from "@/assets";
import React from "react";

const PreviewSection: React.FC = () => {
	return (
		<motion.div
			className="flex items-center justify-center translate-y-[-7rem]"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, ease: "easeInOut", bounce: 0.2 }}
		>
			<img src={macPreview} alt="Product Preview" className="max-w-[80%] md:max-w-[60%] drop-shadow-xl" />
		</motion.div>
	);
};

export default PreviewSection;