export const metricsData = [
	{
		id: "1",
		title: "Кол-во посещений",
		value: "23,351",
		change: 1137,
		isPositive: false
	},
	{
		id: "2",
		title: "Среднее время сессии",
		value: "92.19",
		unit: "min",
		change: 0.15,
		isPositive: true
	},
	{
		id: "3",
		title: "Показатель отказов",
		value: "45.67%",
		change: 0.5,
		isPositive: false
	},
	{
		id: "4",
		title: "Кол-во просмотров страниц",
		value: "536,12",
		change: 1137,
		isPositive: true
	},
];
function generateRandomChartData(period) {
	const data = [];
	let startDate = new Date();

	for (let i = 0; i < 30; i++) {
		// Форматируем дату в формате ДД.ММ
		const day = String(startDate.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
		const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Получаем месяц и добавляем ведущий ноль
		const formattedDate = `${day}.${month}`; // Форматируем дату в нужном виде

		data.push({
			date: formattedDate,
			value: Math.floor(Math.random() * 100) + 1
		});

		startDate.setDate(startDate.getDate() - 1); // Уменьшаем дату на 1 день
	}
	return data;
}

// Генерация случайных данных для тепловой карты
function generateRandomHeatmapData() {
	return {
		"Home": Math.floor(Math.random() * 100),
		"Product": Math.floor(Math.random() * 100),
		"Checkout": Math.floor(Math.random() * 100),
		"About": Math.floor(Math.random() * 100),
		"Contact": Math.floor(Math.random() * 100)
	};
}
// Генерация случайных данных для поведения пользователей
function generateRandomBehaviorData() {
	const stages = ["Landing Page", "Product Page", "Cart", "Checkout"];
	const data = [];
	stages.forEach((stage, index) => {
		data.push({
			stage: stage,
			users: Math.floor(Math.random() * 1000) + 1
		});
	});
	return data;
}

function generateRandomMapData(countries) {
	return countries.map(country => ({
		...country,
		visits: Math.floor(Math.random() * 10000) + 1000
	}));
}

// Моковые данные для аналитики сайта
export const mockData = {
	// Основные метрики
	traffic: {
		value: 52345, // Общее количество посещений
		growth: 12, // Прирост по сравнению с прошлым месяцем
		chart: generateRandomChartData('week') // График за неделю
	},
	bounceRate: {
		value: 45.3, // Показатель отказов (%)
		growth: -5, // Прирост (или снижение) по сравнению с прошлым месяцем
		chart: generateRandomChartData('month') // График за месяц
	},
	timeOnSite: {
		value: 3.2, // Среднее время на сайте (в минутах)
		growth: 10, // Прирост по сравнению с прошлым месяцем
		chart: generateRandomChartData('year') // График за год
	},
	conversions: {
		value: 1234, // Конверсии (регистрации, покупки)
		growth: 8, // Прирост по сравнению с прошлым месяцем
		chart: generateRandomChartData('week') // График по типам конверсий
	},
	trafficSources: {
		organic: 60, // Процент органического трафика
		direct: 20, // Процент прямого трафика
		referral: 10, // Процент реферального трафика
		social: 10, // Процент трафика с соцсетей
		chart: generateRandomChartData('month') // График источников трафика (Pie Chart)
	},
	pagesPerSession: {
		value: 5.6, // Страниц на сессию
		growth: 4, // Прирост по сравнению с прошлым месяцем
		chart: generateRandomChartData('month') // График
	},
	pageSpeed: {
		value: 2.1, // Скорость загрузки (в секундах)
		chart: generateRandomChartData('week') // График скорости загрузки
	},

	// Дополнительные метрики
	uniqueVisitors: {
		value: 30234, // Уникальные посетители
		growth: 15, // Прирост по сравнению с прошлым месяцем
		chart: generateRandomChartData('month') // График за месяц
	},
	seoRanking: {
		value: 18, // Позиции в поисковой выдаче
		growth: 2, // Прирост позиций
		chart: generateRandomChartData('month') // График позиций (Line Chart)
	},
	userEngagement: {
		value: 0.75, // Средний уровень вовлеченности (например, клик / просмотр)
		growth: 5, // Прирост по сравнению с прошлым месяцем
		chart: generateRandomChartData('month') // График вовлеченности
	},
	subscribers: {
		value: 1234, // Количество подписчиков
		growth: 8, // Прирост по сравнению с прошлым месяцем
		chart: generateRandomChartData('week') // График подписок
	},
	errorRate: {
		value: 1.2, // Количество ошибок (например, 404 или 500)
		chart: generateRandomChartData('month') // График ошибок
	},

	// Премиум метрики
	heatmap: {
		chart: generateRandomHeatmapData() // Тепловая карта
	},
	pageSpeedByPage: {
		data: [
			{ page: 'Home', speed: 2.3 },
			{ page: 'Product', speed: 1.9 },
			{ page: 'Checkout', speed: 3.5 }
		], // Время загрузки каждой страницы
		chart: generateRandomChartData('year') // График по страницам
	},
	audienceSegmentation: {
		male: 60, // Процент мужчин
		female: 40, // Процент женщин
		chart: generateRandomChartData('month') // Сегментация аудитории
	},
	userBehavior: {
		chart: generateRandomBehaviorData() // Потведение пользоваелей (Flow Chart)
	},
	competitorSeoRanking: {
		competitors: [
			{ name: 'Competitor A', rank: 15 },
			{ name: 'Competitor B', rank: 20 },
			{ name: 'Competitor C', rank: 12 }
		], // Позиции конкурентов
		chart: generateRandomChartData('month') // График конкурентов
	},
	mobileUserBehavior: {
		mobile: 70, // Процент мобильных пользователей
		desktop: 30, // Процент десктопных пользователей
		// chart: generateRandomChartData('month') // Мобильное поведение
	},
	visitMap: {
		countries: [
			{ name: "United States", visits: 14523, lat: 37.0902, lon: -95.7129 },  // Пример для США
			{ name: "Germany", visits: 9321, lat: 51.1657, lon: 10.4515 },  // Германия
			{ name: "India", visits: 8531, lat: 20.5937, lon: 78.9629 },  // Индия
			{ name: "Brazil", visits: 7210, lat: -14.2350, lon: -51.9253 },  // Бразилия
			{ name: "United Kingdom", visits: 5420, lat: 51.5074, lon: -0.1278 },  // Великобритания
			{ name: "Australia", visits: 4621, lat: -25.2744, lon: 133.7751 },  // Австралия
		],
		chart: generateRandomMapData([
			{ name: "United States", visits: 14523, lat: 37.0902, lon: -95.7129 },
			{ name: "Germany", visits: 9321, lat: 51.1657, lon: 10.4515 },
			{ name: "India", visits: 8531, lat: 20.5937, lon: 78.9629 },
			{ name: "Brazil", visits: 7210, lat: -14.2350, lon: -51.9253 },
			{ name: "United Kingdom", visits: 5420, lat: 51.5074, lon: -0.1278 },
			{ name: "Australia", visits: 4621, lat: -25.2744, lon: 133.7751 },
		]) // Используем функцию с передачей данных
	}
};

// Генерация случайных данных для графиков (для моков)


// Пример доступа к данным:
// console.log(mockData.traffic.value);  // Количество трафика
// console.log(mockData.traffic.chart);  // График трафика за неделю
