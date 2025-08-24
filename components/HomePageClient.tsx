"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function HomePageClient() {
	const heroRef = useRef(null);
	const featuresRef = useRef(null);
	const statsRef = useRef(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [activeTab, setActiveTab] = useState(0);
	
	const heroInView = useInView(heroRef, { once: true });
	const featuresInView = useInView(featuresRef, { once: true });
	const statsInView = useInView(statsRef, { once: true });

	const handleSearch = () => {
		if (searchQuery.trim()) {
			window.location.href = `/seo-audit?url=${encodeURIComponent(searchQuery)}`;
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const tools = [
		{
			id: 0,
			title: "Competitors analysis",
			description: "Find out who your real search competitors are",
			features: [
				"Get traffic, visibility, number of backlinks, and other SEO metrics",
				"Unveil hidden keyword opportunities based on competitors' keywords",
				"Check the ads of your competitors to speed up PPC campaign creation"
			],
			gradient: "from-blue-500 to-indigo-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			)
		},
		{
			id: 1,
			title: "Site audit",
			description: "Use detailed recommendations to improve your website without an SEO agency",
			features: [
				"Sort out technical issues on your site by their priority",
				"Schedule automatic checks and monitor if the number of issues found is decreasing",
				"Track the growth dynamics of the site optimization level"
			],
			gradient: "from-green-500 to-emerald-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			)
		},
		{
			id: 2,
			title: "Keyword research",
			description: "Fast keywords research on any topic",
			features: [
				"Keywords from 230 countries in Google with keyword difficulty, search volume, and cost per click in one tool",
				"Plan a budget and select only effective keywords for running ads with analyzing keywords PPC metrics"
			],
			gradient: "from-purple-500 to-pink-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			)
		},
		{
			id: 3,
			title: "Rank Tracker",
			description: "Monitor your keyword positions with real-time updates",
			features: [
				"Track keyword positions across multiple search engines",
				"Get alerts when your rankings change",
				"Analyze ranking trends and competitor movements"
			],
			gradient: "from-orange-500 to-red-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
				</svg>
			)
		},
		{
			id: 4,
			title: "API & Data Solutions",
			description: "Access our comprehensive SEO data through powerful APIs",
			features: [
				"Get access to our complete database through RESTful APIs",
				"Real-time data updates and comprehensive documentation",
				"Scalable solutions for enterprise-level applications"
			],
			gradient: "from-indigo-500 to-blue-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
			)
		}
	];

	return (
		<>
			{/* Hero Section - Enhanced with Beautiful Backgrounds */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Beautiful Background Elements */}
				<div className="absolute inset-0">
					{/* Gradient Background */}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
					
					{/* Animated Floating Shapes */}
					<motion.div 
						className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"
						animate={{ 
							x: [0, 100, 0],
							y: [0, -50, 0],
						}}
						transition={{ 
							duration: 20, 
							repeat: Infinity, 
							ease: "linear" 
						}}
					/>
					<motion.div 
						className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"
						animate={{ 
							x: [0, -80, 0],
							y: [0, 60, 0],
						}}
						transition={{ 
							duration: 25, 
							repeat: Infinity, 
							ease: "linear" 
						}}
					/>
					<motion.div 
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-10"
						animate={{ 
							scale: [1, 1.2, 1],
							opacity: [0.1, 0.2, 0.1],
						}}
						transition={{ 
							duration: 15, 
							repeat: Infinity, 
							ease: "easeInOut" 
						}}
					/>
					
					{/* Subtle Grid Pattern */}
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:24px_24px]" />
				</div>

				<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						ref={heroRef}
						initial={{ opacity: 0, y: 20 }}
						animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<motion.h1 
							initial={{ opacity: 0, y: 20 }}
							animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight"
						>
							Speed up{' '}
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								search marketing
							</span>{' '}
							goals achievement
						</motion.h1>
						
						<motion.p 
							initial={{ opacity: 0, y: 20 }}
							animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
						>
							Start your analysis for free
						</motion.p>
						
						{/* Enhanced Search Input with Working Button */}
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="flex items-center justify-center max-w-2xl mx-auto"
						>
							<div className="relative w-full">
								<input 
									type="text" 
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Enter domain, keyword or URL here" 
									className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
								/>
								<button 
									onClick={handleSearch}
									className="absolute right-2 top-2 px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
								>
									Search
								</button>
							</div>
						</motion.div>

						{/* Enhanced Trust Indicators */}
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="flex items-center justify-center gap-8 text-sm text-gray-500"
						>
							<div className="flex items-center gap-2">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
								<span>Based on 600+ reviews</span>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600">G2</div>
								<div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600">C</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Interactive Tabbed Slider Section */}
			<section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.05)_1px,transparent_0)] bg-[length:32px_32px]" />
				
				<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						ref={featuresRef}
						initial={{ opacity: 0, y: 20 }}
						animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.8 }}
						className="text-center space-y-16"
					>
						<div className="space-y-4">
							<h2 className="text-4xl font-bold text-gray-900">
								Marketing tools to speed up SEO tasks
							</h2>
						</div>
						
						{/* Interactive Tabbed Slider */}
						<div className="w-full">
							{/* Tab Navigation */}
							<div className="relative mb-12">
								<div className="flex justify-center space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100">
									{tools.map((tool, index) => (
										<button
											key={tool.id}
											onClick={() => setActiveTab(index)}
											className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
												activeTab === index
													? 'text-blue-600 opacity-100'
													: 'text-gray-600 opacity-60 hover:opacity-80'
											}`}
										>
											{tool.title}
										</button>
									))}
									
									{/* Animated Underline */}
									<motion.div
										className="absolute bottom-2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
										initial={false}
										animate={{
											width: `${100 / tools.length}%`,
											x: `${(activeTab * 100) / tools.length}%`,
										}}
										transition={{ duration: 0.3, ease: "easeInOut" }}
									/>
								</div>
							</div>

							{/* Tab Content */}
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8"
							>
								<div className="flex items-start gap-6">
									{/* Icon */}
									<div className={`w-16 h-16 bg-gradient-to-r ${tools[activeTab].gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
										{tools[activeTab].icon}
									</div>
									
									{/* Content */}
									<div className="flex-1">
										<h3 className="text-2xl font-bold text-gray-900 mb-4">{tools[activeTab].title}</h3>
										<p className="text-gray-600 mb-6">{tools[activeTab].description}</p>
										
										<ul className="space-y-3">
											{tools[activeTab].features.map((feature, i) => (
												<li key={i} className="flex items-start gap-3">
													<div className={`w-2 h-2 bg-gradient-to-r ${tools[activeTab].gradient} rounded-full mt-2 flex-shrink-0`}></div>
													<span className="text-gray-600">{feature}</span>
												</li>
											))}
										</ul>
										
										<div className="mt-8">
											<a href="#" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
												Get access with no charges →
											</a>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Enhanced Stats Section */}
			<section className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(147,51,234,0.05)_1px,transparent_0)] bg-[length:40px_40px]" />
				
				<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						ref={statsRef}
						initial={{ opacity: 0, y: 20 }}
						animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.8 }}
						className="text-center space-y-12"
					>
						<div className="space-y-4">
							<h2 className="text-4xl font-bold text-gray-900">
								USE the right data
							</h2>
						</div>
						
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
							{[
								{ value: "1.50B", label: "Domains" },
								{ value: "8.62B", label: "Keywords" },
								{ value: "529B", label: "Backlinks" },
								{ value: "5.6B", label: "Keywords suggestions" },
								{ value: "230", label: "Countries" },
								{ value: "2.21B", label: "Google SERPs" }
							].map((stat, index) => (
								<motion.div 
									key={index}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									className="text-center group"
								>
									<div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
										<div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
										<div className="text-gray-600">{stat.label}</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Enhanced Final CTA Section */}
			<section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
					<div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
				</div>
				
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<h2 className="text-4xl font-bold text-white">
							Try all paid features during 7 days for free
						</h2>
						<div>
							<a 
								href="https://app.aiseoturbo.com/signup" 
								className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								Get access with no charges
							</a>
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
