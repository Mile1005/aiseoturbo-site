"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import BrandContainer from '../components/brand/BrandContainer';
import SectionHeading from '../components/brand/SectionHeading';
import LogoStrip from '../components/brand/LogoStrip';
import { fadeUp, rise, stagger } from '../lib/motion';

export default function HomePage() {
	const heroRef = useRef(null);
	const featuresRef = useRef(null);
	const testimonialsRef = useRef(null);
	
	const heroInView = useInView(heroRef, { once: true });
	const featuresInView = useInView(featuresRef, { once: true });
	const testimonialsInView = useInView(testimonialsRef, { once: true });

	return (
		<>
			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Animated Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
					{/* Animated shapes */}
					<motion.div 
						className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
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
						className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
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
				</div>

				<BrandContainer className="relative z-10 text-center space-y-8">
					<motion.div
						ref={heroRef}
						initial="hidden"
						animate={heroInView ? "show" : "hidden"}
						variants={stagger}
						className="space-y-6"
					>
						<motion.h1 
							variants={rise}
							className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
						>
							Turbocharge Your{' '}
							<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
								SEO Strategy
							</span>{' '}
							with AI
						</motion.h1>
						
						<motion.p 
							variants={fadeUp}
							className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
						>
							AI-powered audits, rank tracking, and backlink insights — all in one place.
						</motion.p>
						
						<motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
							<a 
								href="https://app.aiseoturbo.com/signup" 
								className="inline-flex items-center rounded-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								Start Free Audit
							</a>
							<a 
								href="#features" 
								className="inline-flex items-center rounded-full px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
							>
								See Features
							</a>
						</motion.div>
					</motion.div>

					{/* 3D Dashboard Mockup */}
					<motion.div 
						variants={fadeUp}
						className="mt-16 relative"
					>
						<div className="relative">
							<div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
								<div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded w-1/3"></div>
											<div className="flex gap-2">
												<div className="w-3 h-3 bg-green-500 rounded-full"></div>
												<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
												<div className="w-3 h-3 bg-red-500 rounded-full"></div>
											</div>
										</div>
										<div className="grid grid-cols-3 gap-4">
											<div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg p-3">
												<div className="text-xs text-gray-600 dark:text-gray-400">SEO Score</div>
												<div className="text-2xl font-bold text-blue-600">92</div>
											</div>
											<div className="h-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 rounded-lg p-3">
												<div className="text-xs text-gray-600 dark:text-gray-400">Rankings</div>
												<div className="text-2xl font-bold text-green-600">+15</div>
											</div>
											<div className="h-20 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-lg p-3">
												<div className="text-xs text-gray-600 dark:text-gray-400">Backlinks</div>
												<div className="text-2xl font-bold text-purple-600">1.2k</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* Floating elements */}
							<motion.div 
								className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full shadow-lg"
								animate={{ y: [-10, 10, -10] }}
								transition={{ duration: 3, repeat: Infinity }}
							/>
							<motion.div 
								className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full shadow-lg"
								animate={{ y: [10, -10, 10] }}
								transition={{ duration: 4, repeat: Infinity }}
							/>
						</div>
					</motion.div>
				</BrandContainer>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 bg-white dark:bg-gray-900">
				<BrandContainer>
					<motion.div
						ref={featuresRef}
						initial="hidden"
						animate={featuresInView ? "show" : "hidden"}
						variants={stagger}
						className="text-center space-y-12"
					>
						<motion.div variants={fadeUp}>
							<SectionHeading 
								title="All-in-One AI SEO Platform" 
								subcopy="Everything you need to dominate search rankings in one powerful platform."
							/>
						</motion.div>
						
						<motion.div 
							variants={stagger}
							className="grid grid-cols-1 md:grid-cols-3 gap-8"
						>
							<motion.div 
								variants={fadeUp}
								className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-xl transition-all duration-300"
							>
								<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">SEO Audit</h3>
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
									Uncover technical SEO issues with AI-driven audits that provide actionable insights and prioritized fixes.
								</p>
							</motion.div>
							
							<motion.div 
								variants={fadeUp}
								className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200/50 dark:border-green-800/50 hover:shadow-xl transition-all duration-300"
							>
								<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rank Tracking</h3>
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
									Monitor keyword positions with real-time updates and comprehensive analytics to track your SEO progress.
								</p>
							</motion.div>
							
							<motion.div 
								variants={fadeUp}
								className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-xl transition-all duration-300"
							>
								<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Backlink Insights</h3>
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
									Get a snapshot of your link profile and competitors with detailed backlink analysis and growth tracking.
								</p>
							</motion.div>
						</motion.div>
					</motion.div>
				</BrandContainer>
			</section>

			{/* Social Proof Section */}
			<section className="py-20 bg-gray-50 dark:bg-gray-800">
				<BrandContainer>
					<motion.div
						ref={testimonialsRef}
						initial="hidden"
						animate={testimonialsInView ? "show" : "hidden"}
						variants={stagger}
						className="text-center space-y-12"
					>
						<motion.div variants={fadeUp}>
							<SectionHeading 
								title="Trusted by Marketers & Businesses" 
								subcopy="Join thousands of professionals who trust AISEO Turbo for their SEO success."
							/>
						</motion.div>
						
						<motion.div variants={fadeUp} className="mb-12">
							<LogoStrip />
						</motion.div>
						
						<motion.div 
							variants={stagger}
							className="grid grid-cols-1 md:grid-cols-3 gap-8"
						>
							{[
								{
									quote: "AISEO Turbo transformed our SEO strategy. The AI insights are incredibly accurate and actionable.",
									name: "Sarah Johnson",
									title: "Marketing Director",
									company: "TechFlow Inc."
								},
								{
									quote: "Finally, an SEO tool that actually helps you improve rankings, not just track them.",
									name: "Michael Chen",
									title: "SEO Manager",
									company: "GrowthLab"
								},
								{
									quote: "The automated audits save us hours every week. Highly recommended for any serious SEO team.",
									name: "Emily Rodriguez",
									title: "Digital Marketing Lead",
									company: "ScaleUp Agency"
								}
							].map((testimonial, index) => (
								<motion.div 
									key={index}
									variants={fadeUp}
									className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
								>
									<div className="text-gray-600 dark:text-gray-300 mb-6 italic">
										&ldquo;{testimonial.quote}&rdquo;
									</div>
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
											{testimonial.name.charAt(0)}
										</div>
										<div>
											<div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
											<div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}, {testimonial.company}</div>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</BrandContainer>
			</section>

			{/* Final CTA Section */}
			<section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
				<BrandContainer>
					<motion.div
						initial="hidden"
						whileInView="show"
						variants={stagger}
						className="text-center space-y-8"
					>
						<motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
							Ready to Turbocharge Your SEO?
						</motion.h2>
						<motion.p variants={fadeUp} className="text-xl text-gray-300 max-w-2xl mx-auto">
							Join thousands of websites already using AISEO Turbo to dominate search rankings.
						</motion.p>
						<motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
							<a 
								href="https://app.aiseoturbo.com/signup" 
								className="inline-flex items-center rounded-full px-8 py-4 bg-white text-indigo-900 font-semibold text-lg hover:bg-gray-100 transition-colors"
							>
								Start Free Audit
							</a>
							<a 
								href="/pricing" 
								className="inline-flex items-center rounded-full px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
							>
								View Pricing
							</a>
						</motion.div>
					</motion.div>
				</BrandContainer>
			</section>
		</>
	);
}


