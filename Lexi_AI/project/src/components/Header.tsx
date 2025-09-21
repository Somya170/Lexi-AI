import React from 'react';
import { Scale, AlertTriangle } from 'lucide-react';

export default function Header() {
  return (
    <>
      {/* Demo Disclaimer Banner */}
      

      {/* Main Header */}
      <header className="glass-card rounded-none border-x-0 border-t-0 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-card rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">LexiAI</h1>
              <p className="text-sm text-gray-600">Legal made simple</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            
          </div>
        </div>
      </header>
    </>
  );
}