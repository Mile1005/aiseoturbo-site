import { DefaultSeoProps } from 'next-seo';

export const defaultSeo: DefaultSeoProps = {
	titleTemplate: '%s | AISEO Turbo',
	defaultTitle: 'AISEO Turbo',
	description: 'Premium SEO automation and insights for modern teams.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'AISEO Turbo',
		images: [
			{
				url: '/api/og?title=AISEO%20Turbo',
				width: 1200,
				height: 630,
				alt: 'AISEO Turbo',
			},
		],
	},
	twitter: {
		cardType: 'summary_large_image',
		handle: '@aiseoturbo',
		site: '@aiseoturbo',
	},
};


