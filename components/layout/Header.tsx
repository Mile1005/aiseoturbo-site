"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
	const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsFeaturesOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const features = [
		{
			title: "SEO Audit",
			description: "Find and fix on-site issues to boost your Google rankings",
			href: "/seo-analyzer",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			gradient: "from-green-500 to-emerald-500"
		},
		{
			title: "Keyword Research",
			description: "Pick the right keywords for SEO and PPC campaigns",
			href: "/features/keyword-research",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			),
			gradient: "from-purple-500 to-pink-500"
		},
		{
			title: "Competitors Analysis",
			description: "Analyze competitors' sites in SEO and PPC strategy",
			href: "/features/competitors-analysis",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			),
			gradient: "from-blue-500 to-indigo-500"
		},
		{
			title: "API & Data Solutions",
			description: "The best-cost-efficient API SEO data provider",
			href: "/features/api-solutions",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
			),
			gradient: "from-indigo-500 to-blue-500"
		}
	];

	return (
		<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2 group">
					<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
						<span className="text-white font-bold text-lg">A</span>
					</div>
					<span className="font-bold text-xl text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
						AISEO Turbo
					</span>
				</Link>
				<nav className="hidden md:flex gap-8 text-sm font-medium">
					{/* Features Dropdown */}
					<div className="relative" ref={dropdownRef}>
						<button
							onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
							className="text-gray-700 hover:text-blue-600 transition-colors relative group flex items-center gap-1"
						>
							Features
							<svg 
								className={`w-4 h-4 transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`} 
								fill="none" 
								stroke="currentColor" 
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
						</button>
						
						{/* Dropdown Menu */}
						{isFeaturesOpen && (
							<div className="absolute top-full left-0 mt-2 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
								<div className="p-4">
									<div className="grid grid-cols-1 gap-2">
										{features.map((feature, index) => (
											<Link
												key={index}
												href={feature.href}
												onClick={() => setIsFeaturesOpen(false)}
												className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/80 transition-all duration-200"
											>
												<div className={`w-10 h-10 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
													{feature.icon}
												</div>
												<div className="flex-1">
													<h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
														{feature.title}
													</h3>
													<p className="text-xs text-gray-600 mt-0.5">
														{feature.description}
													</p>
												</div>
											</Link>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
					
					<Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						Pricing
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
					<Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						Blog
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
					<Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						About
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
					<Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
						Contact
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					<a href="https://app.aiseoturbo.com/signin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
						Sign in
					</a>
					<a href="https://app.aiseoturbo.com/signup" className="inline-flex items-center rounded-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
						Try 7 days for free
					</a>
				</div>
			</div>
		</header>
	);
}


