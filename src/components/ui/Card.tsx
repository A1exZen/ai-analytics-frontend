import {motion} from "framer-motion";
import React from "react";
import {MdLock} from "react-icons/md";

interface CardProps {
	title: string;
	value: number;
	change: number;
	isPositive: boolean;
	isLocked: boolean;
}

export const Card: React.FC<CardProps> = ({
	                                          title,
	                                          value,
	                                          change,
	                                          isPositive,
	                                          isLocked
                                          }) => {
	return (
		<motion.div
			className={`relative bg-white p-4 rounded-xl shadow-md flex flex-col justify-between gap-5 ${
				isLocked ? "blur-[2px] opacity-50 cursor-not-allowed" : ""
			}`}
			whileHover={!isLocked ? {scale: 1.05} : {}}
			transition={{type: "spring", stiffness: 250}}
		>
			{isLocked && (
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<MdLock size={32} className="text-gray-400"/>
				</div>
			)}
			<h2
				className={`font-medium ${isLocked ? "text-gray-400" : "text-gray-600"}`}>{title}</h2>
			<div className="flex items-center gap-3">
				<p
					className={`text-3xl font-bold ${isLocked ? "text-gray-400" : ""}`}>{value.toLocaleString()}</p>
				<p
					className={`text-sm rounded-md px-2 ${
						isLocked ? "text-gray-400 bg-gray-200" : isPositive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
					}`}
				>
					{isPositive ? "↑" : "↓"} {change.toLocaleString()}
				</p>
			</div>
		</motion.div>
	);
};
