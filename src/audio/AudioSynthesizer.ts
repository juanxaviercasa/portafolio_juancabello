/**
 * AudioSynthesizer: Motor de audio procedural nativo usando Web Audio API.
 * Genera micro-tonos armónicos y paisajes sonoros en tiempo real sin archivos externos.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  
  // Nodos para el drone procedural continuo (Síntesis aditiva en 432 Hz)
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private ambientFilter: BiquadFilterNode | null = null;
  private isAmbientPlaying: boolean = false;

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
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime); // Nivel maestro claro y seguro
      this.masterGain.connect(this.ctx.destination);

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
   * Inicia o detiene el paisaje sonoro procedural continuo (Afinación armónica 432Hz)
   */
  public startAmbientSoundscape() {
    this.resume();
    if (!this.ctx || !this.masterGain || this.isAmbientPlaying) return;

    try {
      const now = this.ctx.currentTime;

      // Filtro paso-bajo resonante cálido
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(650, now);
      this.ambientFilter.Q.setValueAtTime(2.0, now);

      // Ganancia para el ambiente con fade-in suave
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.12, now + 1.2); // Volumen equilibrado

      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      // Tríada armónica basada en 216Hz (A3), 324Hz (E4 quinta pitagórica) y 432Hz (A4)
      const freqs = [216, 324, 432];
      this.ambientOscs = freqs.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(this.ambientFilter!);
        osc.start(now);
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn('Error al iniciar ambiente sonoro procedural:', e);
    }
  }

  public stopAmbientSoundscape() {
    if (!this.ctx || !this.ambientGain || !this.isAmbientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      // Fade-out suave antes de detener
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      setTimeout(() => {
        this.ambientOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.ambientOscs = [];
        this.ambientGain?.disconnect();
        this.ambientFilter?.disconnect();
        this.ambientGain = null;
        this.ambientFilter = null;
        this.isAmbientPlaying = false;
      }, 550);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Chime de activación al encender el audio
   */
  public playActivationChime() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const notes = [432, 540, 648]; // Progresión armónica A4 - C#5 - E5

    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.0001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.55);
    });
  }

  /**
   * Micro-tick suave para interacción UI (hover o click en botones y enlaces)
   */
  public playInteractionTick(freq: number = 880, gainValue: number = 0.12) {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + 0.06);

    gain.gain.setValueAtTime(gainValue, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  /**
   * Acorde o hito armónico al cambiar de sección en el scrollytelling
   */
  public playSectionMilestone(sectionIndex: number) {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const root = 216; // A3
    const intervals = [1, 9 / 8, 81 / 64, 3 / 2, 27 / 16, 2];
    const baseFreq = root * intervals[sectionIndex % intervals.length];

    const now = this.ctx.currentTime;
    const chord = [baseFreq, baseFreq * 1.5];

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.0001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.14 / (i + 1), now + i * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.55);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.6);
    });
  }

  /**
   * Modulación armónica para los deslizadores del Math Lab
   */
  public playMathLabPulse(harmonics: number, frequency: number = 440) {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = harmonics > 4 ? 'sawtooth' : harmonics > 2 ? 'triangle' : 'sine';
    const targetFreq = frequency * (1 + (harmonics % 5) * 0.25);
    osc.frequency.setValueAtTime(targetFreq, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.18);

    // Si el drone continuo está activo, modular el filtro en tiempo real
    if (this.ambientFilter) {
      const cutoff = 400 + harmonics * 220;
      this.ambientFilter.frequency.setTargetAtTime(cutoff, now, 0.05);
    }
  }
}

export const audioSynthesizer = new AudioSynthesizer();
