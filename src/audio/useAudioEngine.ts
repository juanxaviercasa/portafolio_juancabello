import { useCallback, useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import type { ConcertFrequency } from '../store/usePortfolioStore';
import { audioSynthesizer } from './AudioSynthesizer';

export function useAudioEngine() {
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);
  const audioSettings = usePortfolioStore((state) => state.audioSettings);
  const setFundamentalFreq = usePortfolioStore((state) => state.setFundamentalFreq);
  const toggleConcertModeStore = usePortfolioStore((state) => state.toggleConcertMode);
  const labParams = usePortfolioStore((state) => state.labParams);

  // Sincronizar dinámicas del Math Lab con el concierto en tiempo real
  useEffect(() => {
    if (!isAudioMuted) {
      audioSynthesizer.updateDynamics(labParams.harmonics, labParams.speed);
    }
  }, [isAudioMuted, labParams.harmonics, labParams.speed]);

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

  const activateAudio = useCallback(() => {
    audioSynthesizer.resume();
    audioSynthesizer.playActivationChime(audioSettings.fundamentalFreq);
    audioSynthesizer.startAmbientSoundscape(
      audioSettings.fundamentalFreq,
      audioSettings.isConcertMode
    );
  }, [audioSettings.fundamentalFreq, audioSettings.isConcertMode]);

  const deactivateAudio = useCallback(() => {
    audioSynthesizer.stopAmbientSoundscape();
  }, []);

  const changeFrequency = useCallback(
    (newFreq: ConcertFrequency) => {
      setFundamentalFreq(newFreq);
      if (!isAudioMuted) {
        audioSynthesizer.setFundamentalFrequency(newFreq);
        audioSynthesizer.playCrystalPianoNote(newFreq * 1.5, 0.12);
      }
    },
    [isAudioMuted, setFundamentalFreq]
  );

  const toggleConcertMode = useCallback(() => {
    const nextMode = !audioSettings.isConcertMode;
    toggleConcertModeStore();
    if (!isAudioMuted) {
      audioSynthesizer.setConcertMode(nextMode);
      audioSynthesizer.playInteractionTick(nextMode ? 880 : 440, 0.1);
    }
  }, [audioSettings.isConcertMode, isAudioMuted, toggleConcertModeStore]);

  return {
    playTick,
    playSectionTone,
    playLabModulation,
    activateAudio,
    deactivateAudio,
    changeFrequency,
    toggleConcertMode,
    audioSettings,
    isMuted: isAudioMuted,
  };
}
