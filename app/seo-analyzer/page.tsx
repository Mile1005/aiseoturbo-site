"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface AuditData {
	scores?: {
		overall: number;
		title_meta: number;
		headings: number;
		answerability: number;
		structure: number;
		schema: number;
		images: number;
		internal_links: number;
	};
	issues?: Array<{
		id: string;
		category: string;
		severity: 'low' | 'medium' | 'high';
		found: string;
		why_it_matters: string;
		recommendation: string;
		snippet?: string;
	}>;
	quick_wins?: Array<{
		issue_id: string;
		estimated_impact: 'low' | 'medium' | 'high';
		action: string;
		snippet?: string;
	}>;
	stats?: {
		word_count: number;
		reading_time_min: number;
		images_count: number;
		h2_count: number;
		h3_count: number;
		tables_count: number;
		lists_count: number;
	};
}

interface AuditResult {
	status: 'idle' | 'loading' | 'success' | 'error';
	data?: AuditData;
	error?: string;
}

function SeoAnalyzerContent() {
	const searchParams = useSearchParams();
	const [url, setUrl] = useState('');
	const [email, setEmail] = useState('');
	const [keyword, setKeyword] = useState('');
	const [auditResult, setAuditResult] = useState<AuditResult>({ status: 'idle' });

	// Pre-fill URL from query parameters
	useEffect(() => {
		const urlParam = searchParams.get('url');
		if (urlParam) {
			setUrl(urlParam);
		}
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!url.trim()) return;

		setAuditResult({ status: 'loading' });

		try {
			// Start the audit
			const startResponse = await fetch('/api/seo-audit/start', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					pageUrl: url,
					email: email || '',
					targetKeyword: keyword || ''
				})
			});

			if (!startResponse.ok) {
				throw new Error('Failed to start audit');
			}

			const startData = await startResponse.json();
			
			if (startData.status === 'ready' && startData.result) {
				// Audit completed immediately
				setAuditResult({ status: 'success', data: startData.result });
			} else if (startData.runId) {
				// Poll for results
				await pollForResults(startData.runId);
			} else {
				throw new Error('Invalid response from audit service');
			}
		} catch (error) {
			console.error('Audit error:', error);
			setAuditResult({ 
				status: 'error', 
				error: error instanceof Error ? error.message : 'Audit failed' 
			});
		}
	};

	const pollForResults = async (runId: string) => {
		const maxAttempts = 30; // 30 seconds max
		let attempts = 0;

		const poll = async () => {
			try {
				const response = await fetch(`/api/seo-audit/result?runId=${runId}`);
				const data = await response.json();

				if (data.status === 'done' && data.result) {
					setAuditResult({ status: 'success', data: data.result });
					return;
				} else if (data.status === 'error') {
					throw new Error(data.error || 'Audit failed');
				} else if (attempts >= maxAttempts) {
					throw new Error('Audit timeout - please try again');
				}

				attempts++;
				setTimeout(poll, 1000); // Poll every second
			} catch (error) {
				setAuditResult({ 
					status: 'error', 
					error: error instanceof Error ? error.message : 'Polling failed' 
				});
			}
		};

		poll();
	};

	const formatScore = (score: number) => {
		if (score >= 90) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
		if (score >= 70) return { text: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
		if (score >= 50) return { text: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100' };
		return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
	};

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case 'high': return 'bg-red-50 border-red-200 text-red-800';
			case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
			case 'low': return 'bg-blue-50 border-blue-200 text-blue-800';
			default: return 'bg-gray-50 border-gray-200 text-gray-800';
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			{/* Hero Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<motion.h1 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl font-bold text-gray-900 mb-6"
					>
						SEO Analyzer
					</motion.h1>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-gray-600 mb-12"
					>
						Analyze your website to detect critical errors and get actionable insights to boost your SEO and get more traffic.
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
									Website URL *
								</label>
								<input
									type="url"
									id="url"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									placeholder="https://example.com"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
										Email (optional)
									</label>
									<input
										type="email"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="your@email.com"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
										Target Keyword (optional)
									</label>
									<input
										type="text"
										id="keyword"
										value={keyword}
										onChange={(e) => setKeyword(e.target.value)}
										placeholder="your target keyword"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>

							<button
								type="submit"
								disabled={auditResult.status === 'loading'}
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{auditResult.status === 'loading' ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
										Analyzing...
									</div>
								) : (
									'Analyze Website'
								)}
							</button>
						</form>
					</motion.div>

					{/* Results Section */}
					{auditResult.status === 'success' && auditResult.data && (
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8"
						>
							<h2 className="text-3xl font-bold text-gray-900 mb-6">SEO Analysis Results</h2>
							
							{/* Overall Score */}
							{auditResult.data.scores?.overall !== undefined && (
								<div className="mb-8">
									<h3 className="text-xl font-semibold text-gray-900 mb-4">Overall SEO Score</h3>
									<div className="flex items-center gap-4">
										<div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${formatScore(auditResult.data.scores.overall).bg}`}>
											<span className={formatScore(auditResult.data.scores.overall).color}>
												{auditResult.data.scores.overall}
											</span>
										</div>
										<div>
											<p className={`text-lg font-semibold ${formatScore(auditResult.data.scores.overall).color}`}>
												{formatScore(auditResult.data.scores.overall).text}
											</p>
											<p className="text-gray-600">Your website&apos;s overall SEO performance</p>
										</div>
									</div>
								</div>
							)}

							{/* Score Breakdown */}
							{auditResult.data.scores && (
								<div className="mb-8">
									<h3 className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</h3>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
										{Object.entries(auditResult.data.scores).filter(([key]) => key !== 'overall').map(([key, score]) => (
											<div key={key} className="bg-gray-50 rounded-lg p-4 text-center">
												<h4 className="font-medium text-gray-900 capitalize text-sm mb-2">
													{key.replace('_', ' ')}
												</h4>
												<div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto ${formatScore(score as number).bg}`}>
													<span className={formatScore(score as number).color}>
														{score}
													</span>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Issues Found */}
							{auditResult.data.issues && auditResult.data.issues.length > 0 && (
								<div className="mb-8">
									<h3 className="text-xl font-semibold text-gray-900 mb-4">Issues Found ({auditResult.data.issues.length})</h3>
									<div className="space-y-3">
										{auditResult.data.issues.map((issue, index: number) => (
											<div key={index} className={`border rounded-lg p-4 ${getSeverityColor(issue.severity)}`}>
												<div className="flex items-start gap-3">
													<div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
														issue.severity === 'high' ? 'bg-red-500' : 
														issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
													}`}>
														<span className="text-white text-sm">!</span>
													</div>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-2">
															<h4 className="font-semibold">{issue.found}</h4>
															<span className={`px-2 py-1 rounded text-xs font-medium ${
																issue.severity === 'high' ? 'bg-red-100 text-red-800' : 
																issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
															}`}>
																{issue.severity}
															</span>
														</div>
														<p className="text-sm mb-2">{issue.why_it_matters}</p>
														<p className="text-sm font-medium">
															<strong>Recommendation:</strong> {issue.recommendation}
														</p>
														{issue.snippet && (
															<div className="mt-3 p-3 bg-gray-900 rounded text-green-400 text-sm font-mono overflow-x-auto">
																<pre>{issue.snippet}</pre>
															</div>
														)}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Quick Wins */}
							{auditResult.data.quick_wins && auditResult.data.quick_wins.length > 0 && (
								<div className="mb-8">
									<h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Wins ({auditResult.data.quick_wins.length})</h3>
									<div className="space-y-3">
										{auditResult.data.quick_wins.map((win, index: number) => (
											<div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
												<div className="flex items-start gap-3">
													<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
														<span className="text-white text-sm">✓</span>
													</div>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-2">
															<h4 className="font-semibold text-green-800">{win.action}</h4>
															<span className={`px-2 py-1 rounded text-xs font-medium ${
																win.estimated_impact === 'high' ? 'bg-green-100 text-green-800' : 
																win.estimated_impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
															}`}>
																{win.estimated_impact} impact
															</span>
														</div>
														{win.snippet && (
															<div className="mt-3 p-3 bg-gray-900 rounded text-green-400 text-sm font-mono overflow-x-auto">
																<pre>{win.snippet}</pre>
															</div>
														)}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Website Stats */}
							{auditResult.data.stats && (
								<div className="mb-8">
									<h3 className="text-xl font-semibold text-gray-900 mb-4">Website Statistics</h3>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
										<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
											<h4 className="font-semibold text-blue-800">Word Count</h4>
											<p className="text-2xl font-bold text-blue-600">{auditResult.data.stats.word_count}</p>
										</div>
										<div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
											<h4 className="font-semibold text-green-800">Reading Time</h4>
											<p className="text-2xl font-bold text-green-600">{auditResult.data.stats.reading_time_min} min</p>
										</div>
										<div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
											<h4 className="font-semibold text-purple-800">Images</h4>
											<p className="text-2xl font-bold text-purple-600">{auditResult.data.stats.images_count}</p>
										</div>
										<div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
											<h4 className="font-semibold text-orange-800">Headings</h4>
											<p className="text-2xl font-bold text-orange-600">{auditResult.data.stats.h2_count + auditResult.data.stats.h3_count}</p>
										</div>
									</div>
								</div>
							)}
						</motion.div>
					)}

					{/* Error State */}
					{auditResult.status === 'error' && (
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
									<p className="text-red-700">{auditResult.error}</p>
								</div>
							</div>
						</motion.div>
					)}
				</div>
			</section>
		</div>
	);
}

export default function SeoAnalyzerPage() {
	return (
		<Suspense fallback={
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		}>
			<SeoAnalyzerContent />
		</Suspense>
	);
}
