import {motion} from "framer-motion";
import React from "react";
import {MdLock} from "react-icons/md";
import {FaRegQuestionCircle} from "react-icons/fa";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

interface CardProps {
	title: string;
	value?: number | string;
	change?: number;
	isPositive?: boolean;
	isLocked: boolean;
	customValue?: React.ReactNode;
	className?: string;
	tooltip?: string;
}

export const Card: React.FC<CardProps> = ({
	                                          title,
	                                          value,
	                                          change,
	                                          isPositive,
	                                          isLocked,
	                                          customValue,
	tooltip,
	                                          className = "",
                                          }) => {
	return (
		<motion.div
			className={`relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between gap-3 ${
				isLocked ? "blur-[2px] opacity-50 cursor-not-allowed" : ""
			} ${className}`}
			whileHover={!isLocked ? {scale: 1.02} : {}}
			transition={{type: "spring", stiffness: 250}}
		>
			{isLocked && (
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<MdLock size={32} className="text-gray-400"/>
				</div>
			)}
			<div className='flex justify-between'>
				<h2
					className={`font-medium ${isLocked ? "text-gray-400" : "text-gray-600 dark:text-gray-200"}`}>{title}</h2>
				{
					tooltip && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger><FaRegQuestionCircle className='fill-gray-500 w-5 h-5'/></TooltipTrigger>
								<TooltipContent className='text-xl'>
									{tooltip}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>


					)
				}
			</div>
			<div className="flex items-center gap-3">
				{value && <p
					className={`text-3xl font-bold text-gray-700 dark:text-gray-200 ${isLocked ? "text-gray-400" : ""}`}>{value.toLocaleString()}</p>}
				{customValue && <div className="text-sm">{customValue}</div>}
				{change && (
					<p
						className={`text-sm rounded-md px-2 ${
							isLocked ? "text-gray-500 bg-gray-200" : isPositive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
						}`}
					>
						{isPositive ? "↑" : "↓"} {change.toLocaleString()}
					</p>
				)}
			</div>
		</motion.div>
	);
};
