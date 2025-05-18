import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useUserStore from "@/zustand/useUserStore";

const CTASection: React.FC = () => {
	const { user } = useUserStore();

	return (
		<motion.section
			className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}
		>
			<div className="relative bg-cyan-300 text-gray-900 rounded-3xl p-10 shadow-xl border-4 border-gray-200">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
					<div className="mb-6 md:mb-0 md:max-w-[60%]">
						<h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
							Готовы улучшить свой интернет-магазин?
						</h2>
						<p className="text-gray-800 text-sm md:text-base">
							Начните с бесплатного анализа и получите профессиональные рекомендации
							по улучшению вашего сайта.
						</p>
					</div>
					<div className="w-full md:w-auto">
						<Link
							to={user ? "/analytics" : "/sign-up/register"}
							className="flex items-center justify-between gap-4 bg-gray-900 text-white rounded-2xl px-6 py-4 text-lg font-semibold hover:bg-gray-800 transition-all w-full md:w-fit"
						>
							{user ? "Начать анализ" : "Попробовать бесплатно"}
							<ArrowRight className="w-5 h-5" />
						</Link>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default CTASection;
