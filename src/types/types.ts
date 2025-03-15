// Оставляем PageSpeed без изменений
export interface PageSpeedMetrics {
	serverResponseTime: string;
	totalByteWeight: string;
	speedIndex: string;
	firstContentfulPaint: string;
	largestContentfulPaint: string;
	totalBlockingTime: string;
	interactive: string;
	firstMeaningfulPaint: string;
	cumulativeLayoutShift: string;
	usesOptimizedImages: string;
	networkRTT: string;
}

export interface PageSpeed {
	performance: number;
	metrics: PageSpeedMetrics;
}

// Типы для OpenAIAnalysis, адаптированные под новый JSON
export interface OpenAIAnalysisMobileOptimization {
	score: number;
	status: string;
}

export interface OpenAIAnalysisAverageLoadingSpeed {
	milliseconds: number;
	notes: string;
}

export interface OpenAIAnalysisSslCertificate {
	status: string;
	security_measures: string;
}

export interface OpenAIAnalysisSeoScore {
	score: number;
	keywords: string;
	meta_tags: string;
	description: string;
	structure: string;
}

export interface OpenAIAnalysisLinks {
	internal_links: number;
	external_links: number;
}

export interface OpenAIAnalysisAccessibility {
	score: number;
	alt_tags: string;
	aria_labels: string;
	keyboard_navigation: string;
}

export interface OpenAIAnalysisBounceRate {
	percentage: number;
	reason: string;
}

export interface OpenAIAnalysisTrafficDistribution {
	direct: number;
	social: number;
	referral: number;
	organic: number;
	paid: number;
}

export interface OpenAIAnalysisTrafficGeography {
	russia: number;
	usa: number;
	europe: number;
	asia: number;
	other: number;
}

export interface OpenAIAnalysisTrafficTrends {
	growth_percentage: number;
	notes: string;
}

export interface OpenAIAnalysisPerformanceScores {
	mobile: number;
	desktop: number;
}

export interface OpenAIAnalysisQualityOfContent {
	uniqueness: string;
	relevance: string;
}

export interface OpenAIAnalysisUserEngagementMetrics {
	average_time_on_site: number;
	page_views_per_session: number;
	conversion_rate: number;
	user_paths: string;
}

export interface OpenAIAnalysisDeviceDistribution {
	mobile: number;
	desktop: number;
	tablet: number;
}

export interface OpenAIAnalysisBacklinks {
	quantity: number;
	quality: string;
}

export interface OpenAIAnalysisSecurityVulnerabilities {
	xss: string;
	csrf: string;
}

export interface OpenAIAnalysisPageSize {
	kilobytes: number;
	notes: string;
}

export interface OpenAIAnalysisServerResponseTime {
	milliseconds: number;
	notes: string;
}

export interface OpenAIAnalysisRecommendations {
	performance: string;
	seo: string;
	accessibility: string;
	security: string;
	content_quality: string;
	traffic: string;
}

export interface OpenAIAnalysis {
	url: string;
	purpose: string;
	primary_content_type: string;
	mobile_optimization: OpenAIAnalysisMobileOptimization;
	average_loading_speed: OpenAIAnalysisAverageLoadingSpeed;
	ssl_certificate: OpenAIAnalysisSslCertificate;
	seo_score: OpenAIAnalysisSeoScore;
	links: OpenAIAnalysisLinks;
	accessibility: OpenAIAnalysisAccessibility;
	bounce_rate: OpenAIAnalysisBounceRate;
	traffic_distribution: OpenAIAnalysisTrafficDistribution;
	traffic_geography: OpenAIAnalysisTrafficGeography;
	traffic_trends: OpenAIAnalysisTrafficTrends;
	traffic_seasonality: string;
	performance_scores: OpenAIAnalysisPerformanceScores;
	quality_of_content: OpenAIAnalysisQualityOfContent;
	domain_authority: number;
	user_engagement_metrics: OpenAIAnalysisUserEngagementMetrics;
	device_distribution: OpenAIAnalysisDeviceDistribution;
	backlinks: OpenAIAnalysisBacklinks;
	content_freshness: string;
	security_vulnerabilities: OpenAIAnalysisSecurityVulnerabilities;
	tech_stack: string;
	page_size: OpenAIAnalysisPageSize;
	competitors: string;
	market_share: number;
	social_mentions: number;
	domain_age: number;
	server_response_time: OpenAIAnalysisServerResponseTime;
	recommendations: OpenAIAnalysisRecommendations;
}

export interface Data {
	pageSpeed: PageSpeed;
	openAIAnalysis: OpenAIAnalysis;
}