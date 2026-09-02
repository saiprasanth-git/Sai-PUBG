import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    sound.playMatchStart();
    sound.playBgm();
    setTimeout(() => {
      onEnterLobby();
    }, 700);
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080B0D]/50 to-[#080B0D]/95 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D] via-[#080B0D]/60 to-[#080B0D]/40 md:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      </div>

      {/* Top Header Information HUD */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-6 z-10">
        <div className="text-[10px] md:text-xs tracking-[0.2em] text-white/50 font-mono uppercase">
          PUBG PORTFOLIO PROTOCOL // 2026.4
        </div>
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] text-white/50 font-mono uppercase hover:text-white/80 transition-colors"
        >
          {soundState.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          {soundState.isMuted ? 'AUDIO: MUTED' : 'AUDIO: ON'}
        </button>
      </div>

      {/* Right-Side Distressed Title Composition */}
      <div className="absolute right-0 top-0 h-full w-full md:w-1/2 flex flex-col items-start justify-center px-6 md:px-12 z-10">
        <div className="max-w-xl">
          {/* Distressed Box Header */}
          <div className="border-l-4 border-[#F0A500] pl-4 mb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wide">
              {profile.taglineTitle}
            </h1>
          </div>

          {/* Golden Separator Accent */}
          <div className="w-24 h-[2px] bg-[#F0A500] mb-4" />

          {/* Server Info Pill */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/70 font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            {profile.serverPing} &nbsp;|&nbsp; {profile.serverRegion} &nbsp;|&nbsp; {profile.rank}
          </div>

          {/* Pulsing "Press Any Key" Interactive Indicator (reduced size) */}
          <div className="animate-pulse text-[10px] md:text-xs tracking-[0.3em] text-white/60 font-mono uppercase">
            Press Any Key or Tap to Enter
          </div>
        </div>
      </div>

      {/* Bottom Legal & Build Meta */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-6 z-10 text-[9px] md:text-[10px] text-white/40 font-mono uppercase tracking-wider">
        <span>COORDINATES: {profile.coordinates}</span>
        <span>PROD BUILD: 4.8.2 // CLOUD RUN SECURE</span>
      </div>

      {/* Screen Transition Flash Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50 flex items-center justify-center"
          >
            <span className="text-black font-mono uppercase tracking-widest text-sm">
              Initializing Lobby Directive...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
