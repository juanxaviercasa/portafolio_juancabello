import { useCallback } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { audioSynthesizer } from './AudioSynthesizer';

export function useAudioEngine() {
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);

  const playTick = useCallback(
    (freq = 900) => {
      if (!isAudioMuted) {
        audioSynthesizer.playInteractionTick(freq);
      }
    },
    [isAudioMuted]
  );

  const playSectionTone = useCallback(
    (sectionIndex: number) => {
      if (!isAudioMuted) {
        audioSynthesizer.playSectionMilestone(sectionIndex);
      }
    },
    [isAudioMuted]
  );

  const playLabModulation = useCallback(
    (harmonics: number, freq = 360) => {
      if (!isAudioMuted) {
        audioSynthesizer.playMathLabPulse(harmonics, freq);
      }
    },
    [isAudioMuted]
  );

  return {
    playTick,
    playSectionTone,
    playLabModulation,
    isMuted: isAudioMuted,
  };
}
