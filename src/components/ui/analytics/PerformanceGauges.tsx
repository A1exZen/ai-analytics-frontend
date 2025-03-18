import React, {useState} from "react";
import GaugeChart from "react-gauge-chart";

interface IPerfomanceItem {
	x: "Mobile" | "Desktop";
	y: number;
}

interface IPerformanceGaugesProps {
	performanceData: IPerfomanceItem[];
}

const PerformanceGauges: React.FC<IPerformanceGaugesProps> = ({
	                                                              performanceData,
                                                              }) => {
	const [selectedDevice, setSelectedDevice] = useState<"All" | "Mobile" | "Desktop">("All");

	const filteredData =
		selectedDevice === "All"
			? performanceData
			: performanceData.filter((item) => item.x === selectedDevice);

	return (
		<div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col">
			<div className="flex justify-between items-center">
				<h2 className="font-medium text-foreground">Показатели Эффективности</h2>
				<select
					className="border border-gray-300 dark:border-gray-400 text-gray-600 dark:text-gray-200  text-sm rounded-lg py-2 px-2 dark:bg-gray-800"
					value={selectedDevice}
					onChange={(e) => setSelectedDevice(e.target.value as "All" | "Mobile" | "Desktop")}
				>
					<option value="All">Все</option>
					<option value="Mobile">Телефон</option>
					<option value="Desktop">ПК</option>
				</select>
			</div>
			<div className="h-full flex flex-col justify-center gap-6">
				{filteredData.map((item) => (
					<div key={item.x} className="flex flex-col items-center">
						<GaugeChart
							id={`gauge-${item.x}`}
							animate={false}
							nrOfLevels={420}
							arcsLength={[0.3, 0.5, 0.2]}
							colors={["#EA4228", "#F5CD19", "#5BE12C"]}
							arcPadding={0.02}
							percent={item.y / 100}
							textColor="var(--foreground)"
							className="font-bold"
						/>
						<p className="font-bold">{item.x === "Mobile" ? 'Телефон' : 'ПК' }</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default PerformanceGauges;
