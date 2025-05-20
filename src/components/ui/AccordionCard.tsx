import { motion } from "framer-motion";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

interface AccordionCardProps {
	title: string;
	text: string;
	important?: boolean;
}

export const AccordionCard: React.FC<AccordionCardProps> = ({ title, text, important = false }) => {
	const [open, setOpen] = React.useState(false);

	const accordionAnimation = {
		initial: { height: 0, opacity: 0 },
		animate: { height: "auto", opacity: 1 },
		exit: { height: 0, opacity: 0 },
		transition: { duration: 0.3 },
	};

	const handleOpen = () => setOpen((prev) => !prev);

	return (
		<div className="mb-2 rounded-lg border border-gray-100 dark:border-gray-600 px-4">

			<div
				onClick={handleOpen}
				className={`border-b-0 transition-colors cursor-pointer py-4 flex justify-between items-center ${
					open ? "text-blue-500 hover:text-blue-700" : "text-gray-900 dark:text-gray-100"
				}`}
			>
				<div className={`flex items-center gap-2 ${!important && "ml-8"}`}>
					{important && <CiStar className="fill-amber-600" />}
					<div>{title}</div>
				</div>
				<FaRegQuestionCircle
					className={`fill-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
				/>
			</div>

			<motion.div
				initial="initial"
				animate={open ? "animate" : "initial"}
				exit="exit"
				variants={accordionAnimation}
				className="overflow-hidden"
			>
				<div className="pb-4 text-base font-normal">{text}</div>
			</motion.div>
		</div>
	);
};