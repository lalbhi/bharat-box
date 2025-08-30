# IoT Smart Box Kit Dashboard

A comprehensive real-time monitoring dashboard for IoT Smart Box Kit that tracks machine health through multiple sensors and provides intelligent condition assessment.

## 🚀 Features

- **Real-time Sensor Monitoring**: Track 9 different sensor types including vibration, temperature, pressure, current, voltage, RPM, oil quality, acoustic, and humidity
- **Machine Condition Prediction**: Intelligent algorithm that analyzes sensor data to predict machine health (Strong/Neutral/Weak)
- **Alert System**: Automated alerts with modal popups, sound notifications, and persistent banners when machine health becomes critical
- **Interactive Dashboard**: Beautiful dark theme with animated gauges, color-coded status indicators, and smooth transitions
- **Responsive Design**: Optimized for desktop and mobile monitoring
- **Data Visualization**: Real-time charts and progress bars for each sensor
- **Export Capabilities**: Download sensor reports and historical data

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📊 Monitored Sensors

1. **Vibration Sensor/Accelerometer** - Monitors machine vibrations (mm/s)
2. **Temperature Sensor** - RTD/Thermocouple/Infrared temperature monitoring (°C)
3. **Pressure Sensor** - System pressure monitoring (bar)
4. **Current Sensor** - Hall-effect current measurement (A)
5. **Voltage Sensor** - Electrical voltage monitoring (V)
6. **RPM/Speed Sensor** - Optical encoder/Proximity sensor for rotation speed (RPM)
7. **Oil Quality Sensor** - Oil condition assessment (%)
8. **Ultrasonic/Acoustic Sensor** - Sound level monitoring (dB)
9. **Humidity Sensor** - Environmental humidity tracking (%)

## 🎯 Machine Condition Algorithm

The system uses a sophisticated algorithm that:
- Analyzes all sensor readings against predefined thresholds
- Calculates individual sensor health scores
- Determines overall machine condition based on critical and warning factors
- Provides real-time health score (0-100)
- Triggers alerts when conditions deteriorate

### Condition States:
- **Strong (80-100)**: All systems optimal, machine operating efficiently
- **Neutral (40-79)**: Some sensors showing warnings, attention required
- **Weak (0-39)**: Critical issues detected, immediate action needed

## 🚨 Alert System

When machine health becomes **Weak**:
- Immediate modal popup with critical alert details
- Audio notification to grab attention
- Persistent red banner until acknowledged
- Detailed breakdown of critical factors
- Quick action buttons for support contact

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd iot-smart-box-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Usage

1. **Dashboard Overview**: View all sensor readings at a glance
2. **Machine Status**: Monitor overall health score and condition factors
3. **Individual Sensors**: Click on sensor cards for detailed information
4. **Alert Management**: Acknowledge alerts when machine health is critical
5. **Data Export**: Download reports for analysis and record-keeping

## 🔧 Configuration

### Sensor Thresholds

Each sensor has configurable thresholds in `src/hooks/useSensorData.ts`:
- **Min/Max**: Operating range limits
- **Warning**: Threshold for caution status
- **Critical**: Threshold for immediate action

### Alert Settings

Alert behavior can be customized in `src/hooks/useAlertSystem.ts`:
- Sound notification settings
- Alert acknowledgment behavior
- Banner display duration

## 📈 Data Simulation

The current implementation includes realistic sensor data simulation for demonstration purposes. In a production environment, replace the simulation logic in `useSensorData.ts` with actual sensor data integration.

## 🎨 Customization

### Styling
- Modify colors and themes in `tailwind.config.js`
- Update component styles in individual component files
- Customize animations in `src/index.css`

### Sensors
- Add new sensor types in `src/types/sensors.ts`
- Update the sensor array in `src/hooks/useSensorData.ts`
- Create new sensor cards as needed

## 🚀 Deployment

This project is configured for easy deployment to:
- Netlify (recommended)
- Vercel
- GitHub Pages
- Any static hosting service

## 📄 License

MIT License - feel free to use this project for your IoT monitoring needs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For technical support or questions about the IoT Smart Box Kit dashboard, please create an issue in this repository.

---

**Live Demo**: [View Dashboard](https://ubiquitous-medovik-a18e86.netlify.app)