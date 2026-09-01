// Comprehensive Sound Engine strictly playing the user-provided PUBG Mobile theme audio
// Source: https://nu.vgmtreasurechest.com/soundtracks/pubg-mobile-android-ios-gamerip-2018/zdzvxgeraj/15.mp3 & /assets/pubg_theme.mp3

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmActive: boolean = false;
  private bgmAudioEl: HTMLAudioElement | null = null;
  private volume: number = 0.75;
  private hasUnlockedAudio: boolean = false;
  private listeners: Set<(state: { isPlaying: boolean; isMuted: boolean; volume: number }) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.setupGlobalUnlock();
    }
  }

  public subscribe(cb: (state: { isPlaying: boolean; isMuted: boolean; volume: number }) => void): () => void {
    this.listeners.add(cb);
    cb({ isPlaying: this.isMusicPlaying(), isMuted: this.isMuted, volume: this.volume });
    return () => this.listeners.delete(cb);
  }

  private notify(): void {
    const state = { isPlaying: this.isMusicPlaying(), isMuted: this.isMuted, volume: this.volume };
    this.listeners.forEach((cb) => cb(state));
  }

  private initAudioElement(): void {
    try {
      const exactAudioSrc = '/assets/pubg_theme.mp3';
      const remoteAudioSrc = 'https://nu.vgmtreasurechest.com/soundtracks/pubg-mobile-android-ios-gamerip-2018/zdzvxgeraj/15.mp3';

      this.bgmAudioEl = new Audio();
      this.bgmAudioEl.id = 'pubg-theme-bgm-player';
      this.bgmAudioEl.preload = 'auto';
      this.bgmAudioEl.loop = true;
      this.bgmAudioEl.volume = this.volume;
      this.bgmAudioEl.src = exactAudioSrc;

      // In case local path fails, switch to remote
      let fallbackTried = false;
      this.bgmAudioEl.addEventListener('error', () => {
        if (!fallbackTried && this.bgmAudioEl) {
          fallbackTried = true;
          this.bgmAudioEl.src = remoteAudioSrc;
          this.bgmAudioEl.load();
          if (this.isBgmActive && !this.isMuted) {
            this.bgmAudioEl.play().catch(() => {});
          }
        }
      });

      this.bgmAudioEl.addEventListener('play', () => this.notify());
      this.bgmAudioEl.addEventListener('pause', () => this.notify());
      this.bgmAudioEl.addEventListener('volumechange', () => this.notify());
    } catch {
      // Audio element fallback
    }
  }

  private setupGlobalUnlock(): void {
    const unlock = () => {
      this.hasUnlockedAudio = true;
      this.getContext();
      if (this.isBgmActive && !this.isMuted && this.bgmAudioEl && this.bgmAudioEl.paused) {
        this.bgmAudioEl.play().catch(() => {});
      }
    };

    window.addEventListener('click', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    window.addEventListener('pointerdown', unlock, { passive: true });
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmAudioEl) {
      this.bgmAudioEl.muted = this.isMuted;
      if (!this.isMuted && this.isBgmActive) {
        this.bgmAudioEl.play().catch(() => {});
      }
    }
    this.notify();
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public isMusicPlaying(): boolean {
    return !!(this.isBgmActive && !this.isMuted && this.bgmAudioEl && !this.bgmAudioEl.paused);
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgmAudioEl) {
      this.bgmAudioEl.volume = this.volume;
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  // Starts the user's PUBG background theme track
  public playBgm(): void {
    this.isBgmActive = true;
    if (this.isMuted) {
      this.notify();
      return;
    }

    if (this.bgmAudioEl) {
      this.bgmAudioEl.muted = false;
      this.bgmAudioEl.volume = this.volume;
      const playPromise = this.bgmAudioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.notify();
          })
          .catch((_err) => {
            // Autoplay policy prevented immediate playback; waiting for next user gesture
            this.notify();
          });
      }
    }
  }

  public pauseBgm(): void {
    this.isBgmActive = false;
    if (this.bgmAudioEl) {
      this.bgmAudioEl.pause();
    }
    this.notify();
  }

  public toggleBgm(): boolean {
    if (this.bgmAudioEl && !this.bgmAudioEl.paused) {
      this.pauseBgm();
      return false;
    } else {
      this.playBgm();
      return true;
    }
  }

  // Game Start sound: deep cinematic sub-bass rumble + metallic charging cue
  public playMatchStart(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Deep Sub Bass Impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.7);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.8);

      // 2. Metallic click / cocking sound
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(850, now + 0.05);
      snapOsc.frequency.exponentialRampToValueAtTime(110, now + 0.22);

      snapGain.gain.setValueAtTime(0.3, now + 0.05);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);

      snapOsc.start(now + 0.05);
      snapOsc.stop(now + 0.25);
    } catch {
      // Audio safety fallback
    }
  }

  // Tactical HUD click
  public playClick(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore
    }
  }

  // Hover tick
  public playHover(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.025);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore
    }
  }

  // Modal open whoosh / telemetry chime
  public playModalOpen(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(640, now + 0.12);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(480, now);
      osc2.frequency.exponentialRampToValueAtTime(960, now + 0.12);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.16);
      osc2.stop(now + 0.16);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEngine();

