/**
 * AudioSynthesizer: Motor de audio procedural nativo usando Web Audio API.
 * Orquestación armónica neoclásica / Nueva Era de grado de concierto.
 * Afinación matemática pura en frecuencias sagradas (432Hz, 528Hz, 396Hz, 639Hz).
 * Capas de cuerdas de luz (pad respiratorio) y melodías de piano de cristal / celesta
 * con estricta consonancia armónica, reverberación de auditorio y cero disturbios.
 */

export type ConcertFrequency = 432 | 528 | 396 | 639;

export interface SacredFrequencyInfo {
  freq: ConcertFrequency;
  name: string;
  subtitle: string;
  scaleDescription: string;
  rootNote: string;
  ratios: number[]; // Ratios consonantes de la escala soprano
}

export const SACRED_FREQUENCIES: Record<ConcertFrequency, SacredFrequencyInfo> = {
  432: {
    freq: 432,
    name: '432 Hz',
    subtitle: 'Armonía Áurea & Pitagórica',
    scaleDescription: 'Afinación de Verdi y proporción matemática natural (La = 432 Hz)',
    rootNote: 'La (A4)',
    // Escala modal pura en Just Intonation anclada en la tónica fundamental (1.0 = 432 Hz)
    // [Tónica (1.0), 3ra Mayor (1.25), 5ta (1.5), 6ta Mayor (5/3), 8va (2.0), 9na (2.25), 3ra alta (2.5), 5ta alta (3.0)]
    ratios: [1.0, 1.25, 1.5, 5 / 3, 2.0, 2.25, 2.5, 3.0],
  },
  528: {
    freq: 528,
    name: '528 Hz',
    subtitle: 'Frecuencia Milagro & Transformación',
    scaleDescription: 'Solfeggio sagrado MI, resonancia de la geometría del ADN (Do = 528 Hz)',
    rootNote: 'Do (C5)',
    ratios: [1.0, 1.25, 1.5, 5 / 3, 2.0, 2.25, 2.5, 3.0],
  },
  396: {
    freq: 396,
    name: '396 Hz',
    subtitle: 'Fundamento Telúrico & Liberación',
    scaleDescription: 'Solfeggio UT, enraizamiento, calma profunda y resonancia grave (Sol = 396 Hz)',
    rootNote: 'Sol (G4)',
    // Modo telúrico apacible con 3ra menor dulce (1.2) y 5ta pura (1.5)
    ratios: [1.0, 1.125, 1.2, 1.5, 1.6, 2.0, 2.25, 2.4],
  },
  639: {
    freq: 639,
    name: '639 Hz',
    subtitle: 'Resonancia Cuántica & Conexión',
    scaleDescription: 'Solfeggio FA, armonía interpersonal y éter luminoso celestial (Mi = 639 Hz)',
    rootNote: 'Mi (E5)',
    // Modo pentatónico lírico consonante con 4ta justa y 6ta mayor
    ratios: [1.0, 1.125, 1.25, 4 / 3, 1.5, 5 / 3, 2.0, 2.25],
  },
};

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Parámetros activos del concierto
  private currentFreq: ConcertFrequency = 432;
  private isConcertMode: boolean = true;
  private currentHarmonics: number = 3;
  private currentSpeed: number = 0.8;
  private isMuted: boolean = false;

  // Red de espacialización acústica (Reverb / Stereo Cross-Delay)
  private delayNodeL: DelayNode | null = null;
  private delayNodeR: DelayNode | null = null;
  private feedbackGainL: GainNode | null = null;
  private feedbackGainR: GainNode | null = null;
  private reverbFilter: BiquadFilterNode | null = null;
  private reverbGain: GainNode | null = null;

  // Capa 1: Colchón Armónico / Cuerdas Celestes (Pad continuo)
  private ambientGain: GainNode | null = null;
  private ambientOscs: { osc: OscillatorNode; ratio: number; gainNode?: GainNode }[] = [];
  private ambientFilter: BiquadFilterNode | null = null;
  private isAmbientPlaying: boolean = false;
  private lfoOsc: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private stopTimeoutId: number | null = null;

  // Capa 2: Arpegiador Melódico Neoclásico ("Piano de Cristal / Celesta")
  private melodyTimeoutId: number | null = null;
  private melodyStep: number = 0;

  public initContext(): AudioContext | null {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      this.ctx = new AudioCtx();

      // Compresor de dinámica suave para masterización sedosa sin saturación
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(14, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(2.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.015, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

      // Analizador de señal en tiempo real (FFT y Osciloscopio)
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.82;

      // Cadena de masterización: Compressor -> Master Gain -> Analyser -> Destination
      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      this.initSpatialAcoustics();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      return this.ctx;
    } catch {
      console.warn('Web Audio API no soportado o bloqueado por el navegador.');
      return null;
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getCompressor(): DynamicsCompressorNode | null {
    return this.compressor;
  }

  public getContext(): AudioContext | null {
    return this.ctx;
  }

  public resume() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    try {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      if (muted) {
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.05);
      } else {
        this.masterGain.gain.linearRampToValueAtTime(0.32, now + 0.08);
      }
    } catch {}
  }

  /**
   * Red de reverberación espacial tipo catedral / sala de concierto neoclásico
   */
  private initSpatialAcoustics() {
    if (!this.ctx || !this.compressor) return;

    this.delayNodeL = this.ctx.createDelay();
    this.delayNodeL.delayTime.setValueAtTime(0.32, this.ctx.currentTime);

    this.delayNodeR = this.ctx.createDelay();
    this.delayNodeR.delayTime.setValueAtTime(0.48, this.ctx.currentTime);

    // Ganancias de feedback acotadas estrictamente a 0.22 para evitar acumulación infinita
    this.feedbackGainL = this.ctx.createGain();
    this.feedbackGainL.gain.setValueAtTime(0.22, this.ctx.currentTime);

    this.feedbackGainR = this.ctx.createGain();
    this.feedbackGainR.gain.setValueAtTime(0.22, this.ctx.currentTime);

    // Filtro paso-bajo para simular acústica de madera cálida
    this.reverbFilter = this.ctx.createBiquadFilter();
    this.reverbFilter.type = 'lowpass';
    this.reverbFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    this.reverbGain = this.ctx.createGain();
    this.reverbGain.gain.setValueAtTime(0.26, this.ctx.currentTime);

    // Enrutamiento Ping-Pong espacial cruzado
    this.delayNodeL.connect(this.feedbackGainL);
    this.feedbackGainL.connect(this.delayNodeR);

    this.delayNodeR.connect(this.feedbackGainR);
    this.feedbackGainR.connect(this.delayNodeL);

    this.delayNodeL.connect(this.reverbFilter);
    this.delayNodeR.connect(this.reverbFilter);

    this.reverbFilter.connect(this.reverbGain);
    this.reverbGain.connect(this.compressor);
  }

  public sendToSpatialSpace(node: AudioNode) {
    if (this.delayNodeL && this.delayNodeR) {
      try {
        node.connect(this.delayNodeL);
        node.connect(this.delayNodeR);
      } catch {}
    }
  }

  /**
   * Inicia el concierto armónico procedural neoclásico
   */
  public startAmbientSoundscape(freq: ConcertFrequency = 432, concertMode: boolean = true) {
    this.resume();
    this.currentFreq = freq;
    this.isConcertMode = concertMode;

    // 1. Cancelar cualquier temporizador de apagado pendiente inmediatamente
    if (this.stopTimeoutId !== null) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }

    if (!this.ctx || !this.compressor) return;

    // 2. Si los osciladores ya están vivos y sonando, restablecer suavemente la ganancia
    if (this.isAmbientPlaying && this.ambientGain && this.ambientOscs.length > 0) {
      const now = this.ctx.currentTime;
      try {
        this.ambientGain.gain.cancelScheduledValues(now);
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.09, now + 0.25);
      } catch {}

      if (this.isConcertMode) {
        this.startNeoclassicalMelody();
      }
      return;
    }

    try {
      const now = this.ctx.currentTime;

      // Filtro paso-bajo cálido y aterciopelado para las cuerdas
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(550 + this.currentHarmonics * 100, now);
      this.ambientFilter.Q.setValueAtTime(1.2, now); // Q suave para cero aspereza

      // LFO de respiración acústica lenta (0.035 Hz ~ 28s por ciclo)
      this.lfoOsc = this.ctx.createOscillator();
      this.lfoOsc.type = 'sine';
      this.lfoOsc.frequency.setValueAtTime(0.035, now);

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(100, now);

      this.lfoOsc.connect(this.lfoGain);
      this.lfoGain.connect(this.ambientFilter.frequency);
      this.lfoOsc.start(now);

      // Ganancia del colchón armónico balanceada (0.09) para no opacar la melodía
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.09, now + 0.5);

      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.compressor);

      // Tríada armónica con la tónica fundamental (1.0x) como raíz dominante (100% de presencia)
      // para garantizar perfecta correspondencia acústica con la frecuencia seleccionada
      const partials = [
        { ratio: 1.0, gain: 1.0 },   // Tónica fundamental protagonista (432 Hz)
        { ratio: 0.5, gain: 0.45 },  // Sub-bajo de calidez (216 Hz)
        { ratio: 1.5, gain: 0.28 },  // Quinta armónica dulce (648 Hz)
        { ratio: 2.0, gain: 0.16 },  // Octava etérea (864 Hz)
      ];
      this.ambientOscs = partials.map(({ ratio, gain }) => {
        const osc = this.ctx!.createOscillator();
        const pGain = this.ctx!.createGain();
        pGain.gain.setValueAtTime(gain, now);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * ratio, now);
        osc.connect(pGain);
        pGain.connect(this.ambientFilter!);
        osc.start(now);
        return { osc, ratio, gainNode: pGain };
      });

      this.isAmbientPlaying = true;

      // Iniciar arpegio de piano de cristal si el modo concierto está activo
      if (this.isConcertMode) {
        this.startNeoclassicalMelody();
      }
    } catch (e) {
      console.warn('Error al iniciar concierto armónico procedural:', e);
    }
  }

  /**
   * Cambia dinámicamente la frecuencia fundamental con glissando asintótico sin cortes ni disturbios.
   * Modula suavemente el volumen durante el desplazamiento y confirma armónicamente en la nueva tónica.
   */
  public setFundamentalFrequency(newFreq: ConcertFrequency) {
    if (this.currentFreq === newFreq) return;
    this.currentFreq = newFreq;
    if (!this.ctx || !this.isAmbientPlaying) return;

    const now = this.ctx.currentTime;

    // 1. Suavizado elegante de volumen para evitar cualquier disturbio o golpe de fase
    if (this.ambientGain) {
      try {
        this.ambientGain.gain.cancelScheduledValues(now);
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.03, now + 0.12);
        this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 0.75);
      } catch {}
    }

    // 2. Glissando exponencial suave para cada oscilador del pad armónico
    this.ambientOscs.forEach(({ osc, ratio }) => {
      try {
        osc.frequency.cancelScheduledValues(now);
        osc.frequency.setValueAtTime(osc.frequency.value, now);
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, newFreq * ratio), now + 0.55);
      } catch {
        try {
          osc.frequency.setValueAtTime(newFreq * ratio, now);
        } catch {}
      }
    });

    // 3. Pausar la melodía generativa durante la interpolación para evitar disonancia
    if (this.isConcertMode) {
      this.stopNeoclassicalMelody();
      // Arpegio de campanillas líricas en la nueva tónica una vez asentado el glissando
      setTimeout(() => {
        this.playCrystalPianoNote(newFreq * 2.0, 0.28);
        setTimeout(() => {
          this.playCrystalPianoNote(newFreq * 2.5, 0.25);
          setTimeout(() => {
            this.playCrystalPianoNote(newFreq * 3.0, 0.29);
            // Reanudar la melodía generativa continua en la nueva escala
            this.melodyStep = 0;
            this.melodyTimeoutId = window.setTimeout(() => {
              this.scheduleNextMelodyNote();
            }, 750);
          }, 220);
        }, 220);
      }, 550);
    }
  }

  /**
   * Alterna el modo concierto (arpegio de piano de cristal)
   */
  public setConcertMode(enabled: boolean) {
    this.isConcertMode = enabled;

    if (enabled) {
      this.resume();
      if (!this.isAmbientPlaying) {
        this.startAmbientSoundscape(this.currentFreq, true);
      } else {
        this.startNeoclassicalMelody();
      }
    } else {
      this.stopNeoclassicalMelody();
    }
  }

  /**
   * Modula en tiempo real la orquestación a partir de los controles del Math Lab
   */
  public updateDynamics(harmonics: number, speed: number) {
    this.currentHarmonics = harmonics;
    this.currentSpeed = speed;

    if (!this.ctx || !this.ambientFilter) return;
    const now = this.ctx.currentTime;
    const cutoff = 420 + harmonics * 140;
    this.ambientFilter.frequency.setTargetAtTime(cutoff, now, 0.08);
  }

  /**
   * Motor melódico generativo: arpegia notas de piano de cristal / celesta
   * en la escala soprano sagrada elegida, con pausas poéticas y frases armónicas.
   */
  private startNeoclassicalMelody() {
    this.stopNeoclassicalMelody();
    this.melodyStep = 0;
    // Primer nota casi inmediata (40ms) para respuesta táctil instantánea
    this.melodyTimeoutId = window.setTimeout(() => {
      this.scheduleNextMelodyNote();
    }, 40);
  }

  private stopNeoclassicalMelody() {
    if (this.melodyTimeoutId !== null) {
      clearTimeout(this.melodyTimeoutId);
      this.melodyTimeoutId = null;
    }
  }

  private scheduleNextMelodyNote() {
    if (!this.isConcertMode || this.isMuted) return;
    if (!this.isAmbientPlaying) {
      this.startAmbientSoundscape(this.currentFreq, true);
      return;
    }

    const info = SACRED_FREQUENCIES[this.currentFreq] || SACRED_FREQUENCIES[432];
    const ratios = info.ratios;

    // Progresiones melódicas clásicas de consonancia perfecta (estilo Richter / Einaudi / Glass)
    // Índices mapeados a CONSONANT_RATIOS:
    // 0: Octava | 1: 9na dulce | 2: 3ra Mayor | 3: 5ta Justa | 4: 6ta Mayor | 5: Octava alta | 6: 9na alta | 7: 3ra alta
    const melodicPhrases = [
      [0, 2, 3, 5, 4, 3, 2, 0], // Ascenso poético y resolución serena
      [2, 3, 5, 6, 7, 5, 3, 2], // Melodía en registro cristalino alto
      [0, 1, 2, 3, 5, 4, 2, 0], // Cascada de campanillas de luz
      [3, 5, 4, 2, 3, 2, 1, 0], // Contemplación armónica suspendida
    ];

    const phraseIndex = Math.floor(this.melodyStep / 8) % melodicPhrases.length;
    const currentPhrase = melodicPhrases[phraseIndex];
    const noteRatioIndex = currentPhrase[this.melodyStep % currentPhrase.length];

    // Limitar registro superior según el control de armónicos (armónicos 1-3 = registro medio; 7 = registro celestial)
    const activeLimit = Math.min(ratios.length - 1, 3 + Math.floor(this.currentHarmonics * 0.6));
    const finalRatioIndex = Math.min(noteRatioIndex, activeLimit);

    const noteFreq = this.currentFreq * ratios[finalRatioIndex];

    // Dinámica de volumen expresiva y nítida (entre 0.25 y 0.32)
    const velocity = 0.26 + ((this.melodyStep % 4) === 0 ? 0.06 : 0.01);
    this.playCrystalPianoNote(noteFreq, velocity);
    this.melodyStep++;

    // Tempo modulado suavemente por la velocidad del Math Lab
    const baseInterval = 680 / Math.max(0.4, this.currentSpeed);
    // Cada 8 notas se introduce una pausa respiratoria de final de frase
    const isPhraseEnd = this.melodyStep % 8 === 0;
    const interval = isPhraseEnd ? baseInterval * 2.2 : baseInterval * (0.9 + (this.melodyStep % 3) * 0.12);

    this.melodyTimeoutId = window.setTimeout(() => {
      this.scheduleNextMelodyNote();
    }, interval);
  }

  /**
   * Toca una nota individual con timbre de piano de cristal / celesta neoclásica
   * con transitorio limpio, armónicos dulces y espacialización estéreo.
   */
  public playCrystalPianoNote(freq: number, velocity: number = 0.26) {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.compressor) return;

    try {
      const now = this.ctx.currentTime;

      // Parcial 1: Tono fundamental cristalino puro
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Parcial 2: Timbre de campana de celesta (armónico a 2x)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.0, now);

      // Parcial 3: Campana armónica celestial pura (quinta armónica a 3x)
      const osc3 = this.ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 3.0, now);

      // Paneo estéreo alternante para que las notas bailen en el espacio acústico
      const panner = this.ctx.createStereoPanner?.() || null;
      if (panner) {
        const panValue = Math.sin(this.melodyStep * 1.618) * 0.35;
        panner.pan.setValueAtTime(panValue, now);
      }

      // Envolvente de volumen principal: ataque nítido y sedoso de 10ms, caída de 2.2 segundos
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(velocity, now + 0.01);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      // Envolventes de armónicos de celesta
      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.setValueAtTime(velocity * 0.22, now);
      harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      const sparkleGain = this.ctx.createGain();
      sparkleGain.gain.setValueAtTime(velocity * 0.07, now);
      sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc1.connect(noteGain);
      osc2.connect(harmonicGain);
      osc3.connect(sparkleGain);

      const voiceMix = this.ctx.createGain();
      voiceMix.gain.setValueAtTime(1.0, now);
      noteGain.connect(voiceMix);
      harmonicGain.connect(voiceMix);
      sparkleGain.connect(voiceMix);

      if (panner) {
        voiceMix.connect(panner);
        panner.connect(this.compressor);
        this.sendToSpatialSpace(panner);
      } else {
        voiceMix.connect(this.compressor);
        this.sendToSpatialSpace(voiceMix);
      }

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      const stopTime = now + 2.25;
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      osc3.stop(stopTime);

      osc1.onended = () => {
        try {
          osc1.disconnect();
          osc2.disconnect();
          osc3.disconnect();
          noteGain.disconnect();
          harmonicGain.disconnect();
          sparkleGain.disconnect();
          voiceMix.disconnect();
          panner?.disconnect();
        } catch {}
      };
    } catch {}
  }

  public stopAmbientSoundscape() {
    this.stopNeoclassicalMelody();

    if (this.stopTimeoutId !== null) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }

    if (!this.ctx || !this.ambientGain || !this.isAmbientPlaying) {
      this.isAmbientPlaying = false;
      return;
    }

    try {
      const now = this.ctx.currentTime;
      // Fade-out suave antes de desconectar
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.2);

      this.stopTimeoutId = window.setTimeout(() => {
        this.stopTimeoutId = null;
        this.isAmbientPlaying = false;

        this.ambientOscs.forEach(({ osc, gainNode }) => {
          try {
            osc.stop();
            osc.disconnect();
            gainNode?.disconnect();
          } catch {}
        });
        this.ambientOscs = [];

        try {
          this.lfoOsc?.stop();
          this.lfoOsc?.disconnect();
          this.lfoGain?.disconnect();
        } catch {}

        this.ambientGain?.disconnect();
        this.ambientFilter?.disconnect();
        this.ambientGain = null;
        this.ambientFilter = null;
        this.lfoOsc = null;
        this.lfoGain = null;
      }, 250);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Chime de activación armónico al encender el audio
   */
  public playActivationChime(freq: ConcertFrequency = 432) {
    this.resume();
    if (!this.ctx || !this.compressor) return;

    const now = this.ctx.currentTime;
    const notes = [freq * 1.5, freq * 2.0, freq * 2.5];

    notes.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.1);

      gain.gain.setValueAtTime(0.0001, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.1 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.1 + 0.8);

      osc.connect(gain);
      gain.connect(this.compressor!);
      this.sendToSpatialSpace(gain);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.85);
    });
  }

  /**
   * Micro-tick suave para interacción UI (hover o click)
   */
  public playInteractionTick(freq: number = 880, gainValue: number = 0.08) {
    this.resume();
    if (!this.ctx || !this.compressor) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.05);

      gain.gain.setValueAtTime(gainValue, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  /**
   * Acorde armónico al cambiar de sección en el scrollytelling
   */
  public playSectionMilestone(sectionIndex: number) {
    this.resume();
    if (!this.ctx || !this.compressor) return;

    const baseFreq = this.currentFreq;
    const intervals = [1.0, 1.25, 1.5, 2.0];
    const freq = baseFreq * intervals[sectionIndex % intervals.length];

    const now = this.ctx.currentTime;
    const chord = [freq, freq * 1.5];

    chord.forEach((f, i) => {
      if (!this.ctx || !this.compressor) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.05);

      gain.gain.setValueAtTime(0.0001, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.14 / (i + 1), now + i * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.7);

      osc.connect(gain);
      gain.connect(this.compressor);
      this.sendToSpatialSpace(gain);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.75);
    });
  }

  /**
   * Modulación armónica para los deslizadores del Math Lab
   */
  public playMathLabPulse(harmonics: number, frequency: number = 440) {
    this.resume();
    if (!this.ctx || !this.compressor) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const targetFreq = frequency * (1 + (harmonics % 5) * 0.25);
    osc.frequency.setValueAtTime(targetFreq, now);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.compressor);

    osc.start(now);
    osc.stop(now + 0.16);

    this.updateDynamics(harmonics, this.currentSpeed);
  }
}

export const audioSynthesizer = new AudioSynthesizer();
