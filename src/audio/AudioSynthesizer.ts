/**
 * AudioSynthesizer: Motor de audio procedural nativo usando Web Audio API.
 * Orquestación armónica neoclásica / Nueva Era sin archivos externos.
 * Genera paisajes sonoros de concierto con afinación en frecuencias sagradas
 * (432Hz, 528Hz, 396Hz, 639Hz) y melodías procedurales generativas de piano de cristal.
 */

export type ConcertFrequency = 432 | 528 | 396 | 639;

export interface SacredFrequencyInfo {
  freq: ConcertFrequency;
  name: string;
  subtitle: string;
  scaleDescription: string;
  ratios: number[];
}

export const SACRED_FREQUENCIES: Record<ConcertFrequency, SacredFrequencyInfo> = {
  432: {
    freq: 432,
    name: '432 Hz',
    subtitle: 'Armonía Áurea & Pitagórica',
    scaleDescription: 'Afinación de Verdi y proporción matemática natural (La = 432 Hz)',
    ratios: [0.5, 0.75, 1.0, 1.125, 1.25, 1.5, 1.667, 2.0, 2.25, 2.5, 3.0],
  },
  528: {
    freq: 528,
    name: '528 Hz',
    subtitle: 'Frecuencia Milagro & Transformación (MI)',
    scaleDescription: 'Solfeggio sagrado, resonancia de la geometría del ADN (Do = 528 Hz)',
    ratios: [0.5, 0.75, 1.0, 1.125, 1.25, 1.5, 1.667, 2.0, 2.25, 2.5, 3.0],
  },
  396: {
    freq: 396,
    name: '396 Hz',
    subtitle: 'Fundamento Telúrico & Liberación (UT)',
    scaleDescription: 'Solfeggio de enraizamiento, calma profunda y resonancia grave',
    ratios: [0.5, 0.75, 1.0, 1.125, 1.2, 1.5, 1.6, 2.0, 2.25, 2.4, 3.0],
  },
  639: {
    freq: 639,
    name: '639 Hz',
    subtitle: 'Resonancia Cuántica & Conexión (FA)',
    scaleDescription: 'Solfeggio de apertura empática, éter sonoro y luz armónica',
    ratios: [0.5, 0.75, 1.0, 1.125, 1.25, 1.406, 1.5, 1.667, 1.875, 2.0, 2.25],
  },
};

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  // Parámetros activos del concierto
  private currentFreq: ConcertFrequency = 432;
  private isConcertMode: boolean = true;
  private currentHarmonics: number = 3;
  private currentSpeed: number = 0.8;

  // Red de espacialización acústica (Reverb / Stereo Cross-Delay)
  private delayNodeL: DelayNode | null = null;
  private delayNodeR: DelayNode | null = null;
  private feedbackGainL: GainNode | null = null;
  private feedbackGainR: GainNode | null = null;
  private reverbFilter: BiquadFilterNode | null = null;
  private reverbGain: GainNode | null = null;

  // Capa 1: Colchón Armónico / Cuerdas Celestes (Pad continuo)
  private ambientGain: GainNode | null = null;
  private ambientOscs: { osc: OscillatorNode; ratio: number }[] = [];
  private ambientFilter: BiquadFilterNode | null = null;
  private isAmbientPlaying: boolean = false;
  private lfoOsc: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  // Capa 2: Arpegiador Melódico Neoclásico ("Piano de Cristal")
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

      // Compresor de dinámica para masterización nítida y suave sin clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(3.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

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

  public resume() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Inicializa la red de reverberación acústica espacial y delay estéreo
   */
  private initSpatialAcoustics() {
    if (!this.ctx || !this.compressor) return;

    // Delay izquierdo (380ms) y derecho (540ms) en proporción áurea
    this.delayNodeL = this.ctx.createDelay();
    this.delayNodeL.delayTime.setValueAtTime(0.38, this.ctx.currentTime);

    this.delayNodeR = this.ctx.createDelay();
    this.delayNodeR.delayTime.setValueAtTime(0.54, this.ctx.currentTime);

    this.feedbackGainL = this.ctx.createGain();
    this.feedbackGainL.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.feedbackGainR = this.ctx.createGain();
    this.feedbackGainR.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Filtro paso-bajo para simular la calidez acústica de un auditorio de madera
    this.reverbFilter = this.ctx.createBiquadFilter();
    this.reverbFilter.type = 'lowpass';
    this.reverbFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    this.reverbGain = this.ctx.createGain();
    this.reverbGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

    // Enrutamiento de realimentación cruzada (Ping-Pong espacial)
    this.delayNodeL.connect(this.feedbackGainL);
    this.feedbackGainL.connect(this.delayNodeR);

    this.delayNodeR.connect(this.feedbackGainR);
    this.feedbackGainR.connect(this.delayNodeL);

    this.delayNodeL.connect(this.reverbFilter);
    this.delayNodeR.connect(this.reverbFilter);

    this.reverbFilter.connect(this.reverbGain);
    this.reverbGain.connect(this.compressor);
  }

  /**
   * Envía una señal al espacio de reverberación neoclásico
   */
  public sendToSpatialSpace(node: AudioNode) {
    if (this.delayNodeL && this.delayNodeR) {
      node.connect(this.delayNodeL);
      node.connect(this.delayNodeR);
    }
  }

  /**
   * Inicia el concierto armónico procedural neoclásico
   */
  public startAmbientSoundscape(freq: ConcertFrequency = 432, concertMode: boolean = true) {
    this.resume();
    if (!this.ctx || !this.compressor || this.isAmbientPlaying) return;

    this.currentFreq = freq;
    this.isConcertMode = concertMode;

    try {
      const now = this.ctx.currentTime;

      // Filtro paso-bajo resonante cálido para el pad
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(600 + this.currentHarmonics * 120, now);
      this.ambientFilter.Q.setValueAtTime(1.8, now);

      // LFO sutil para respiración acústica de cuerdas (0.04 Hz ~ 25s por ciclo)
      this.lfoOsc = this.ctx.createOscillator();
      this.lfoOsc.type = 'sine';
      this.lfoOsc.frequency.setValueAtTime(0.04, now);

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(140, now);

      this.lfoOsc.connect(this.lfoGain);
      this.lfoGain.connect(this.ambientFilter.frequency);
      this.lfoOsc.start(now);

      // Ganancia para el pad con fade-in suave
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.14, now + 1.6);

      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.compressor);
      this.sendToSpatialSpace(this.ambientGain);

      // Tríada armónica pitagórica 3-5-7 del Fénix:
      // Sub-bajo (0.5x), Fundamental (1.0x), Quinta (1.5x), Novena/Armónico suspendido (2.25x)
      const ratios = [0.5, 1.0, 1.5, 2.25];
      this.ambientOscs = ratios.map((ratio, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx === 0 ? 'sine' : idx === 2 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq * ratio, now);
        osc.connect(this.ambientFilter!);
        osc.start(now);
        return { osc, ratio };
      });

      this.isAmbientPlaying = true;

      // Iniciar el arpegiador de piano de cristal si el modo concierto está activo
      if (this.isConcertMode) {
        this.startNeoclassicalMelody();
      }
    } catch (e) {
      console.warn('Error al iniciar concierto armónico procedural:', e);
    }
  }

  /**
   * Cambia dinámicamente la frecuencia fundamental de todo el concierto
   * Realiza un glissando armónico continuo en los osciladores activos.
   */
  public setFundamentalFrequency(newFreq: ConcertFrequency) {
    this.currentFreq = newFreq;
    if (!this.ctx || !this.isAmbientPlaying) return;

    const now = this.ctx.currentTime;
    this.ambientOscs.forEach(({ osc, ratio }) => {
      try {
        osc.frequency.cancelScheduledValues(now);
        osc.frequency.setValueAtTime(osc.frequency.value, now);
        // Transición suave de 1.2 segundos hacia la nueva frecuencia (glissando majestuoso)
        osc.frequency.exponentialRampToValueAtTime(newFreq * ratio, now + 1.2);
      } catch {}
    });
  }

  /**
   * Alterna el modo concierto (arpegio de piano de cristal)
   */
  public setConcertMode(enabled: boolean) {
    this.isConcertMode = enabled;
    if (!this.isAmbientPlaying) return;

    if (enabled) {
      this.startNeoclassicalMelody();
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
    const cutoff = 400 + harmonics * 160;
    this.ambientFilter.frequency.setTargetAtTime(cutoff, now, 0.08);
  }

  /**
   * Motor melódico generativo: arpegia notas de piano de cristal en la escala sagrada elegida
   */
  private startNeoclassicalMelody() {
    this.stopNeoclassicalMelody();
    this.melodyStep = 0;
    this.scheduleNextMelodyNote();
  }

  private stopNeoclassicalMelody() {
    if (this.melodyTimeoutId !== null) {
      clearTimeout(this.melodyTimeoutId);
      this.melodyTimeoutId = null;
    }
  }

  private scheduleNextMelodyNote() {
    if (!this.isAmbientPlaying || !this.isConcertMode) return;

    const info = SACRED_FREQUENCIES[this.currentFreq] || SACRED_FREQUENCIES[432];
    const ratios = info.ratios;

    // Patrón lírico neoclásico con respiraciones y variaciones
    // La frase melódica se adapta a los armónicos seleccionados en el Math Lab
    const maxIndex = Math.min(ratios.length - 1, 3 + Math.floor(this.currentHarmonics));
    
    // Progresión armónica modal inspirada en Philip Glass y Brian Eno
    const melodicSequences = [
      [2, 4, 5, 7, 5, 4, 3, 2],
      [0, 2, 4, 6, 7, 6, 4, 2],
      [3, 5, 7, 8, 7, 5, 4, 2],
      [1, 3, 5, 7, 6, 4, 3, 1],
    ];

    const currentPhrase = melodicSequences[Math.floor(this.melodyStep / 8) % melodicSequences.length];
    const noteRatioIndex = currentPhrase[this.melodyStep % currentPhrase.length] % (maxIndex + 1);
    const noteFreq = this.currentFreq * ratios[noteRatioIndex];

    this.playCrystalPianoNote(noteFreq);
    this.melodyStep++;

    // Cadencia rítmica modulada por la velocidad del Fénix 3D (entre 350ms y 950ms)
    const baseInterval = 650 / Math.max(0.4, this.currentSpeed);
    // Cada 4 u 8 notas, introducir una respiración poética más prolongada (pausa de frase)
    const isPhraseEnd = this.melodyStep % 8 === 0;
    const interval = isPhraseEnd ? baseInterval * 1.8 : baseInterval * (0.85 + (this.melodyStep % 3) * 0.15);

    this.melodyTimeoutId = window.setTimeout(() => {
      this.scheduleNextMelodyNote();
    }, interval);
  }

  /**
   * Toca una nota lírica individual con envolvente de piano de cristal / celesta
   */
  public playCrystalPianoNote(freq: number, velocity: number = 0.08) {
    this.resume();
    if (!this.ctx || !this.compressor) return;

    try {
      const now = this.ctx.currentTime;

      // Parcial 1: Fundamental puro
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Parcial 2: Timbre de campana cristalina (armónico 2x o 3x suave)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.0, now);

      // Envolvente de amplitud percusiva orgánica y suave (15ms ataque, 1.8s caída)
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(velocity, now + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      const bellGain = this.ctx.createGain();
      bellGain.gain.setValueAtTime(velocity * 0.28, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc1.connect(noteGain);
      osc2.connect(bellGain);

      bellGain.connect(noteGain);
      noteGain.connect(this.compressor);

      // Enviar a la reverberación espacial para que la nota flote en la sala
      this.sendToSpatialSpace(noteGain);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 1.85);
      osc2.stop(now + 1.85);
    } catch {}
  }

  public stopAmbientSoundscape() {
    this.stopNeoclassicalMelody();

    if (!this.ctx || !this.ambientGain || !this.isAmbientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      // Fade-out suave antes de desconectar
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      setTimeout(() => {
        this.ambientOscs.forEach(({ osc }) => {
          try {
            osc.stop();
            osc.disconnect();
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
        this.isAmbientPlaying = false;
      }, 650);
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
    const info = SACRED_FREQUENCIES[freq] || SACRED_FREQUENCIES[432];
    const notes = [freq, freq * (info.ratios[4] || 1.25), freq * (info.ratios[5] || 1.5)];

    notes.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.09);

      gain.gain.setValueAtTime(0.0001, now + i * 0.09);
      gain.gain.linearRampToValueAtTime(0.14, now + i * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.6);

      osc.connect(gain);
      gain.connect(this.compressor!);
      this.sendToSpatialSpace(gain);

      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.65);
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
   * Acorde o hito armónico al cambiar de sección en el scrollytelling
   */
  public playSectionMilestone(sectionIndex: number) {
    this.resume();
    if (!this.ctx || !this.compressor) return;

    const baseFreq = this.currentFreq * 0.5;
    const intervals = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2];
    const freq = baseFreq * intervals[sectionIndex % intervals.length];

    const now = this.ctx.currentTime;
    const chord = [freq, freq * 1.5];

    chord.forEach((f, i) => {
      if (!this.ctx || !this.compressor) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.04);

      gain.gain.setValueAtTime(0.0001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.12 / (i + 1), now + i * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.6);

      osc.connect(gain);
      gain.connect(this.compressor);
      this.sendToSpatialSpace(gain);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.65);
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

    osc.type = harmonics > 4 ? 'triangle' : 'sine';
    const targetFreq = frequency * (1 + (harmonics % 5) * 0.2);
    osc.frequency.setValueAtTime(targetFreq, now);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.compressor);

    osc.start(now);
    osc.stop(now + 0.16);

    // Actualizar dinámica del concierto
    this.updateDynamics(harmonics, this.currentSpeed);
  }
}

export const audioSynthesizer = new AudioSynthesizer();
