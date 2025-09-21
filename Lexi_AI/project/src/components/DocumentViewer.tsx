import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, CheckCircle } from 'lucide-react';
import { Document, TabType } from '../types';
import ClauseCard from './ClauseCard';
import DownloadReport from './DownloadReport';

interface DocumentViewerProps {
  document: Document;
}

export default function DocumentViewer({ document }: DocumentViewerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'summary', label: 'Summary' },
    { id: 'original', label: 'Original' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'risks', label: 'Risk Analysis', count: document.risks.length }
  ];

  const handleCopySummary = async () => {
    const summaryText = document.simplified.join('\n• ');
    await navigator.clipboard.writeText(`• ${summaryText}`);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const getRiskyExcerpts = () => {
    return document.risks.map(risk => ({
      text: risk.excerpt,
      risk: risk.risk,
      id: risk.id
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 glass-card rounded-l-2xl rounded-r-none border-r-0 overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-white/20 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{document.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Uploaded {new Date(document.uploadedAt || '').toLocaleDateString()}</span>
              <span>•</span>
              <span>{document.clauses.length} clauses identified</span>
            </div>
          </div>
          <DownloadReport document={document} />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/20">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 text-primary-600 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 overflow-auto flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Simplified in Plain English
                </h2>
                <button
                  onClick={handleCopySummary}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-white/40 hover:bg-white/60 border border-white/30 rounded-lg transition-all duration-200"
                >
                  {copiedSummary ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedSummary ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="space-y-3">
                {document.simplified.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/40 rounded-xl border border-white/30"
                  >
                    <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 font-medium">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'original' && (
            <motion.div
              key="original"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Original Document</h2>
              <div className="bg-white/40 rounded-xl border border-white/30 p-6">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-mono">
                  {document.originalText}
                </pre>
              </div>
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Side-by-Side Comparison</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Original (Risky Parts Highlighted)</h3>
                  <div className="bg-white/40 rounded-xl border border-white/30 p-4 h-96 overflow-auto">
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {document.originalText.split('\n').map((paragraph, index) => {
                        const riskyExcerpts = getRiskyExcerpts();
                        let highlightedParagraph = paragraph;
                        
                        riskyExcerpts.forEach((excerpt) => {
                          const regex = new RegExp(`(${excerpt.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                          const riskColor = excerpt.risk === 'high' ? 'bg-red-200' : 
                                          excerpt.risk === 'medium' ? 'bg-yellow-200' : 'bg-orange-200';
                          highlightedParagraph = highlightedParagraph.replace(regex, `<mark class="${riskColor} rounded px-1">$1</mark>`);
                        });
                        
                        return (
                          <div key={index} className="mb-4">
                            <div dangerouslySetInnerHTML={{ __html: highlightedParagraph }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Simplified Version</h3>
                  <div className="bg-white/40 rounded-xl border border-white/30 p-4 h-96 overflow-auto">
                    <div className="space-y-3">
                      {document.simplified.map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            ✓
                          </div>
                          <p className="text-sm text-gray-700 font-medium">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'risks' && (
            <motion.div
              key="risks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Risk Analysis</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{document.risks.length} risks identified</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {document.risks.map((risk, index) => (
                  <motion.div
                    key={risk.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ClauseCard risk={risk} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}