import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';
import Providers from './providers';
import { Inter } from 'next/font/google';
import Analytics from '../components/Analytics';
import SkipLink from '../components/layout/SkipLink';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollProgress from '../components/layout/ScrollProgress';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AISEO Turbo',
	description: 'Premium SEO automation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ScrollProgress />
				<SkipLink />
				<Header />
				<Providers>
					<main id="content">{children}</main>
				</Providers>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}


