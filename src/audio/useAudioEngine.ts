import { useCallback, useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import type { ConcertFrequency } from '../store/usePortfolioStore';
import { audioSynthesizer } from './AudioSynthesizer';
import { orchestralMathEngine, MathHarmonicQuantizer } from './OrchestralMathEngine';
import type { OrchestralScale, SpatialChordOptions } from './OrchestralMathEngine';

export function useAudioEngine() {
  const isAudioMuted = usePortfolioStore((state) => state.isAudioMuted);
  const audioSettings = usePortfolioStore((state) => state.audioSettings);
  const setFundamentalFreq = usePortfolioStore((state) => state.setFundamentalFreq);
  const toggleConcertModeStore = usePortfolioStore((state) => state.toggleConcertMode);
  const labParams = usePortfolioStore((state) => state.labParams);

  // Sincronizar estado de silencio con ambos motores
  useEffect(() => {
    orchestralMathEngine.setMute(isAudioMuted);
    audioSynthesizer.setMute(isAudioMuted);
  }, [isAudioMuted]);

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
        // Resonancia orquestal espacial para cambios de sección
        const scales: OrchestralScale[] = ['lydian', 'dorian', 'harmonic_minor', 'major_pentatonic', 'overtone_series'];
        const selectedScale = scales[sectionIndex % scales.length];
        orchestralMathEngine.playSpatialChord(sectionIndex * 2 + 1, {
          scale: selectedScale,
          duration: 2.2,
          velocity: 0.6,
          spread: 0.85,
        });
      }
    },
    [isAudioMuted]
  );

  const playLabModulation = useCallback(
    (harmonics: number, freq = 360) => {
      if (!isAudioMuted) {
        audioSynthesizer.playMathLabPulse(harmonics, freq);
        // Voicing orquestal modal para armónicos
        orchestralMathEngine.playSpatialChord(harmonics, {
          scale: 'overtone_series',
          duration: 1.5,
          velocity: 0.5 + Math.min(harmonics / 12, 0.4),
          spread: 0.75,
        });
      }
    },
    [isAudioMuted]
  );

  const playSpatialChord = useCallback(
    (mathVal: number, options?: SpatialChordOptions) => {
      if (!isAudioMuted) {
        orchestralMathEngine.playSpatialChord(mathVal, options);
      }
    },
    [isAudioMuted]
  );

  const triggerFibonacciCascade = useCallback(
    (terms = 7, scale: OrchestralScale = 'lydian') => {
      if (!isAudioMuted) {
        orchestralMathEngine.triggerFibonacciCascade(terms, scale);
      }
    },
    [isAudioMuted]
  );

  const processScrollDynamics = useCallback(
    (scrollY: number, maxScrollY: number) => {
      if (!isAudioMuted) {
        orchestralMathEngine.processScrollDynamics(scrollY, maxScrollY);
      }
    },
    [isAudioMuted]
  );

  const setAudioMuted = usePortfolioStore((state) => state.setAudioMuted);

  const activateAudio = useCallback(async () => {
    setAudioMuted(false);
    audioSynthesizer.setMute(false);
    orchestralMathEngine.setMute(false);
    const ctx = audioSynthesizer.initContext();
    if (ctx) {
      await orchestralMathEngine.init(ctx, audioSynthesizer.getCompressor() || undefined);
    }
    audioSynthesizer.resume();
    audioSynthesizer.playActivationChime(audioSettings.fundamentalFreq);
    audioSynthesizer.startAmbientSoundscape(
      audioSettings.fundamentalFreq,
      audioSettings.isConcertMode
    );
  }, [audioSettings.fundamentalFreq, audioSettings.isConcertMode, setAudioMuted]);

  const deactivateAudio = useCallback(() => {
    setAudioMuted(true);
    audioSynthesizer.setMute(true);
    orchestralMathEngine.setMute(true);
    audioSynthesizer.stopAmbientSoundscape();
  }, [setAudioMuted]);

  const toggleAudio = useCallback(() => {
    if (isAudioMuted) {
      activateAudio();
    } else {
      deactivateAudio();
    }
  }, [isAudioMuted, activateAudio, deactivateAudio]);

  const getAnalyser = useCallback(() => {
    return audioSynthesizer.getAnalyser();
  }, []);

  const changeFrequency = useCallback(
    (newFreq: ConcertFrequency) => {
      setFundamentalFreq(newFreq);
      if (!isAudioMuted) {
        audioSynthesizer.setFundamentalFrequency(newFreq);
        audioSynthesizer.playCrystalPianoNote(newFreq * 1.5, 0.12);
        orchestralMathEngine.playSpatialChord(1, {
          rootFreq: newFreq,
          scale: 'lydian',
          duration: 2.0,
          velocity: 0.65,
        });
      }
    },
    [isAudioMuted, setFundamentalFreq]
  );

  const toggleConcertMode = useCallback(() => {
    const nextMode = !audioSettings.isConcertMode;
    toggleConcertModeStore();
    if (isAudioMuted) {
      activateAudio();
      audioSynthesizer.setConcertMode(nextMode);
    } else {
      audioSynthesizer.setConcertMode(nextMode);
      audioSynthesizer.playInteractionTick(nextMode ? 880 : 440, 0.1);
      orchestralMathEngine.setConcertHallWetness(nextMode ? 0.6 : 0.25);
    }
  }, [audioSettings.isConcertMode, isAudioMuted, toggleConcertModeStore, activateAudio]);

  return {
    playTick,
    playSectionTone,
    playLabModulation,
    playSpatialChord,
    triggerFibonacciCascade,
    processScrollDynamics,
    activateAudio,
    deactivateAudio,
    toggleAudio,
    changeFrequency,
    toggleConcertMode,
    getAnalyser,
    audioSettings,
    isMuted: isAudioMuted,
    orchestralEngine: orchestralMathEngine,
    quantizer: MathHarmonicQuantizer,
  };
}
