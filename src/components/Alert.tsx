import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface AlertProps {
	message: string;
	type: "success" | "error" | "info";
	onClose: () => void;
	autoClose?: boolean;
	duration?: number;
}

const Alert: React.FC<AlertProps> = ({
	message,
	type,
	onClose,
	autoClose = true,
	duration = 3000,
}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (autoClose) {
			timer = setTimeout(() => {
				setVisible(false);
				onClose();
			}, duration);
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [autoClose, duration, onClose]);

	const alertColors = {
		success: "bg-green-100 text-green-800",
		error: "bg-red-100 text-red-800",
		info: "bg-blue-100 text-blue-800",
	};

	const handleClose = () => {
		setVisible(false);
		setTimeout(onClose, 300);
	};

	if (!visible) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ x: -50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -50, opacity: 0 }}
				transition={{ duration: 0.3 }}
				className={`fixed top-4 left-4 px-6 py-3 rounded-xl shadow-lg ${alertColors[type]} z-50`}
			>
				<div className='flex items-center justify-between'>
					<span>{message}</span>
					<button
						onClick={handleClose}
						className='ml-4 text-lg font-bold focus:outline-hidden'
					>
						&times;
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Alert;
