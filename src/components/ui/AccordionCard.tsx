import {Accordion, AccordionHeader} from "@material-tailwind/react";
import {motion} from "framer-motion";
import React from "react";
import {FaRegQuestionCircle} from "react-icons/fa";
import {CiStar} from "react-icons/ci";

export const AccordionCard = ({title, text, important}) => {
	const [open, setOpen] = React.useState(null);
	const accordionAnimation = {
		initial: {height: 0, opacity: 0},
		animate: {height: "auto", opacity: 1},
		exit: {height: 0, opacity: 0},
		transition: {duration: 0.3},
	};
	const handleOpen = (value) => setOpen(open === value ? 0 : value);
	return (
		<>
			<Accordion open={open === 1}
			           className="mb-2 rounded-lg border border-gray-100 dark:border-gray-600 px-4">
				<AccordionHeader
					onClick={() => handleOpen(1)}
					className={`border-b-0 transition-colors ${
						open === 1 ? "text-blue-500 hover:text-blue-700!" : ""
					}`}
				>
					<div className='w-full flex justify-between items-center'>
						<div className={`flex items-center gap-2 ${!important && "ml-8"}`}>
							{important && <CiStar className='fill-amber-600'/>}
							<div>{title}</div>
						</div>
						<FaRegQuestionCircle className='fill-gray-500'/>
					</div>


				</AccordionHeader>
				<motion.div
					initial="initial"
					animate={open === 1 ? "animate" : "initial"}
					exit="exit"
					variants={accordionAnimation}
					className="overflow-hidden"
				>
					<div className="pb-4 text-base font-normal">{text}</div>
				</motion.div>
			</Accordion>
		</>
	);
};
