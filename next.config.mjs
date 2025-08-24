/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	experimental: {
		optimizePackageImports: ['react', 'react-dom'],
	},
	async rewrites() {
		// Use environment variable for backend URL, fallback to localhost for development
		const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
		return [
			{
				source: '/api/:path*',
				destination: `${backendUrl}/api/:path*`,
			},
		];
	},
	// Add headers for better caching and security
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
				],
			},
			{
				source: '/api/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-store, max-age=0',
					},
				],
			},
		];
	},
};

export default nextConfig;


