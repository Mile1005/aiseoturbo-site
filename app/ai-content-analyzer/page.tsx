"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AnalysisResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: unknown;
  error?: string;
}

export default function AIContentAnalyzerPage() {
  const [text, setText] = useState('');
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>(['sentiment']);
  const [results, setResults] = useState<Record<string, AnalysisResult>>({});

  const availableAnalyses = [
    { id: 'sentiment', name: 'Sentiment Analysis', description: 'Analyze the emotional tone of your content' },
    { id: 'intent', name: 'Intent Classification', description: 'Determine the intent behind your content' },
    { id: 'summarization', name: 'Text Summarization', description: 'Generate a concise summary of your content' },
    { id: 'ner', name: 'Named Entity Recognition', description: 'Extract people, places, and organizations' },
    { id: 'topic', name: 'Topic Classification', description: 'Classify your content into topics' },
    { id: 'toxicity', name: 'Toxicity Detection', description: 'Check for potentially harmful content' },
    { id: 'language', name: 'Language Detection', description: 'Identify the language of your content' },
    { id: 'paraphrase', name: 'Paraphrasing', description: 'Generate alternative versions of your text' },
    { id: 'question', name: 'Question Generation', description: 'Generate relevant questions from your content' }
  ];

  const handleAnalysisToggle = (analysisId: string) => {
    setSelectedAnalyses(prev => 
      prev.includes(analysisId) 
        ? prev.filter(id => id !== analysisId)
        : [...prev, analysisId]
    );
  };

  const runAnalysis = async (analysisType: string) => {
    if (!text.trim()) return;

    setResults(prev => ({ ...prev, [analysisType]: { status: 'loading' } }));

    try {
      const body: { task: string; text: string; labels?: string[] } = { task: analysisType, text };
      
      // Add labels for classification tasks
      if (analysisType === 'intent') {
        body.labels = ['informational', 'commercial', 'navigational', 'transactional'];
      } else if (analysisType === 'topic') {
        body.labels = ['technology', 'business', 'health', 'entertainment', 'sports', 'politics', 'science'];
      }

      const response = await fetch('/api/ai-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(prev => ({ ...prev, [analysisType]: { status: 'success', data } }));
    } catch (error) {
      console.error('Analysis error:', error);
      setResults(prev => ({ 
        ...prev, 
        [analysisType]: { 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Analysis failed' 
        } 
      }));
    }
  };

  const runAllAnalyses = async () => {
    for (const analysisType of selectedAnalyses) {
      await runAnalysis(analysisType);
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const formatResult = (analysisType: string, data: unknown): React.ReactNode => {
    switch (analysisType) {
      case 'sentiment':
        if (Array.isArray(data) && data[0]) {
          const sentiment = data[0];
          return (
            <div className="space-y-2">
              <p className="font-semibold">Sentiment: {sentiment.label}</p>
              <p className="text-sm text-gray-600">Confidence: {(sentiment.score * 100).toFixed(1)}%</p>
            </div>
          );
        }
        break;
      
      case 'intent':
      case 'topic':
        if (data && typeof data === 'object' && 'labels' in data && 'scores' in data) {
          const typedData = data as { labels: string[]; scores: number[] };
          return (
            <div className="space-y-2">
              {typedData.labels.map((label: string, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="capitalize">{label}</span>
                  <span className="text-sm text-gray-600">{(typedData.scores[index] * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          );
        }
        break;
      
      case 'summarization':
        if (Array.isArray(data) && data[0] && data[0].summary_text) {
          return <p className="text-gray-700">{data[0].summary_text}</p>;
        }
        break;
      
      case 'ner':
        if (Array.isArray(data)) {
          return (
            <div className="space-y-2">
              {data.map((entity: { word: string; entity_group?: string; entity?: string }, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{entity.word}</span>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {entity.entity_group || entity.entity}
                  </span>
                </div>
              ))}
            </div>
          );
        }
        break;
      
      case 'toxicity':
        if (Array.isArray(data) && data[0]) {
          const toxicity = data[0];
          const isToxic = toxicity.label === 'TOXIC';
          return (
            <div className={`p-3 rounded-lg ${isToxic ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
              <p className={`font-semibold ${isToxic ? 'text-red-800' : 'text-green-800'}`}>
                {isToxic ? '⚠️ Potentially Toxic Content' : '✅ Content is Safe'}
              </p>
              <p className="text-sm text-gray-600">Confidence: {(toxicity.score * 100).toFixed(1)}%</p>
            </div>
          );
        }
        break;
      
      case 'language':
        if (Array.isArray(data) && data[0]) {
          const language = data[0];
          return (
            <div className="space-y-2">
              <p className="font-semibold">Language: {language.label}</p>
              <p className="text-sm text-gray-600">Confidence: {(language.score * 100).toFixed(1)}%</p>
            </div>
          );
        }
        break;
      
      case 'paraphrase':
        if (Array.isArray(data) && data[0] && data[0].generated_text) {
          return <p className="text-gray-700">{data[0].generated_text}</p>;
        }
        break;
      
      case 'question':
        if (Array.isArray(data)) {
          return (
            <div className="space-y-2">
              {data.map((item: { generated_text?: string; question?: string }, index: number) => (
                <p key={index} className="text-gray-700">
                  {item.generated_text || item.question || JSON.stringify(item)}
                </p>
              ))}
            </div>
          );
        }
        break;
      
      default:
        return <pre className="text-sm text-gray-600 overflow-auto">{JSON.stringify(data, null, 2)}</pre>;
    }
    
    return <pre className="text-sm text-gray-600 overflow-auto">{JSON.stringify(data, null, 2)}</pre>;
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-6 text-center"
          >
            AI Content Analyzer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
          >
            Use advanced AI to analyze your content for sentiment, intent, toxicity, and more. Get insights to improve your content strategy.
          </motion.p>

          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                  Content to Analyze *
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your content here... (articles, social media posts, product descriptions, etc.)"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                />
              </div>

              {/* Analysis Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Analyses to Run
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableAnalyses.map((analysis) => (
                    <label key={analysis.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAnalyses.includes(analysis.id)}
                        onChange={() => handleAnalysisToggle(analysis.id)}
                        className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{analysis.name}</h3>
                        <p className="text-sm text-gray-600">{analysis.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={runAllAnalyses}
                disabled={!text.trim() || selectedAnalyses.length === 0 || Object.values(results).some(r => r.status === 'loading')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {Object.values(results).some(r => r.status === 'loading') ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Content...
                  </div>
                ) : (
                  `Run ${selectedAnalyses.length} Analysis${selectedAnalyses.length !== 1 ? 'es' : ''}`
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          {Object.keys(results).length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {Object.entries(results).map(([analysisType, result]) => {
                const analysis = availableAnalyses.find(a => a.id === analysisType);
                return (
                  <div key={analysisType} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{analysis?.name}</h3>
                    
                    {result.status === 'loading' && (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <span className="ml-3 text-gray-600">Analyzing...</span>
                      </div>
                    )}
                    
                    {result.status === 'success' && result.data ? (
                      <div className="bg-gray-50 rounded-lg p-6">
                        {formatResult(analysisType, result.data)}
                      </div>
                    ) : null}
                    
                    {result.status === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">!</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-800">Analysis Failed</h4>
                            <p className="text-red-700">{result.error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
