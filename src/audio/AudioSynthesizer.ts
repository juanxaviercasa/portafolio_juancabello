/**
 * AudioSynthesizer: Motor de audio procedural nativo usando Web Audio API.
 * Genera micro-tonos armónicos sin archivos de audio externos (cero latencia y cero peso en KB).
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime); // Volumen maestro moderado y seguro
      this.masterGain.connect(this.ctx.destination);
    } catch {
      console.warn('Web Audio API no soportado o bloqueado por el navegador.');
    }
  }

  public resume() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Micro-tick suave para interacción UI (hover o click en botones y enlaces)
   */
  public playInteractionTick(freq: number = 880, gainValue: number = 0.04) {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  /**
   * Acorde o hito armónico al cambiar de sección en el scrollytelling
   */
  public playSectionMilestone(sectionIndex: number) {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    // Escala pentatónica afinada en La 432 Hz
    const root = 216; // A3 (octava cálida)
    const intervals = [1, 9 / 8, 81 / 64, 3 / 2, 27 / 16, 2];
    const baseFreq = root * intervals[sectionIndex % intervals.length];

    const now = this.ctx.currentTime;

    // Nota fundamental y quinta armónica
    const chord = [baseFreq, baseFreq * 1.5];

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      // Envolvente suave: Ataque rápido (15ms) y decaimiento exponencial (400ms)
      gain.gain.setValueAtTime(0.0001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.06 / (i + 1), now + i * 0.04 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.5);
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

    // El timbre cambia según el número de armónicos seleccionados
    osc.type = harmonics > 4 ? 'sawtooth' : harmonics > 2 ? 'triangle' : 'sine';
    
    // Frecuencia modulada por el armónico
    const targetFreq = frequency * (1 + (harmonics % 5) * 0.25);
    osc.frequency.setValueAtTime(targetFreq, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.14);
  }
}

export const audioSynthesizer = new AudioSynthesizer();
