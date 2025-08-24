import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the HomePageClient to avoid SSR issues
const HomePageClient = dynamic(() => import('../components/HomePageClient'), {
  ssr: false,
  loading: () => <HomePageSkeleton />
});

// Static skeleton for the homepage
function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Static Header */}
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered SEO Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get comprehensive SEO insights with our advanced AI-powered tools. 
              Audit your website, analyze competitors, and improve your search rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/seo-audit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Start Free SEO Audit
              </Link>
              <Link 
                href="/about"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive SEO Tools
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to improve your website&apos;s search engine performance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SEO Audit</h3>
              <p className="text-gray-600">
                Comprehensive analysis of your website&apos;s SEO performance with actionable recommendations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Site Crawler</h3>
              <p className="text-gray-600">
                Crawl your entire website to find technical issues and optimization opportunities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitor Analysis</h3>
              <p className="text-gray-600">
                Compare your site against competitors and find opportunities to outperform them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 dark:border-white/10 mt-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="font-semibold mb-2">Product</div>
              <Link href="/features" className="block">Features</Link>
              <Link href="/pricing" className="block">Pricing</Link>
            </div>
            <div>
              <div className="font-semibold mb-2">Company</div>
              <Link href="/about" className="block">About</Link>
              <Link href="/contact" className="block">Contact</Link>
            </div>
            <div>
              <div className="font-semibold mb-2">Resources</div>
              <Link href="/blog" className="block">Blog</Link>
            </div>
            <div>
              <div className="font-semibold mb-2">Legal</div>
              <Link href="/legal/privacy" className="block">Privacy</Link>
              <Link href="/legal/terms" className="block">Terms</Link>
            </div>
          </div>
          <div className="mt-8">© {new Date().getFullYear()} AISEO Turbo. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return <HomePageClient />;
}
