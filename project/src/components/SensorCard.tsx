import React from 'react';
import * as LucideIcons from 'lucide-react';
import { SensorReading } from '../types/sensors';

interface SensorCardProps {
  sensor: SensorReading;
}

export const SensorCard: React.FC<SensorCardProps> = ({ sensor }) => {
  const Icon = LucideIcons[sensor.icon as keyof typeof LucideIcons] as React.ComponentType<any>;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'from-red-500 to-red-700';
      case 'warning': return 'from-yellow-500 to-yellow-700';
      default: return 'from-green-500 to-green-700';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'critical': return 'border-red-500';
      case 'warning': return 'border-yellow-500';
      default: return 'border-green-500';
    }
  };

  const percentage = Math.min(100, (sensor.value / sensor.threshold.max) * 100);

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 ${getStatusBorder(sensor.status)} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full bg-gradient-to-br ${getStatusColor(sensor.status)}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{sensor.name}</h3>
            <p className="text-gray-400 text-sm">Sensor ID: {sensor.id}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">
            {sensor.value}
          </div>
          <div className="text-gray-400 text-sm">{sensor.unit}</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>0</span>
          <span>Status: {sensor.status.toUpperCase()}</span>
          <span>{sensor.threshold.max}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`bg-gradient-to-r ${getStatusColor(sensor.status)} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="text-gray-400">Warning: <span className="text-yellow-400">{sensor.threshold.warning}{sensor.unit}</span></div>
        <div className="text-gray-400">Critical: <span className="text-red-400">{sensor.threshold.critical}{sensor.unit}</span></div>
      </div>
    </div>
  );
};