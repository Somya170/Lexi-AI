import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { RiskItem } from '../types';

interface ClauseCardProps {
  risk: RiskItem;
}

export default function ClauseCard({ risk }: ClauseCardProps) {
  const [showELI5, setShowELI5] = useState(false);

  const getRiskIcon = () => {
    switch (risk.risk) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium': return <Info className="w-5 h-5 text-yellow-500" />;
      case 'low': return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getRiskColor = () => {
    switch (risk.risk) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getConfidenceColor = () => {
    switch (risk.confidence) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getELI5Explanation = () => {
    switch (risk.id) {
      case 'loan-risk-1':
        return "It's like someone can call and say 'pay me everything now' with just 15 days notice.";
      case 'loan-risk-2':
        return "If you can't pay or go broke, they can ask for all the money immediately.";
      case 'loan-risk-3':
        return "You can only go to court in one specific place, which might be far from you.";
      case 'rent-risk-1':
        return "Like a subscription that automatically costs 20% more when you renew.";
      case 'rent-risk-2':
        return "Like paying for something but not knowing if you'll get your deposit back.";
      case 'rent-risk-3':
        return "Both you and landlord only need to give 30 days notice to end the lease.";
      default:
        return "This clause might have unexpected consequences in certain situations.";
    }
  };

  const getSuggestedActions = () => {
    switch (risk.risk) {
      case 'high':
        return [
          'Negotiate different terms before signing',
          'Consult with a lawyer for alternatives'
        ];
      case 'medium':
        return [
          'Understand the implications fully',
          'Consider asking for clarification'
        ];
      case 'low':
        return [
          'Be aware of this provision',
          'Keep this in mind for future reference'
        ];
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          {getRiskIcon()}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 text-xs font-medium border rounded-full uppercase ${getRiskColor()}`}>
                {risk.risk} Risk
              </span>
              <span className={`px-2 py-1 text-xs border rounded-full ${getConfidenceColor()}`}>
                {risk.confidence} Confidence
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Excerpt */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
        <p className="text-sm text-gray-700 font-mono leading-relaxed">
          "{risk.excerpt}"
        </p>
      </div>

      {/* Explanation */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">What this means:</h4>
        <p className="text-gray-700">{risk.explanation}</p>
      </div>

      {/* ELI5 Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowELI5(!showELI5)}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Explain like I'm 5</span>
          {showELI5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {showELI5 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-sm text-blue-800">{getELI5Explanation()}</p>
          </motion.div>
        )}
      </div>

      {/* Suggested Actions */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Suggested actions:</h4>
        <ul className="space-y-1">
          {getSuggestedActions().map((action, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-primary-500 mt-1">•</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}