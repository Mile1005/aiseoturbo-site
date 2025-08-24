"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

interface FormErrors {
  domain?: string;
  competitors?: string;
}

export default function CompetitorAnalysisPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    domain: "",
    competitors: "",
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
    
    if (!formData.domain.trim()) {
      newErrors.domain = "Domain is required";
    } else if (!isValidDomain(formData.domain)) {
      newErrors.domain = "Please enter a valid domain";
    }
    
    if (!formData.competitors.trim()) {
      newErrors.competitors = "Competitor domains are required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, just show a placeholder - you can implement actual competitor analysis later
      alert("Competitor analysis feature coming soon!");
    } catch (error) {
      console.error("Competitor analysis error:", error);
      setErrors({ domain: "Failed to analyze competitors. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  function isValidDomain(domain: string): boolean {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
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
              Competitor Analysis
            </h1>
            <p className="text-xl text-gray-600">
              Compare your site against competitors and find opportunities to outperform
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
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Domain *
                </label>
                <input
                  id="domain"
                  name="domain"
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleInputChange("domain", e.target.value)}
                  placeholder="yourdomain.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.domain && (
                  <p className="mt-2 text-sm text-red-600">{errors.domain}</p>
                )}
              </div>

              <div>
                <label htmlFor="competitors" className="block text-sm font-medium text-gray-700 mb-2">
                  Competitor Domains *
                </label>
                <textarea
                  id="competitors"
                  name="competitors"
                  value={formData.competitors}
                  onChange={(e) => handleInputChange("competitors", e.target.value)}
                  placeholder="Enter competitor domains, one per line&#10;competitor1.com&#10;competitor2.com&#10;competitor3.com"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.competitors && (
                  <p className="mt-2 text-sm text-red-600">{errors.competitors}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Enter one competitor domain per line
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Competitors...
                  </div>
                ) : (
                  "Analyze Competitors"
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
              Discover your competitors' strategies, identify gaps, and find opportunities to outperform them
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
