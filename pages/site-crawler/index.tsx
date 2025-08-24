"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export const dynamic = 'force-dynamic';

interface FormErrors {
  startUrl?: string;
  maxPages?: string;
}

export default function SiteCrawlerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    startUrl: "",
    maxPages: "50",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    
    if (!formData.startUrl.trim()) {
      newErrors.startUrl = "Start URL is required";
    } else if (!isValidUrl(formData.startUrl)) {
      newErrors.startUrl = "Please enter a valid URL";
    }
    
    const maxPages = parseInt(formData.maxPages);
    if (isNaN(maxPages) || maxPages < 1 || maxPages > 1000) {
      newErrors.maxPages = "Max pages must be between 1 and 1000";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/crawl/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startUrl: ensureHttps(formData.startUrl),
          limit: maxPages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start crawl");
      }

      const data = await response.json();
      router.push(`/site-crawler/results?id=${data.crawlId}`);
    } catch (error) {
      console.error("Crawl error:", error);
      setErrors({ startUrl: "Failed to start crawl. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  function ensureHttps(url: string): string {
    if (!url) return url;
    url = url.trim();
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  }

  function isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(ensureHttps(url));
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Site Crawler
            </h1>
            <p className="text-xl text-gray-600">
              Crawl your entire website to find SEO issues and performance problems
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
                <label htmlFor="startUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Start URL *
                </label>
                <input
                  id="startUrl"
                  name="startUrl"
                  type="text"
                  value={formData.startUrl}
                  onChange={(e) => handleInputChange("startUrl", e.target.value)}
                  placeholder="https://example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.startUrl && (
                  <p className="mt-2 text-sm text-red-600">{errors.startUrl}</p>
                )}
              </div>

              <div>
                <label htmlFor="maxPages" className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Pages to Crawl
                </label>
                <input
                  id="maxPages"
                  name="maxPages"
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.maxPages}
                  onChange={(e) => handleInputChange("maxPages", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.maxPages && (
                  <p className="mt-2 text-sm text-red-600">{errors.maxPages}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Limit the number of pages to crawl (1-1000)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Starting Crawl...
                  </div>
                ) : (
                  "Start Site Crawl"
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
              Discover broken links, missing meta tags, and performance issues across your entire site
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
