import React from "react";
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

export default function ApiSolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <StaticHeader />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              API & Data Solutions
            </h1>
            <p className="text-xl text-gray-600">
              Access our comprehensive SEO data through powerful APIs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Available APIs
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  SEO Audit API
                </h3>
                <p className="text-gray-600 mb-4">
                  Get comprehensive SEO analysis for any URL with detailed recommendations.
                </p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  POST /api/seo-audit/run
                </code>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Site Crawler API
                </h3>
                <p className="text-gray-600 mb-4">
                  Crawl entire websites and get detailed reports on technical issues.
                </p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  POST /api/crawl/start
                </code>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Keyword Research API
                </h3>
                <p className="text-gray-600 mb-4">
                  Find high-value keywords with search volume and competition data.
                </p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  POST /api/keywords/research
                </code>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Backlink Analysis API
                </h3>
                <p className="text-gray-600 mb-4">
                  Analyze backlink profiles and discover link building opportunities.
                </p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  POST /api/backlinks/analyze
                </code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Getting Started
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  1. Get Your API Key
                </h3>
                <p className="text-gray-600">
                  Sign up for an account and generate your API key from the dashboard.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2. Make API Requests
                </h3>
                <p className="text-gray-600">
                  Include your API key in the Authorization header with all requests.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  3. Handle Responses
                </h3>
                <p className="text-gray-600">
                  All responses are in JSON format with detailed error handling.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Example Request
            </h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X POST https://api.aiseoturbo.com/seo-audit/run \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "options": {
      "technical": true,
      "accessibility": true,
      "performance": true,
      "content": true
    }
  }'`}
            </pre>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
