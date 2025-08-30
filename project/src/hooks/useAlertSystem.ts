import { useState, useEffect, useRef } from 'react';
import { MachineCondition } from '../types/sensors';

export const useAlertSystem = (condition: MachineCondition) => {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [alertSound, setAlertSound] = useState<HTMLAudioElement | null>(null);
  const previousConditionRef = useRef<string>(condition.status);

  // Create alert sound
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createAlertSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playBeep = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800; // High pitch for urgency
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      };

      return { play: playBeep };
    };

    try {
      const sound = createAlertSound();
      setAlertSound(sound as any);
    } catch (error) {
      console.warn('Could not create alert sound:', error);
    }
  }, []);

  // Monitor condition changes
  useEffect(() => {
    const previousCondition = previousConditionRef.current;
    const currentCondition = condition.status;

    // Trigger alert when condition becomes weak
    if (currentCondition === 'weak' && previousCondition !== 'weak' && !isAcknowledged) {
      setShowModal(true);
      setShowBanner(true);
      
      // Play alert sound
      if (alertSound) {
        try {
          alertSound.play();
        } catch (error) {
          console.warn('Could not play alert sound:', error);
        }
      }
    }

    // Reset acknowledgment if condition improves
    if (currentCondition !== 'weak' && previousCondition === 'weak') {
      setIsAcknowledged(false);
      setShowBanner(false);
    }

    previousConditionRef.current = currentCondition;
  }, [condition.status, isAcknowledged, alertSound]);

  const acknowledgeAlert = () => {
    setIsAcknowledged(true);
    setShowModal(false);
    setShowBanner(false);
  };

  const dismissBanner = () => {
    setShowBanner(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    showBanner,
    isAcknowledged,
    acknowledgeAlert,
    dismissBanner,
    closeModal,
    alertMessage: `CRITICAL: Machine health is WEAK (${condition.score}/100) - Immediate attention required!`
  };
};