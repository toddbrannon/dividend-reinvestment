import React from 'react';
import { X } from 'lucide-react';
import calculationDocs from '../docs/CALCULATIONS.md?raw';
import { marked } from 'marked';

interface HowItWorksProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorks({ isOpen, onClose }: HowItWorksProps) {
  if (!isOpen) return null;

  // Convert markdown to HTML
  const htmlContent = marked(calculationDocs);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-green-100">
          <h2 className="text-2xl font-bold text-green-900">How It Works</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-green-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-green-700" />
          </button>
        </div>
        <div 
          className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] prose prose-green max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}