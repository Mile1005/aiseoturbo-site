"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from 'next/link';
import Footer from "../../components/layout/Footer";

export const dynamic = 'force-dynamic';

// Static Header component for this page
function StaticHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              AISEO Turbo
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/seo-audit" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              SEO Audit
            </Link>
            <Link href="/site-crawler" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Site Crawler
            </Link>
            <Link href="/backlinks" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Backlinks
            </Link>
            <Link href="/rank-tracker" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Rank Tracker
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

interface AuditIssue {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  recommendation?: string;
}

interface AuditRecommendation {
  title: string;
  description: string;
}

interface AuditResult {
  id: string;
  url: string;
  status: string;
  score?: number;
  issues?: AuditIssue[];
  recommendations?: AuditRecommendation[];
  createdAt: string;
}

export default function SeoAuditResultsPage() {
  const router = useRouter();
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && router.query.id) {
      fetchAuditResult(router.query.id as string);
    }
  }, [router.isReady, router.query.id]);

  const fetchAuditResult = async (auditId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/seo-audit/results?id=${auditId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch audit result");
      }

      const data = await response.json();
      setAuditResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading audit results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Results</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/seo-audit")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!auditResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
          <p className="text-gray-600 mb-4">The audit result could not be found.</p>
          <button
            onClick={() => router.push("/seo-audit")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Audit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <StaticHeader />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SEO Audit Results
            </h1>
            <p className="text-xl text-gray-600">
              Analysis for {auditResult.url}
            </p>
          </div>

          {/* Score Card */}
          {auditResult.score && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">
                  {auditResult.score}/100
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Overall SEO Score
                </h2>
                <p className="text-gray-600">
                  {auditResult.score >= 80 ? "Excellent" : 
                   auditResult.score >= 60 ? "Good" : 
                   auditResult.score >= 40 ? "Fair" : "Needs Improvement"}
                </p>
              </div>
            </motion.div>
          )}

          {/* Issues */}
          {auditResult.issues && auditResult.issues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Issues Found ({auditResult.issues.length})
              </h2>
              <div className="space-y-4">
                {auditResult.issues.map((issue: AuditIssue, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        issue.severity === 'high' ? 'bg-red-500' :
                        issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {issue.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {issue.description}
                        </p>
                        {issue.recommendation && (
                          <p className="text-sm text-blue-600">
                            <strong>Recommendation:</strong> {issue.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recommendations */}
          {auditResult.recommendations && auditResult.recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Recommendations
              </h2>
              <div className="space-y-4">
                {auditResult.recommendations.map((rec: AuditRecommendation, index: number) => (
                  <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {rec.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <button
              onClick={() => router.push("/seo-audit")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
            >
              Audit Another Page
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
