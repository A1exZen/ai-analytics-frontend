export function getRootUrl(fullUrl: string): string {
	try {
		const url = new URL(fullUrl);

		return `${url.protocol}//${url.host}`;
	} catch (error) {
		console.error("Invalid URL:", error);
		throw new Error("The provided string is not a valid URL.");
	}
}
