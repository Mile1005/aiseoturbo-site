"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface CrawlPage {
  url: string;
  depth: number;
  status: number;
  title: string | null;
  h1_presence: boolean;
  word_count: number;
  images_missing_alt: number;
  noindex: boolean;
  canonical: string | null;
  meta_description: string | null;
  h1_count: number;
  h2_count: number;
  h3_count: number;
  internal_links: number;
  external_links: number;
  images_total: number;
  load_time_ms: number;
  error?: string;
  brokenLinks?: string[];
}

interface CrawlData {
  startUrl: string;
  pages: CrawlPage[];
  totalPages: number;
  successfulPages: number;
  failedPages: number;
  averageLoadTime: number;
  issues: {
    noindex_pages: number;
    missing_titles: number;
    missing_h1: number;
    missing_meta_descriptions: number;
    images_without_alt: number;
    pages_without_canonical: number;
    broken_links: number;
    duplicate_titles: string[];
    duplicate_canonicals: string[];
  };
  robotsTxt: { found: boolean; url: string; status?: number };
  sitemapXml: { found: boolean; url: string; status?: number; urls?: string[] };
  brokenLinks: { url: string; from: string }[];
  crawlTime: number;
  timestamp: string;
}

interface CrawlResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: CrawlData;
  error?: string;
}

function SiteCrawlerContent() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState('');
  const [limit, setLimit] = useState(50);
  const [maxDepth, setMaxDepth] = useState(3);
  const [sameHostOnly, setSameHostOnly] = useState(true);
  const [crawlResult, setCrawlResult] = useState<CrawlResult>({ status: 'idle' });

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

    setCrawlResult({ status: 'loading' });

    try {
      // Start the crawl
      const startResponse = await fetch('/api/site-crawler/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startUrl: url,
          limit,
          sameHostOnly,
          maxDepth,
          timeout: 10000
        })
      });

      if (!startResponse.ok) {
        throw new Error('Failed to start crawl');
      }

      const startData = await startResponse.json();
      
      if (startData.status === 'ready' && startData.result) {
        // Crawl completed immediately
        setCrawlResult({ status: 'success', data: startData.result });
      } else if (startData.crawlId) {
        // Poll for results
        await pollForResults(startData.crawlId);
      } else {
        throw new Error('Invalid response from crawl service');
      }
    } catch (error) {
      console.error('Crawl error:', error);
      setCrawlResult({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Crawl failed' 
      });
    }
  };

  const pollForResults = async (crawlId: string) => {
    const maxAttempts = 60; // 60 seconds max for crawls
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(`/api/site-crawler/result?id=${crawlId}`);
        const data = await response.json();

        if (data.status === 'ready' && data.result) {
          setCrawlResult({ status: 'success', data: data.result });
          return;
        } else if (data.status === 'failed') {
          throw new Error(data.error || 'Crawl failed');
        } else if (attempts >= maxAttempts) {
          throw new Error('Crawl timeout - please try again');
        }

        attempts++;
        setTimeout(poll, 1000); // Poll every second
      } catch (error) {
        setCrawlResult({ 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Polling failed' 
        });
      }
    };

    poll();
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-100';
    if (status >= 300 && status < 400) return 'text-yellow-600 bg-yellow-100';
    if (status >= 400 && status < 500) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const formatLoadTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const exportToCsv = async () => {
    if (!crawlResult.data) return;
    
    try {
      const response = await fetch(`/api/site-crawler/export?id=${crawlResult.data.startUrl}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `crawl-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
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
            Site Crawler
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
          >
            Crawl your entire website to discover technical SEO issues, broken links, missing meta tags, and performance problems.
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-2">
                    Max Pages
                  </label>
                  <select
                    id="limit"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={10}>10 pages</option>
                    <option value={25}>25 pages</option>
                    <option value={50}>50 pages</option>
                    <option value={100}>100 pages</option>
                    <option value={200}>200 pages</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="maxDepth" className="block text-sm font-medium text-gray-700 mb-2">
                    Max Depth
                  </label>
                  <select
                    id="maxDepth"
                    value={maxDepth}
                    onChange={(e) => setMaxDepth(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>1 level</option>
                    <option value={2}>2 levels</option>
                    <option value={3}>3 levels</option>
                    <option value={4}>4 levels</option>
                    <option value={5}>5 levels</option>
                  </select>
                </div>
                <div className="flex items-center justify-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sameHostOnly}
                      onChange={(e) => setSameHostOnly(e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Same domain only</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={crawlResult.status === 'loading'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {crawlResult.status === 'loading' ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Crawling Website...
                  </div>
                ) : (
                  'Start Website Crawl'
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Section */}
          {crawlResult.status === 'success' && crawlResult.data && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Overview Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Crawl Results</h2>
                  <button
                    onClick={exportToCsv}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600">{crawlResult.data.totalPages}</h3>
                    <p className="text-blue-800 font-medium">Total Pages</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-600">{crawlResult.data.successfulPages}</h3>
                    <p className="text-green-800 font-medium">Successful</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-red-600">{crawlResult.data.failedPages}</h3>
                    <p className="text-red-800 font-medium">Failed</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-purple-600">{formatLoadTime(crawlResult.data.averageLoadTime)}</h3>
                    <p className="text-purple-800 font-medium">Avg Load Time</p>
                  </div>
                </div>

                {/* Issues Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-800 mb-2">Critical Issues</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>Missing Titles: {crawlResult.data.issues.missing_titles}</li>
                      <li>Missing H1: {crawlResult.data.issues.missing_h1}</li>
                      <li>Broken Links: {crawlResult.data.issues.broken_links}</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">Content Issues</h4>
                    <ul className="space-y-1 text-sm text-yellow-700">
                      <li>Missing Meta Descriptions: {crawlResult.data.issues.missing_meta_descriptions}</li>
                      <li>Images w/o Alt: {crawlResult.data.issues.images_without_alt}</li>
                      <li>No Canonical: {crawlResult.data.issues.pages_without_canonical}</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">Technical Info</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>Robots.txt: {crawlResult.data.robotsTxt.found ? 'Found' : 'Missing'}</li>
                      <li>Sitemap: {crawlResult.data.sitemapXml.found ? 'Found' : 'Missing'}</li>
                      <li>NoIndex Pages: {crawlResult.data.issues.noindex_pages}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pages Table */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Crawled Pages</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold">URL</th>
                        <th className="text-left py-3 px-2 font-semibold">Status</th>
                        <th className="text-left py-3 px-2 font-semibold">Title</th>
                        <th className="text-left py-3 px-2 font-semibold">H1</th>
                        <th className="text-left py-3 px-2 font-semibold">Words</th>
                        <th className="text-left py-3 px-2 font-semibold">Load Time</th>
                        <th className="text-left py-3 px-2 font-semibold">Issues</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crawlResult.data.pages.map((page, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block max-w-xs">
                              {page.url}
                            </a>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(page.status)}`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="truncate block max-w-xs" title={page.title || 'No title'}>
                              {page.title || <span className="text-red-500">Missing</span>}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            {page.h1_presence ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-red-500">✗</span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-gray-600">{page.word_count}</td>
                          <td className="py-3 px-2 text-gray-600">{formatLoadTime(page.load_time_ms)}</td>
                          <td className="py-3 px-2">
                            <div className="flex gap-1">
                              {!page.title && <span className="w-2 h-2 bg-red-500 rounded-full" title="Missing title"></span>}
                              {!page.h1_presence && <span className="w-2 h-2 bg-orange-500 rounded-full" title="Missing H1"></span>}
                              {!page.meta_description && <span className="w-2 h-2 bg-yellow-500 rounded-full" title="Missing meta description"></span>}
                              {page.images_missing_alt > 0 && <span className="w-2 h-2 bg-purple-500 rounded-full" title="Images missing alt text"></span>}
                              {page.noindex && <span className="w-2 h-2 bg-gray-500 rounded-full" title="NoIndex page"></span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Broken Links */}
              {crawlResult.data.brokenLinks.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Broken Links ({crawlResult.data.brokenLinks.length})</h3>
                  <div className="space-y-2">
                    {crawlResult.data.brokenLinks.map((link, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 font-medium">{link.url}</p>
                        <p className="text-red-600 text-sm">Found on: {link.from}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Error State */}
          {crawlResult.status === 'error' && (
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
                  <h3 className="font-semibold text-red-800">Crawl Failed</h3>
                  <p className="text-red-700">{crawlResult.error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SiteCrawlerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SiteCrawlerContent />
    </Suspense>
  );
}
