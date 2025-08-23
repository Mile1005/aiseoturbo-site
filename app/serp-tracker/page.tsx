"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SerpResult {
  title: string;
  url: string;
  description: string;
  position: number;
}

interface SerpData {
  keyword: string;
  country: string;
  results: SerpResult[];
  ads?: { title?: string; link?: string; url?: string; snippet?: string; description?: string }[];
  featured_snippet?: { snippet?: string };
  people_also_ask?: { question?: string; title?: string }[];
  related_searches?: unknown[];
  local_results?: unknown;
  knowledge_graph?: unknown;
  sitelinks?: unknown[];
  cached: boolean;
  timestamp: string;
  usedFallback?: boolean;
}

interface SerpAnalysisResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: Record<string, SerpData>;
  error?: string;
}

export default function SerpTrackerPage() {
  const [keywords, setKeywords] = useState('');
  const [country, setCountry] = useState('us');
  const [domain, setDomain] = useState('');
  const [serpResult, setSerpResult] = useState<SerpAnalysisResult>({ status: 'idle' });

  const countries = [
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'es', name: 'Spain', flag: '🇪🇸' },
    { code: 'it', name: 'Italy', flag: '🇮🇹' },
    { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'br', name: 'Brazil', flag: '🇧🇷' },
    { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
    { code: 'in', name: 'India', flag: '🇮🇳' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;

    setSerpResult({ status: 'loading' });

    try {
      const response = await fetch('/api/serp-tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: keywords,
          country: country
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze SERP positions');
      }

      const data = await response.json();
      setSerpResult({ status: 'success', data });
    } catch (error) {
      console.error('SERP analysis error:', error);
      setSerpResult({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'SERP analysis failed' 
      });
    }
  };

  const findDomainPosition = (results: SerpResult[], targetDomain: string) => {
    if (!targetDomain) return null;
    const cleanDomain = targetDomain.replace(/^https?:\/\//, '').replace(/^www\./, '');
    return results.find(result => {
      const resultDomain = result.url.replace(/^https?:\/\//, '').replace(/^www\./, '');
      return resultDomain.includes(cleanDomain) || cleanDomain.includes(resultDomain);
    });
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return 'text-green-600 bg-green-100';
    if (position <= 10) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-6 text-center"
          >
            SERP Position Tracker
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
          >
            Track your keyword rankings across multiple countries and analyze your competitors&apos; positions in search results.
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
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords to Track *
                </label>
                <textarea
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Enter keywords, one per line or separated by commas&#10;Example: best seo tools, keyword research, content optimization"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Maximum 5 keywords per analysis</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Target Country
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Domain (optional)
                  </label>
                  <input
                    type="text"
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">We&apos;ll highlight your domain in results</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={serpResult.status === 'loading'}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {serpResult.status === 'loading' ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing SERP Positions...
                  </div>
                ) : (
                  'Track SERP Positions'
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Section */}
          {serpResult.status === 'success' && serpResult.data && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {Object.entries(serpResult.data).map(([key, data]) => {
                const domainPosition = findDomainPosition(data.results, domain);
                
                return (
                  <div key={key} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">&quot;{data.keyword}&quot;</h2>
                        <p className="text-gray-600">
                          {countries.find(c => c.code === data.country)?.flag} {countries.find(c => c.code === data.country)?.name}
                          {data.cached && <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Cached</span>}
                          {data.usedFallback && <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">API Fallback</span>}
                        </p>
                      </div>
                      {domainPosition && (
                        <div className="text-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${getPositionColor(domainPosition.position)}`}>
                            #{domainPosition.position}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Your Position</p>
                        </div>
                      )}
                    </div>

                    {/* Featured Snippet */}
                    {data.featured_snippet && (
                      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-bold text-blue-800 mb-2">Featured Snippet</h3>
                        <p className="text-blue-700 text-sm">{data.featured_snippet.snippet || JSON.stringify(data.featured_snippet)}</p>
                      </div>
                    )}

                    {/* Search Results */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Top 10 Results</h3>
                      {data.results.map((result, index) => {
                        const isDomain = domain && result.url.includes(domain.replace(/^https?:\/\//, '').replace(/^www\./, ''));
                        
                        return (
                          <div key={index} className={`border rounded-lg p-4 ${isDomain ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-start gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPositionColor(result.position)}`}>
                                {result.position}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 hover:text-blue-600">
                                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                                    {result.title}
                                  </a>
                                  {isDomain && <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Your Site</span>}
                                </h4>
                                <p className="text-green-600 text-sm mb-2">{result.url}</p>
                                <p className="text-gray-600 text-sm">{result.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Ads */}
                    {data.ads && data.ads.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Paid Ads ({data.ads.length})</h3>
                        <div className="space-y-2">
                          {data.ads.map((ad, index: number) => (
                            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <h4 className="font-medium text-gray-900">{ad.title || 'Ad Title'}</h4>
                              <p className="text-green-600 text-sm">{ad.link || ad.url}</p>
                              <p className="text-gray-600 text-sm">{ad.snippet || ad.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* People Also Ask */}
                    {data.people_also_ask && data.people_also_ask.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">People Also Ask</h3>
                        <div className="space-y-2">
                          {data.people_also_ask.map((question, index: number) => (
                            <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                              <p className="font-medium text-purple-800">{question.question || question.title || JSON.stringify(question)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Error State */}
          {serpResult.status === 'error' && (
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
                  <h3 className="font-semibold text-red-800">SERP Analysis Failed</h3>
                  <p className="text-red-700">{serpResult.error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
