import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';
import Providers from './providers';
import { Inter } from 'next/font/google';
import Analytics from '../components/Analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AISEO Turbo',
	description: 'Premium SEO automation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}


