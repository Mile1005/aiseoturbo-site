"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface CompetitorData {
	competitors: Array<{
		domain: string;
		overall_score: number;
		title_meta_score: number;
		headings_score: number;
		content_score: number;
		structure_score: number;
		backlinks_count: number;
		domain_authority: number;
		organic_keywords: number;
		organic_traffic: number;
		comparison: {
			better_than_your_site: string[];
			worse_than_your_site: string[];
		};
	}>;
	your_site: {
		domain: string;
		overall_score: number;
		title_meta_score: number;
		headings_score: number;
		content_score: number;
		structure_score: number;
		backlinks_count: number;
		domain_authority: number;
		organic_keywords: number;
		organic_traffic: number;
	};
	analysis: {
		strengths: string[];
		weaknesses: string[];
		opportunities: string[];
		recommendations: string[];
	};
}

interface AnalysisResult {
	status: 'idle' | 'loading' | 'success' | 'error';
	data?: CompetitorData;
	error?: string;
}

function CompetitorAnalysisContent() {
	const searchParams = useSearchParams();
	const [url, setUrl] = useState('');
	const [competitors, setCompetitors] = useState('');
	const [analysisResult, setAnalysisResult] = useState<AnalysisResult>({ status: 'idle' });

	// Pre-fill URL from query parameters
	useEffect(() => {
		if (searchParams) {
			const urlParam = searchParams.get('url');
			if (urlParam) {
				setUrl(urlParam);
			}
		}
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!url.trim() || !competitors.trim()) return;

		setAnalysisResult({ status: 'loading' });

		try {
			// Start competitor analysis
			const response = await fetch('/api/competitor-analysis', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					url: url.trim(),
					competitors: competitors.split(',').map(c => c.trim()),
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to analyze competitors');
			}

			const data = await response.json();
			setAnalysisResult({ status: 'success', data });

		} catch (error) {
			console.error('Error analyzing competitors:', error);
			setAnalysisResult({ 
				status: 'error', 
				error: 'Failed to analyze competitors. Please try again.' 
			});
		}
	};

	const formatScore = (score: number) => {
		if (score >= 90) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
		if (score >= 70) return { text: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
		if (score >= 50) return { text: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100' };
		return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			{/* Hero Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<motion.h1 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl font-bold text-gray-900 mb-6 text-center"
					>
						Competitor Analysis
					</motion.h1>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-gray-600 mb-12 text-center"
					>
						Compare your website against competitors and discover opportunities to outperform them.
					</motion.p>

					{/* Analysis Form */}
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-12"
					>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
									Your Website URL *
								</label>
								<input
									type="url"
									id="url"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									placeholder="https://yourwebsite.com"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label htmlFor="competitors" className="block text-sm font-medium text-gray-700 mb-2">
									Competitor URLs (comma-separated) *
								</label>
								<input
									type="text"
									id="competitors"
									value={competitors}
									onChange={(e) => setCompetitors(e.target.value)}
									placeholder="https://competitor1.com, https://competitor2.com, https://competitor3.com"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<p className="text-sm text-gray-500 mt-1">
									Enter up to 5 competitor URLs separated by commas
								</p>
							</div>

							<button
								type="submit"
								disabled={analysisResult.status === 'loading'}
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{analysisResult.status === 'loading' ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
										Analyzing Competitors...
									</div>
								) : (
									'Analyze Competitors'
								)}
							</button>
						</form>
					</motion.div>

					{/* Results Section */}
					{analysisResult.status === 'success' && analysisResult.data && (
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="space-y-8"
						>
							{/* Your Site vs Competitors */}
							<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-6">Your Site vs Competitors</h2>
								
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
									{/* Your Site */}
									<div className="bg-blue-50 rounded-xl p-6">
										<h3 className="text-xl font-semibold text-blue-900 mb-4">Your Site: {analysisResult.data.your_site.domain}</h3>
										<div className="space-y-3">
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Overall Score:</span>
												<span className={`font-semibold ${formatScore(analysisResult.data.your_site.overall_score).color}`}>
													{analysisResult.data.your_site.overall_score}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Domain Authority:</span>
												<span className="font-semibold text-gray-900">{analysisResult.data.your_site.domain_authority}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Backlinks:</span>
												<span className="font-semibold text-gray-900">{analysisResult.data.your_site.backlinks_count.toLocaleString()}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm text-gray-600">Organic Keywords:</span>
												<span className="font-semibold text-gray-900">{analysisResult.data.your_site.organic_keywords.toLocaleString()}</span>
											</div>
										</div>
									</div>

									{/* Competitors Summary */}
									<div className="bg-gray-50 rounded-xl p-6">
										<h3 className="text-xl font-semibold text-gray-900 mb-4">Competitors Overview</h3>
										<div className="space-y-3">
											{analysisResult.data.competitors.map((competitor, index) => (
												<div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
													<div className="flex justify-between items-center">
														<span className="text-sm font-medium text-gray-700 truncate">{competitor.domain}</span>
														<span className={`text-sm font-semibold ${formatScore(competitor.overall_score).color}`}>
															{competitor.overall_score}
														</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Detailed Comparison */}
							<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Comparison</h2>
								
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-gray-200">
												<th className="text-left py-3 px-4 font-semibold text-gray-900">Domain</th>
												<th className="text-center py-3 px-4 font-semibold text-gray-900">Overall</th>
												<th className="text-center py-3 px-4 font-semibold text-gray-900">Title & Meta</th>
												<th className="text-center py-3 px-4 font-semibold text-gray-900">Headings</th>
												<th className="text-center py-3 px-4 font-semibold text-gray-900">Content</th>
												<th className="text-center py-3 px-4 font-semibold text-gray-900">Structure</th>
												<th className="text-center py-3 px-4 font-semibold text-gray-900">DA</th>
											</tr>
										</thead>
										<tbody>
											<tr className="border-b border-gray-100 bg-blue-50">
												<td className="py-3 px-4 font-medium text-blue-900">{analysisResult.data.your_site.domain}</td>
												<td className="py-3 px-4 text-center font-semibold text-blue-900">{analysisResult.data.your_site.overall_score}</td>
												<td className="py-3 px-4 text-center">{analysisResult.data.your_site.title_meta_score}</td>
												<td className="py-3 px-4 text-center">{analysisResult.data.your_site.headings_score}</td>
												<td className="py-3 px-4 text-center">{analysisResult.data.your_site.content_score}</td>
												<td className="py-3 px-4 text-center">{analysisResult.data.your_site.structure_score}</td>
												<td className="py-3 px-4 text-center">{analysisResult.data.your_site.domain_authority}</td>
											</tr>
											{analysisResult.data.competitors.map((competitor, index) => (
												<tr key={index} className="border-b border-gray-100">
													<td className="py-3 px-4 font-medium text-gray-900">{competitor.domain}</td>
													<td className="py-3 px-4 text-center font-semibold">{competitor.overall_score}</td>
													<td className="py-3 px-4 text-center">{competitor.title_meta_score}</td>
													<td className="py-3 px-4 text-center">{competitor.headings_score}</td>
													<td className="py-3 px-4 text-center">{competitor.content_score}</td>
													<td className="py-3 px-4 text-center">{competitor.structure_score}</td>
													<td className="py-3 px-4 text-center">{competitor.domain_authority}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* SWOT Analysis */}
							<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-6">SWOT Analysis</h2>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="bg-green-50 rounded-xl p-6">
										<h3 className="text-xl font-semibold text-green-900 mb-4">Strengths</h3>
										<ul className="space-y-2">
											{analysisResult.data.analysis.strengths.map((strength, index) => (
												<li key={index} className="flex items-start gap-2">
													<span className="text-green-600 mt-1">✓</span>
													<span className="text-green-800">{strength}</span>
												</li>
											))}
										</ul>
									</div>
									
									<div className="bg-red-50 rounded-xl p-6">
										<h3 className="text-xl font-semibold text-red-900 mb-4">Weaknesses</h3>
										<ul className="space-y-2">
											{analysisResult.data.analysis.weaknesses.map((weakness, index) => (
												<li key={index} className="flex items-start gap-2">
													<span className="text-red-600 mt-1">✗</span>
													<span className="text-red-800">{weakness}</span>
												</li>
											))}
										</ul>
									</div>
									
									<div className="bg-blue-50 rounded-xl p-6">
										<h3 className="text-xl font-semibold text-blue-900 mb-4">Opportunities</h3>
										<ul className="space-y-2">
											{analysisResult.data.analysis.opportunities.map((opportunity, index) => (
												<li key={index} className="flex items-start gap-2">
													<span className="text-blue-600 mt-1">→</span>
													<span className="text-blue-800">{opportunity}</span>
												</li>
											))}
										</ul>
									</div>
									
									<div className="bg-purple-50 rounded-xl p-6">
										<h3 className="text-xl font-semibold text-purple-900 mb-4">Recommendations</h3>
										<ul className="space-y-2">
											{analysisResult.data.analysis.recommendations.map((recommendation, index) => (
												<li key={index} className="flex items-start gap-2">
													<span className="text-purple-600 mt-1">💡</span>
													<span className="text-purple-800">{recommendation}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</motion.div>
					)}

					{/* Error State */}
					{analysisResult.status === 'error' && (
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-red-50 border border-red-200 rounded-lg p-6"
						>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
									<span className="text-white text-sm">!</span>
								</div>
								<div>
									<h3 className="font-semibold text-red-800">Analysis Failed</h3>
									<p className="text-red-700">{analysisResult.error}</p>
								</div>
							</div>
						</motion.div>
					)}
				</div>
			</section>
		</div>
	);
}

export default function CompetitorAnalysisPage() {
	return (
		<Suspense fallback={
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		}>
			<CompetitorAnalysisContent />
		</Suspense>
	);
}
