import React from 'react';
import { AlertTriangle, X, Phone, Mail, Bell } from 'lucide-react';
import { MachineCondition } from '../types/sensors';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  condition: MachineCondition;
  onAcknowledge: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ 
  isOpen, 
  onClose, 
  condition, 
  onAcknowledge 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl border-2 border-red-500 shadow-2xl max-w-md w-full animate-pulse">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-red-500/20 border border-red-500">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-400">CRITICAL ALERT</h2>
                <p className="text-gray-300 text-sm">Machine Health Compromised</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Alert Content */}
          <div className="mb-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
              <h3 className="text-white font-semibold mb-2">Machine Status: WEAK</h3>
              <p className="text-gray-300 text-sm mb-3">
                The machine health score has dropped to {condition.score}/100. 
                Immediate attention required to prevent potential failure.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-red-400 font-medium text-sm">Critical Issues:</h4>
                {condition.factors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-gray-300 text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-gray-400 text-xs">
              Alert triggered at: {condition.lastUpdated.toLocaleString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onAcknowledge}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Acknowledge Alert
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Support
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};