import { DefaultSeoProps } from 'next-seo';

export const defaultSeo: DefaultSeoProps = {
	titleTemplate: '%s | AISEO Turbo',
	defaultTitle: 'AISEO Turbo - AI-Powered SEO Audit Tool',
	description: 'Free AI-powered SEO audit tool with comprehensive analysis, technical recommendations, accessibility checks, and actionable insights for better search rankings.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'AISEO Turbo',
		images: [
			{
				url: '/api/og?title=AI-Powered%20SEO%20Audit%20Tool',
				width: 1200,
				height: 630,
				alt: 'AISEO Turbo - AI-Powered SEO Audit Tool',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		handle: '@aiseoturbo',
		site: '@aiseoturbo',
	},
};


