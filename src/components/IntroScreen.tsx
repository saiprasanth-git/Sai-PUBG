import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ProfileInfo } from '../types';
import { sound } from '../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

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
    return sound.subscribe(setSoundState);
  }, []);

  const handleEnter = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Start PUBG theme music only (no gunshots or heavy SFX)
    sound.playBgm();
    
    // Quick smooth exit transition
    setTimeout(() => {
      onEnterLobby();
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
          className="w-full h-full object-cover object-left md:object-center transform scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080B0D]/50 to-[#080B0D]/95 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D] via-[#080B0D]/60 to-[#080B0D]/40 md:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      </div>

      {/* Top Header Information HUD (Fades out smoothly on enter) */}
      <motion.div 
        animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -10 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-6 z-10 pointer-events-auto"
      >
        <div className="text-[10px] md:text-xs tracking-[0.2em] text-[#FFB900] font-mono uppercase font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFB900] animate-ping" />
          <span>PUBG PORTFOLIO PROTOCOL // 2026.4</span>
        </div>
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] text-white/70 font-mono uppercase hover:text-[#FFB900] transition-colors bg-black/60 px-3 py-1.5 border border-white/10"
        >
          {soundState.isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFB900]" />}
          <span>{soundState.isMuted ? 'AUDIO: MUTED' : 'AUDIO: ON'}</span>
        </button>
      </motion.div>

      {/* Right-Side Distressed Title Composition: SAI PRASANTH (Fades out smoothly on click) */}
      <div className="absolute inset-y-0 right-0 w-full md:w-3/5 lg:w-1/2 flex flex-col justify-center px-6 md:px-14 lg:px-20 z-10 text-right items-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1, 
            y: isTransitioning ? -15 : 0,
            scale: isTransitioning ? 0.98 : 1
          }}
          transition={{ duration: isTransitioning ? 0.25 : 0.6, ease: 'easeOut' }}
          className="max-w-2xl w-full flex flex-col items-end"
        >
          {/* Distressed Box Header */}
          <div className="inline-block bg-[#FFB900] text-[#080B0D] font-display font-black text-xs md:text-sm tracking-[0.3em] px-4 py-1.5 uppercase mb-3 transform skew-x-[-6deg] shadow-lg">
            <span className="inline-block transform skew-x-[6deg]">{profile.taglineTitle}</span>
          </div>

          {/* Huge Distressed Golden Title: SAI PRASANTH */}
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
          <p className="font-mono-tech text-xs sm:text-sm md:text-base text-[#F5F5F0] tracking-wider uppercase font-semibold leading-relaxed max-w-lg mb-6 text-right opacity-90 drop-shadow-md">
            {profile.subtitle}
          </p>

          {/* Server Info Pill */}
          <div className="flex items-center space-x-3 bg-black/75 backdrop-blur-md px-4 py-2 border border-white/10 mb-8 text-xs font-mono-tech text-[#A6A6A0]">
            <span className="text-[#34D399]">● {profile.serverPing}</span>
            <span className="text-white/30">|</span>
            <span>{profile.serverRegion}</span>
            <span className="text-white/30">|</span>
            <span className="text-[#FFB900]">{profile.rank}</span>
          </div>

          {/* Pulsing "Press Any Key" Interactive Indicator */}
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center space-x-3 bg-[#FFB900]/10 border border-[#FFB900] px-5 sm:px-6 py-3 cursor-pointer hover:bg-[#FFB900]/20 transition-all shadow-[0_0_20px_rgba(255,185,0,0.3)]"
          >
            <div className="w-2.5 h-2.5 bg-[#FFB900] rounded-sm animate-pulse" />
            <span className="font-display font-bold text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#FFB900] uppercase">
              PRESS ANY KEY OR TAP TO ENTER
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Legal & Build Meta (Fades out smoothly on enter) */}
      <motion.div 
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-6 z-10 text-[9px] md:text-[10px] text-white/40 font-mono uppercase tracking-wider pointer-events-none"
      >
        <span>COORDINATES: {profile.coordinates}</span>
        <span>PROD BUILD: 4.8.2 // CLOUD RUN SECURE</span>
      </motion.div>
    </div>
  );
};
