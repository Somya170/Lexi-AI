// src/App.tsx
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DocumentViewer from "./components/DocumentViewer";
import Chatbot from "./components/Chatbot";
import { Document } from "./types";
import { loadDocument, processPastedText } from "./utils/simulatedAi";

function App() {
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

  // demo reveal state (image uploads)
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [showLoan, setShowLoan] = useState(false);
  const [showRent, setShowRent] = useState(false);

  // paste-processing state
  const [isProcessingPaste, setIsProcessingPaste] = useState(false);

  // load existing hardcoded docs
  const handleLoadDocument = (docId: string) => {
    const doc = loadDocument(docId);
    if (doc) setCurrentDocument(doc);
  };

  // called by Sidebar after image upload (demo reveal)
  const handleImageUpload = (file: File) => {
    setUploadedImages((prev) => {
      const next = [...prev, file];
      if (prev.length === 0) {
        setShowLoan(true);
        const loan = loadDocument("loan-agreement");
        if (loan) setCurrentDocument(loan);
      } else if (prev.length === 1) {
        setShowRent(true);
        const rent = loadDocument("rent-agreement");
        if (rent) setCurrentDocument(rent);
      }
      return next;
    });
  };

  // called when user submits paste-text from Sidebar modal
  const handlePasteSubmit = async (text: string) => {
    setIsProcessingPaste(true);

    try {
      // process pasted text (simulated)
      const doc = await processPastedText(text);

      // small visual delay for realism (already simulated inside processPastedText)
      setCurrentDocument(doc);
    } catch (err) {
      console.error("Paste processing failed:", err);
      window.alert("Failed to process pasted text (demo).");
    } finally {
      setIsProcessingPaste(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />

      <div className="flex h-[calc(100vh-120px)]">
        <Sidebar
          onLoadDocument={handleLoadDocument}
          currentDocument={currentDocument}
          onImageUpload={handleImageUpload}
          showLoan={showLoan}
          showRent={showRent}
          onPasteSubmit={handlePasteSubmit}
        />

        <main className="flex-1 p-6 relative">
          {isProcessingPaste && (
            <div className="absolute inset-0 z-40 flex items-center justify-center">
              <div className="w-full max-w-md p-6 glass-card rounded-2xl text-center">
                <div className="text-lg font-semibold mb-3">Processing pasted text…</div>
                <div className="h-3 bg-white/30 rounded-full overflow-hidden mb-4">
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 animate-progress" style={{ width: "80%" }} />
                </div>
                <div className="text-sm text-gray-600">This is a demo — no data leaves your browser.</div>
              </div>
            </div>
          )}

          {currentDocument ? (
            <DocumentViewer document={currentDocument} />
          ) : (
            <div className="flex-1 glass-card rounded-2xl flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-card rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to LexiAI</h2>
                <p className="text-gray-600 mb-6">
                  Transform complex legal documents into simple language summaries with AI-powered risk analysis.
                </p>
                <p className="text-sm text-gray-500">
                  
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <Chatbot document={currentDocument} />
    </div>
  );
}

export default App;
