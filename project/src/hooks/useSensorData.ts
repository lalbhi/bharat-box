import { useState, useEffect } from 'react';
import { SensorData, SensorReading, MachineCondition } from '../types/sensors';

const initialSensors: SensorReading[] = [
  {
    id: 'vibration',
    name: 'Vibration',
    value: 2.5,
    unit: 'mm/s',
    status: 'normal',
    threshold: { min: 0, max: 10, warning: 5, critical: 8 },
    icon: 'Activity'
  },
  {
    id: 'temperature',
    name: 'Temperature',
    value: 45,
    unit: '°C',
    status: 'normal',
    threshold: { min: -20, max: 100, warning: 70, critical: 85 },
    icon: 'Thermometer'
  },
  {
    id: 'pressure',
    name: 'Pressure',
    value: 15.2,
    unit: 'bar',
    status: 'normal',
    threshold: { min: 0, max: 50, warning: 35, critical: 45 },
    icon: 'Gauge'
  },
  {
    id: 'current',
    name: 'Current',
    value: 8.3,
    unit: 'A',
    status: 'normal',
    threshold: { min: 0, max: 20, warning: 15, critical: 18 },
    icon: 'Zap'
  },
  {
    id: 'voltage',
    name: 'Voltage',
    value: 230,
    unit: 'V',
    status: 'normal',
    threshold: { min: 0, max: 300, warning: 250, critical: 280 },
    icon: 'Battery'
  },
  {
    id: 'rpm',
    name: 'RPM/Speed',
    value: 1450,
    unit: 'RPM',
    status: 'normal',
    threshold: { min: 0, max: 3000, warning: 2500, critical: 2800 },
    icon: 'RotateCw'
  },
  {
    id: 'oil',
    name: 'Oil Quality',
    value: 85,
    unit: '%',
    status: 'normal',
    threshold: { min: 0, max: 100, warning: 40, critical: 20 },
    icon: 'Droplet'
  },
  {
    id: 'acoustic',
    name: 'Acoustic',
    value: 65,
    unit: 'dB',
    status: 'normal',
    threshold: { min: 0, max: 120, warning: 85, critical: 100 },
    icon: 'Volume2'
  },
  {
    id: 'humidity',
    name: 'Humidity',
    value: 45,
    unit: '%',
    status: 'normal',
    threshold: { min: 0, max: 100, warning: 80, critical: 90 },
    icon: 'Cloud'
  }
];

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    timestamp: new Date(),
    sensors: initialSensors,
    condition: {
      status: 'strong',
      score: 85,
      factors: ['All systems optimal'],
      lastUpdated: new Date()
    }
  });

  const calculateCondition = (sensors: SensorReading[]): MachineCondition => {
    let totalScore = 0;
    let criticalCount = 0;
    let warningCount = 0;
    const factors: string[] = [];

    sensors.forEach(sensor => {
      let sensorScore = 100;
      
      if (sensor.value >= sensor.threshold.critical || sensor.value <= (sensor.threshold.min + 1)) {
        sensorScore = 20;
        criticalCount++;
        factors.push(`${sensor.name} critical`);
        sensor.status = 'critical';
      } else if (sensor.value >= sensor.threshold.warning) {
        sensorScore = 60;
        warningCount++;
        factors.push(`${sensor.name} warning`);
        sensor.status = 'warning';
      } else {
        sensor.status = 'normal';
      }
      
      totalScore += sensorScore;
    });

    const averageScore = totalScore / sensors.length;
    
    let status: 'weak' | 'neutral' | 'strong';
    if (criticalCount > 2 || averageScore < 40) {
      status = 'weak';
    } else if (warningCount > 3 || averageScore < 70) {
      status = 'neutral';
    } else {
      status = 'strong';
    }

    if (factors.length === 0) {
      factors.push('All systems optimal');
    }

    return {
      status,
      score: Math.round(averageScore),
      factors,
      lastUpdated: new Date()
    };
  };

  const simulateReading = (sensor: SensorReading): number => {
    const variance = (sensor.threshold.max - sensor.threshold.min) * 0.1;
    const change = (Math.random() - 0.5) * variance * 0.2;
    let newValue = sensor.value + change;
    
    // Keep within reasonable bounds
    newValue = Math.max(sensor.threshold.min, Math.min(sensor.threshold.max, newValue));
    
    return Math.round(newValue * 100) / 100;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => {
        const updatedSensors = prev.sensors.map(sensor => ({
          ...sensor,
          value: simulateReading(sensor)
        }));

        const condition = calculateCondition(updatedSensors);

        return {
          timestamp: new Date(),
          sensors: updatedSensors,
          condition
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return sensorData;
};