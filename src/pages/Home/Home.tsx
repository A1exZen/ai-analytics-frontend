import {
	motion,
} from "framer-motion";
import React, { useState, useEffect } from "react";
import PreviewSection from "./components/PreviewSection";
import FeaturesSection from "./components/FeaturesSection";
import AudienceSection from "./components/AudienceSection";
import BenefitsSection from "./components/BenefitsSection";
import ProcessSection from "./components/ProcessSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import HeroSection from "@/pages/Home/components/HeroSection.tsx";

const containerVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home: React.FC = () => {
	const [, setClientsCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setClientsCount((prev) => (prev < 1200 ? prev + 10 : 1200));
		}, 50);
		return () => clearInterval(interval);
	}, []);



	return (
		<>
			<motion.main
				className="mt-15 md:mt-0 pb-10 w-full flex flex-col items-center gap-10 z-10 px-4 sm:px-6 lg:px-8"
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<HeroSection />
				<PreviewSection />
				<div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent max-w-4xl mx-auto md:my-8" />
				<FeaturesSection />
				<div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent max-w-4xl mx-auto my-8" />
				<AudienceSection />
				<div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent max-w-4xl mx-auto my-8" />
				<BenefitsSection />
				<div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent max-w-4xl mx-auto my-8" />
				<ProcessSection />
				<div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent max-w-4xl mx-auto my-8" />
				<FAQSection />
				<div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent max-w-4xl mx-auto my-8" />
				<CTASection />
			</motion.main>
		</>
	);
};

export default Home;