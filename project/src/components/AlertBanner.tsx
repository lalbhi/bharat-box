import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface AlertBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
  message: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ 
  isVisible, 
  onDismiss, 
  message 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-red-600 border-b-2 border-red-500 shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white font-semibold">{message}</span>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-red-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};