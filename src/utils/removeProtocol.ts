export function removeProtocol(url: string): string {
	return url.replace(/^(https?:\/\/)?(www\.)?/, '');
}