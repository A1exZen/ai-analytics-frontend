export function getRootUrl(fullUrl: string): string {
	try {
		// Создаем объект URL
		const url = new URL(fullUrl);

		// Формируем корневой URL: протокол + домен
		return `${url.protocol}//${url.host}`;
	} catch (error) {
		console.error("Invalid URL:", error);
		throw new Error("The provided string is not a valid URL.");
	}
}
