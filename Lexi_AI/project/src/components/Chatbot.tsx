import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Document, ChatMessage } from '../types';
import { chat, getExampleQuestions } from '../utils/simulatedAi';

interface ChatbotProps {
  document: Document | null;
}

export default function Chatbot({ document }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const exampleQuestions = getExampleQuestions(document);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = chat(document, message);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response.answerText + "\n\nThis is not legal advice. For legal action, consult a lawyer.",
      isUser: false,
      timestamp: new Date(),
      sourceClauseId: response.sourceClauseId,
      confidence: response.confidence
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleExampleClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-card rounded-full shadow-lg flex items-center justify-center text-white z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-96 h-full glass-card rounded-l-2xl rounded-r-none border-r-0 flex flex-col z-40"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-card rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">LexiAI Assistant</h3>
                  <p className="text-xs text-gray-600">Ask about your document</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Example Questions */}
            {messages.length === 0 && exampleQuestions.length > 0 && (
              <div className="p-4 border-b border-white/20">
                <p className="text-sm font-medium text-gray-900 mb-3">Try asking:</p>
                <div className="space-y-2">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(question)}
                      className="w-full text-left p-2 text-sm bg-white/40 hover:bg-white/60 rounded-lg border border-white/30 transition-all duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-8">
                  {document ? 'Ask me anything about your document!' : 'Please load a document first'}
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <div className="w-6 h-6 bg-gradient-card rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-xs rounded-xl p-3 ${
                    message.isUser 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white/60 text-gray-800'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                    {message.confidence && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          message.confidence === 'High' ? 'bg-green-100 text-green-800' :
                          message.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {message.confidence} Confidence
                        </span>
                      </div>
                    )}
                  </div>

                  {message.isUser && (
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-6 h-6 bg-gradient-card rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-white/60 rounded-xl p-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder={document ? "Ask about your document..." : "Load a document first"}
                  disabled={!document}
                  className="flex-1 px-3 py-2 bg-white/40 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!document || !inputValue.trim()}
                  className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}