import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About AISEO Turbo
            </h1>
            <p className="text-xl text-gray-600">
              Revolutionizing SEO with AI-powered insights and comprehensive analysis
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              At AISEO Turbo, we believe that every website deserves to be found. Our mission is to democratize 
              SEO by providing powerful, AI-driven tools that make search engine optimization accessible to 
              businesses of all sizes.
            </p>
            <p className="text-gray-600">
              We combine cutting-edge artificial intelligence with deep SEO expertise to deliver insights that 
              help you understand your website&apos;s performance, identify opportunities for improvement, and 
              implement strategies that drive real results.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Comprehensive SEO Audits
                </h3>
                <p className="text-gray-600">
                  Get detailed analysis of your website&apos;s SEO performance with actionable recommendations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Site Crawling & Analysis
                </h3>
                <p className="text-gray-600">
                  Discover technical issues and optimization opportunities across your entire website.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Competitor Analysis
                </h3>
                <p className="text-gray-600">
                  Understand your competitors&apos; strategies and find opportunities to outperform them.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Keyword Research
                </h3>
                <p className="text-gray-600">
                  Find high-value keywords with search volume and competition analysis.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Backlink Analysis
                </h3>
                <p className="text-gray-600">
                  Analyze your backlink profile and discover link building opportunities.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Rank Tracking
                </h3>
                <p className="text-gray-600">
                  Monitor your keyword positions with real-time updates and alerts.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Why Choose AISEO Turbo?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered Insights</h3>
                  <p className="text-gray-600">Our advanced AI algorithms provide deeper, more accurate analysis than traditional SEO tools.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Coverage</h3>
                  <p className="text-gray-600">From technical SEO to content optimization, we cover every aspect of search engine optimization.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Actionable Recommendations</h3>
                  <p className="text-gray-600">Get specific, implementable advice that you can act on immediately to improve your rankings.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">User-Friendly Interface</h3>
                  <p className="text-gray-600">Complex SEO data presented in an intuitive, easy-to-understand format.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Commitment
            </h2>
            <p className="text-gray-600 mb-4">
                             We&apos;re committed to providing you with the most accurate, up-to-date SEO insights and tools. 
              Our team continuously monitors search engine algorithm changes and updates our platform 
              to ensure you always have the latest best practices at your fingertips.
            </p>
            <p className="text-gray-600">
                             Whether you&apos;re a small business owner, a marketing professional, or an SEO specialist, 
              AISEO Turbo is here to help you achieve your search engine optimization goals.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
