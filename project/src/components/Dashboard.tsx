import React from 'react';
import { Settings, Download, RefreshCw, Wifi } from 'lucide-react';
import { SensorCard } from './SensorCard';
import { MachineStatus } from './MachineStatus';
import { AlertModal } from './AlertModal';
import { AlertBanner } from './AlertBanner';
import { useSensorData } from '../hooks/useSensorData';
import { useAlertSystem } from '../hooks/useAlertSystem';

export const Dashboard: React.FC = () => {
  const sensorData = useSensorData();
  const alertSystem = useAlertSystem(sensorData.condition);

  const criticalSensors = sensorData.sensors.filter(s => s.status === 'critical').length;
  const warningSensors = sensorData.sensors.filter(s => s.status === 'warning').length;
  const normalSensors = sensorData.sensors.filter(s => s.status === 'normal').length;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Alert Banner */}
      <AlertBanner
        isVisible={alertSystem.showBanner}
        onDismiss={alertSystem.dismissBanner}
        message={alertSystem.alertMessage}
      />
      
      {/* Alert Modal */}
      <AlertModal
        isOpen={alertSystem.showModal}
        onClose={alertSystem.closeModal}
        condition={sensorData.condition}
        onAcknowledge={alertSystem.acknowledgeAlert}
      />

      <div className={`p-6 ${alertSystem.showBanner ? 'pt-20' : ''} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">IoT Smart Box Kit</h1>
            <p className="text-gray-400">Real-time machine condition monitoring</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg border border-green-500">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">Connected</span>
            </div>
            <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-300" />
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-gray-300" />
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{normalSensors}</div>
            <div className="text-gray-400 text-sm">Normal Sensors</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">{warningSensors}</div>
            <div className="text-gray-400 text-sm">Warning Sensors</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400">{criticalSensors}</div>
            <div className="text-gray-400 text-sm">Critical Sensors</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{sensorData.sensors.length}</div>
            <div className="text-gray-400 text-sm">Total Sensors</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Machine Status - Takes up full width on mobile, 1/3 on desktop */}
          <div className="lg:col-span-1">
            <MachineStatus condition={sensorData.condition} />
          </div>

          {/* Sensor Grid - Takes up full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sensorData.sensors.map((sensor) => (
                <SensorCard key={sensor.id} sensor={sensor} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 IoT Smart Box Kit - Real-time Monitoring System</p>
          <p className="mt-1">Last sync: {sensorData.timestamp.toLocaleString()}</p>
        </div>
      </div>
      </div>
    </div>
  );
};