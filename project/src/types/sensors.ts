export interface SensorReading {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  threshold: {
    min: number;
    max: number;
    warning: number;
    critical: number;
  };
  icon: string;
}

export interface MachineCondition {
  status: 'weak' | 'neutral' | 'strong';
  score: number;
  factors: string[];
  lastUpdated: Date;
}

export interface SensorData {
  timestamp: Date;
  sensors: SensorReading[];
  condition: MachineCondition;
}