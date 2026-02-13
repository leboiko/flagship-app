import { useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

export function useSound() {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playStake = async () => {
    try {
      // In production, load actual sound files
      // For prototype, we just use haptics as audio feedback
    } catch (e) {
      // Silent fail for prototype
    }
  };

  const playSuccess = async () => {
    try {
      // Placeholder for success sound
    } catch (e) {
      // Silent fail
    }
  };

  const playSwipe = async () => {
    try {
      // Placeholder for swipe sound
    } catch (e) {
      // Silent fail
    }
  };

  return { playStake, playSuccess, playSwipe };
}
