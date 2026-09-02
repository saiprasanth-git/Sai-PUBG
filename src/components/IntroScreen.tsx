import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileInfo } from '../types';
import { sound } from '../utils/audio';
import { Sparkles, Terminal, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

interface IntroScreenProps {
  profile: ProfileInfo;
  onEnterLobby: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ profile, onEnterLobby }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [soundState, setSoundState] = useState({
    isPlaying: sound.isMusicPlaying(),
    isMuted: sound.getMutedState(),
    volume: sound.getVolume()
  });

  useEffect(() => {
    return sound.subscribe((state) => {
      setSoundState(state);
    });
  }, []);

  const handleEnter = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    sound.playMatchStart();
    sound.playBgm();
    setTimeout(() => {
      onEnterLobby();
    }, 700);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys alone if desired, or trigger immediately
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;
      handleEnter();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = sound.toggleMute();
    if (!muted) {
      sound.playClick();
      sound.playBgm();
    }
  };

  return (
    <div
      id="pubg-title-screen"
      onClick={handleEnter}
      className="relative w-screen h-[100svh] overflow-hidden bg-[#080B0D] cursor-pointer select-none"
    >
      {/* Cinematic Background Art */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={profile.titleBgImage}
          alt="Title Screen Artwork"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-left md:object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Dark Vignette & Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080B0D]/50 to-[#080B0D]/95 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D] via-[#080B0D]/60 to-[#080B0D]/40 md:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        <div className="pubg-scanlines absolute inset-0 opacity-40 pointer-events-none" />
      </div>

      {/* Top Header Information HUD */}
      <div className="absolute top-0 inset-x-0 p-4 md:p-8 flex items-center justify-between z-20 pointer-events-auto">
        <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-[#FFB900] animate-ping" />
          <span className="font-mono-tech text-xs tracking-widest text-[#FFB900] font-bold">
            PUBG PORTFOLIO PROTOCOL // 2026.4
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="sound-toggle-title"
            onClick={toggleSound}
            className="flex items-center space-x-2 bg-black/70 hover:bg-black/90 px-3 py-1.5 border border-white/20 text-xs font-mono-tech text-[#A6A6A0] hover:text-[#FFB900] transition-colors"
          >
            {soundState.isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFB900]" />}
            <span className="hidden sm:inline">{soundState.isMuted ? 'AUDIO: MUTED' : 'AUDIO: ON'}</span>
          </button>
        </div>
      </div>

      {/* Right-Side Distressed Title Composition */}
      <div className="absolute inset-y-0 right-0 w-full md:w-3/5 lg:w-1/2 flex flex-col justify-center px-6 md:px-14 lg:px-20 z-10 text-right md:text-right items-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl w-full flex flex-col items-end"
        >
          {/* Distressed Box Header */}
          <div className="inline-block bg-[#FFB900] text-[#080B0D] font-display font-black text-xs md:text-sm tracking-[0.3em] px-4 py-1.5 uppercase mb-3 transform skew-x-[-6deg] shadow-lg">
            <span className="inline-block transform skew-x-[6deg]">{profile.taglineTitle}</span>
          </div>

          {/* Huge Distressed Golden Title */}
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight uppercase pubg-distressed-title text-right mb-4 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
            {profile.mainTitle}
          </h1>

          {/* Golden Separator Accent */}
          <div className="w-full flex items-center justify-end space-x-2 my-2">
            <div className="h-[2px] w-24 bg-[#FFB900]" />
            <div className="h-[4px] w-4 bg-[#FFB900]" />
            <div className="h-[2px] w-8 bg-[#FFB900]/40" />
          </div>

          {/* Subtitle & Specs */}
          <p className="font-mono-tech text-xs sm:text-sm md:text-base text-[#F5F5F0] tracking-wider uppercase font-semibold leading-relaxed max-w-lg mb-8 text-right opacity-90 drop-shadow-md">
            {profile.subtitle}
          </p>

          {/* Server Info Pill */}
          <div className="flex items-center space-x-3 bg-black/75 backdrop-blur-md px-4 py-2 border border-white/10 mb-10 text-xs font-mono-tech text-[#A6A6A0]">
            <span className="text-[#34D399]">● {profile.serverPing}</span>
            <span className="text-white/30">|</span>
            <span>{profile.serverRegion}</span>
            <span className="text-white/30">|</span>
            <span className="text-[#FFB900]">{profile.rank}</span>
          </div>

          {/* Pulsing "Press Any Key" Interactive Indicator */}
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center space-x-3 bg-[#FFB900]/10 border border-[#FFB900] px-6 py-3.5 cursor-pointer hover:bg-[#FFB900]/20 transition-all shadow-[0_0_20px_rgba(255,185,0,0.3)]"
          >
            <div className="w-2.5 h-2.5 bg-[#FFB900] rounded-sm animate-pulse" />
            <span className="font-display font-bold text-sm md:text-base tracking-[0.15em] text-[#FFB900] uppercase">
              PRESS ANY KEY OR TAP TO ENTER
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Legal & Build Meta */}
      <div className="absolute bottom-4 inset-x-4 md:inset-x-8 flex items-center justify-between z-20 text-[11px] font-mono-tech text-[#A6A6A0]/70 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span>COORDINATES: {profile.coordinates}</span>
        </div>
        <div>
          <span>PROD BUILD: 4.8.2 // CLOUD RUN SECURE</span>
        </div>
      </div>

      {/* Screen Transition Flash Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-50 bg-[#080B0D] flex items-center justify-center pointer-events-auto"
          >
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#FFB900] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-display text-xl font-bold tracking-[0.3em] text-[#FFB900] uppercase animate-pulse">
                INITIALIZING LOBBY DIRECTIVE...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
