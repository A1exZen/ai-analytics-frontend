import React, {useState} from "react";
import {VictoryLegend, VictoryPie, VictoryTooltip} from "victory";

interface ITrafficItem {
	x: string;
	y: number;
}

const COLORS = ["#0088FE", "#00C49F", "#ff8528", "#8b5eda", "#da5e73"];

interface ITrafficTypeProps {
	trafficData: ITrafficItem[];
	deviceData: ITrafficItem[];
}

const TrafficType: React.FC<ITrafficTypeProps> = ({
	                                                  trafficData,
	                                                  deviceData
                                                  }) => {
	const [selectedFilter, setSelectedFilter] = useState<"Traffic" | "Devices">("Traffic");

	// Выбираем данные в зависимости от фильтра
	const filteredData = selectedFilter === "Traffic" ? trafficData : deviceData;

	return (
		<div
			className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between items-center">
			<div className="flex justify-between items-center w-full">
				<h2 className="font-medium text-gray-600 dark:text-gray-200">
					Тип Трафика
				</h2>
				<select
					className="border dark:bg-gray-800 border-gray-300 dark:border-gray-400 text-gray-600 dark:text-gray-200 text-sm rounded-lg py-2 px-2"
					value={selectedFilter}
					onChange={(e) => setSelectedFilter(e.target.value as "Traffic" | "Devices")}
				>
					<option value="Traffic">Источник трафика</option>
					<option value="Devices">Устройства</option>
				</select>
			</div>
			<div className="w-full flex flex-col justify-center items-center">
				<VictoryPie
					data={filteredData}
					innerRadius={90}
					padAngle={3}
					colorScale={COLORS}
					labels={({datum}) => `${datum.x}: ${datum.y}%`}
					labelComponent={<VictoryTooltip style={{fill: "#fff"}}
					                                flyoutStyle={{fill: "#333"}}/>}
				/>
					<VictoryLegend
						orientation="horizontal"
						itemsPerRow={3}
						height={70}
						gutter={20}
						style={{labels: {fontSize: 16, fill: "var(--foreground)"}, }}
						data={filteredData.map((d, i) => ({
							name: d.x,
							symbol: {fill: COLORS[i]},
						}))}
					/>
			</div>
		</div>
	);
};

export default TrafficType;