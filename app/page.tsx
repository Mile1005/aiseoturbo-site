"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HomePage() {
	const heroRef = useRef(null);
	const featuresRef = useRef(null);
	const statsRef = useRef(null);
	
	const heroInView = useInView(heroRef, { once: true });
	const featuresInView = useInView(featuresRef, { once: true });
	const statsInView = useInView(statsRef, { once: true });

	return (
		<>
			{/* Hero Section - Exact Serpstat Style */}
			<section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30" />
					<div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-100 rounded-full blur-3xl opacity-30" />
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-20" />
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
							<span className="text-blue-600">search marketing</span>{' '}
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
						
						{/* Search Input - Exact Serpstat Style */}
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="flex items-center justify-center max-w-2xl mx-auto"
						>
							<div className="relative w-full">
								<input 
									type="text" 
									placeholder="Enter domain, keyword or URL here" 
									className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
								/>
								<button className="absolute right-2 top-2 px-8 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
									Search
								</button>
							</div>
						</motion.div>

						{/* Trust Indicators - Exact Serpstat Style */}
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

			{/* Marketing Tools Section - Exact Serpstat Style */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[
								{
									title: "Competitors analysis",
									description: "Find out who your real search competitors are",
									features: [
										"Get traffic, visibility, number of backlinks, and other SEO metrics",
										"Unveil hidden keyword opportunities based on competitors' keywords",
										"Check the ads of your competitors to speed up PPC campaign creation"
									],
									color: "blue"
								},
								{
									title: "Site audit",
									description: "Use detailed recommendations to improve your website without an SEO agency",
									features: [
										"Sort out technical issues on your site by their priority",
										"Schedule automatic checks and monitor if the number of issues found is decreasing",
										"Track the growth dynamics of the site optimization level"
									],
									color: "green"
								},
								{
									title: "Keyword research",
									description: "Fast keywords research on any topic",
									features: [
										"Keywords from 230 countries in Google with keyword difficulty, search volume, and cost per click in one tool",
										"Plan a budget and select only effective keywords for running ads with analyzing keywords PPC metrics"
									],
									color: "purple"
								}
							].map((tool, index) => (
								<motion.div 
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
									transition={{ duration: 0.8, delay: index * 0.2 }}
									className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
								>
									<h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h3>
									<p className="text-gray-600 mb-6">{tool.description}</p>
									<ul className="space-y-3 text-left">
										{tool.features.map((feature, i) => (
											<li key={i} className="flex items-start gap-3">
												<div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-gray-600 text-sm">{feature}</span>
											</li>
										))}
									</ul>
									<div className="mt-6">
										<a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
											Get access with no charges →
										</a>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Stats Section - Exact Serpstat Style */}
			<section className="py-20 bg-white">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
									className="text-center"
								>
									<div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
									<div className="text-gray-600">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Final CTA Section - Exact Serpstat Style */}
			<section className="py-20 bg-blue-600">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
								className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
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


