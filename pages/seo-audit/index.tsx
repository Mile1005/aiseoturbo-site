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

interface FormErrors {
  pageUrl?: string;
  email?: string;
}

// Utility function to add HTTPS if missing
function ensureHttps(url: string): string {
  if (!url) return url;
  url = url.trim();
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

// URL validation function
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(ensureHttps(url));
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function SeoAuditPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    pageUrl: "",
    email: "",
  });

  // Initialize form data from URL parameters
  useEffect(() => {
    if (router.isReady) {
      const { url, email } = router.query;
      if (url && typeof url === 'string') {
        setFormData(prev => ({ ...prev, pageUrl: url }));
      }
      if (email && typeof email === 'string') {
        setFormData(prev => ({ ...prev, email }));
      }
    }
  }, [router.isReady, router.query]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: FormErrors = {};
    
    if (!formData.pageUrl.trim()) {
      newErrors.pageUrl = "Page URL is required";
    } else if (!isValidUrl(formData.pageUrl)) {
      newErrors.pageUrl = "Please enter a valid URL";
    }
    
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Start the SEO audit
      const url = ensureHttps(formData.pageUrl);
      const response = await fetch("/api/seo-audit/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          email: formData.email || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start audit");
      }

      const data = await response.json();
      
      // Redirect to results page
      router.push(`/seo-audit/results?id=${data.auditId}`);
    } catch (error) {
      console.error("Audit error:", error);
      setErrors({ pageUrl: "Failed to start audit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <StaticHeader />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI SEO Audit
            </h1>
            <p className="text-xl text-gray-600">
              Get comprehensive SEO analysis of your web pages with actionable insights
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="pageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL *
                </label>
                <input
                  id="pageUrl"
                  name="pageUrl"
                  type="text"
                  value={formData.pageUrl}
                  onChange={(e) => handleInputChange("pageUrl", e.target.value)}
                  placeholder="example.com or https://example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.pageUrl && (
                  <p className="mt-2 text-sm text-red-600">{errors.pageUrl}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  We&apos;ll notify you when your audit is complete
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Starting Audit...
                  </div>
                ) : (
                  "Start Free SEO Audit"
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Get detailed insights on technical SEO, content quality, accessibility, and more
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
