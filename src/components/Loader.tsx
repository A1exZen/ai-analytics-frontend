import { motion } from "framer-motion";

export const Loader = () => {
	return (
		<motion.div
			className='fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-500/90'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className='spinner'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</motion.div>
	);
};
