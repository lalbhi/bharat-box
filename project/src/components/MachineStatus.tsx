import React from 'react';
import { Shield, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MachineCondition } from '../types/sensors';

interface MachineStatusProps {
  condition: MachineCondition;
}

export const MachineStatus: React.FC<MachineStatusProps> = ({ condition }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'strong':
        return {
          icon: Shield,
          color: 'text-green-400',
          bgColor: 'from-green-500/20 to-green-700/20',
          borderColor: 'border-green-500',
          title: 'STRONG',
          description: 'Machine operating optimally'
        };
      case 'neutral':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-400',
          bgColor: 'from-yellow-500/20 to-yellow-700/20',
          borderColor: 'border-yellow-500',
          title: 'NEUTRAL',
          description: 'Machine requires attention'
        };
      case 'weak':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bgColor: 'from-red-500/20 to-red-700/20',
          borderColor: 'border-red-500',
          title: 'WEAK',
          description: 'Machine needs immediate action'
        };
      default:
        return {
          icon: Minus,
          color: 'text-gray-400',
          bgColor: 'from-gray-500/20 to-gray-700/20',
          borderColor: 'border-gray-500',
          title: 'UNKNOWN',
          description: 'Status unavailable'
        };
    }
  };

  const config = getStatusConfig(condition.status);
  const Icon = config.icon;

  const getTrendIcon = () => {
    if (condition.score >= 80) return TrendingUp;
    if (condition.score <= 40) return TrendingDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className={`bg-gradient-to-br ${config.bgColor} rounded-2xl p-8 border-2 ${config.borderColor} shadow-2xl`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full bg-gray-800 ${config.color}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{config.title}</h2>
            <p className="text-gray-300 text-lg">{config.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-5xl font-bold ${config.color}`}>
            {condition.score}
          </div>
          <div className="text-gray-400 text-sm flex items-center gap-1">
            <TrendIcon className="w-4 h-4" />
            Health Score
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Health Score</span>
          <span>{condition.score}/100</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className={`bg-gradient-to-r ${config.color.replace('text-', 'from-').replace('-400', '-500')} to-${config.color.replace('text-', '').replace('-400', '-700')} h-3 rounded-full transition-all duration-1000`}
            style={{ width: `${condition.score}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-semibold mb-3">Condition Factors:</h3>
        {condition.factors.map((factor, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')}`} />
            <span className="text-gray-300 text-sm">{factor}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-gray-400 text-xs">
          Last Updated: {condition.lastUpdated.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};