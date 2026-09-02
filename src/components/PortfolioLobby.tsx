import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileInfo, Project, ExperienceItem, SkillCategory, SocialLink, DirectiveStat, ActiveHudTab } from '../types';
import { sound } from '../utils/audio';
import { 
  Gamepad2, 
  Layers, 
  Award, 
  Cpu, 
  Radio, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Shield, 
  Crown, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  RotateCcw, 
  ShoppingBag, 
  Flame, 
  MapPin, 
  Play, 
  Crosshair, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Target, 
  Globe,
  FileText,
  Compass,
  Users,
  UserPlus,
  Mic,
  MicOff,
  X
} from 'lucide-react';
import { ArcadeModeCard } from './ArcadeModeCard';
import { HobbiesModal } from './modals/HobbiesModal';
import { ProjectsModal } from './modals/ProjectsModal';
import { ProjectDetailsModal } from './modals/ProjectDetailsModal';
import { ExperienceModal } from './modals/ExperienceModal';
import { SkillsModal } from './modals/SkillsModal';
import { ContactModal } from './modals/ContactModal';
import { HOBBIES_DATA } from '../data/portfolioData';

interface PortfolioLobbyProps {
  profile: ProfileInfo;
  projects: Project[];
  experiences: ExperienceItem[];
  skills: SkillCategory[];
  socials: SocialLink[];
  stats: DirectiveStat[];
  onReturnToTitle: () => void;
}

export const PortfolioLobby: React.FC<PortfolioLobbyProps> = ({
  profile,
  projects,
  experiences,
  skills,
  socials,
  stats,
  onReturnToTitle,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveHudTab>('none');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [soundState, setSoundState] = useState({
    isPlaying: sound.isMusicPlaying(),
    isMuted: sound.getMutedState(),
    volume: sound.getVolume()
  });
  const [isCharacterInspecting, setIsCharacterInspecting] = useState(false);
  const [isCharacterHovered, setIsCharacterHovered] = useState(false);
  const [copiedEmailToast, setCopiedEmailToast] = useState(false);

  useEffect(() => {
    // Subscribe to sound changes
    const unsubscribe = sound.subscribe((state) => {
      setSoundState(state);
    });

    // Auto-attempt playback on lobby mount
    if (!sound.getMutedState()) {
      sound.playBgm();
    }

    return () => unsubscribe();
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = sound.toggleMute();
    if (!muted) {
      sound.playClick();
      sound.playBgm();
    }
  };

  const handleOpenTab = (tab: ActiveHudTab) => {
    sound.playModalOpen();
    setActiveTab(tab);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveTab('none');
    setSelectedProject(null);
  };

  const handleStartGame = () => {
    sound.playMatchStart();
    setActiveTab('experience');
  };

  const handleTouchCharacter = () => {
    sound.playClick();
    setIsCharacterInspecting((prev) => !prev);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('prasanthgrandhisiri@gmail.com');
    sound.playClick();
    setCopiedEmailToast(true);
    setTimeout(() => setCopiedEmailToast(false), 2200);
  };

  const featuredProject = projects.find(p => p.featured) || projects[0];

  return (
    <div
      id="pubg-lobby-container"
      className="relative w-screen h-[100svh] overflow-hidden bg-[#080B0D] select-none pubg-lobby-frame font-sans"
    >
      {/* 1. IMMERSIVE UNIFIED LOBBY SCENE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={profile.lobbyBgImage}
          alt="PUBG Lobby Environment"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000"
        />
        {/* Soft atmospheric gradient & ground vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D]/85 via-transparent to-[#080B0D]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(8,11,13,0.7)_100%)]" />
        <div className="pubg-scanlines absolute inset-0 opacity-15" />
      </div>

      {/* 2. INTERACTIVE OPERATIVE HOTSPOT IN CENTER */}
      <div 
        className="absolute inset-x-0 bottom-[14%] sm:bottom-[10%] top-[10%] sm:top-[12%] flex justify-center items-center z-15 pointer-events-none"
      >
        <div className="relative w-full max-w-2xl h-full flex justify-center items-center">
          {/* Operative Touch Hitbox */}
          <div
            id="operative-character-hitbox"
            onClick={handleTouchCharacter}
            onMouseEnter={() => {
              setIsCharacterHovered(true);
              sound.playHover();
            }}
            onMouseLeave={() => setIsCharacterHovered(false)}
            className="pointer-events-auto cursor-pointer relative w-64 sm:w-80 md:w-96 h-[88%] rounded-2xl flex flex-col items-center justify-end pb-8 group"
          >
            {/* Holographic Scan Ring on Hover */}
            <AnimatePresence>
              {isCharacterHovered && !isCharacterInspecting && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 border border-[#FFB900]/40 rounded-xl bg-[#FFB900]/5 backdrop-blur-[1px] flex flex-col justify-between p-3 pointer-events-none"
                >
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#FFB900]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Target className="w-3.5 h-3.5 animate-spin" />
                      <span>TARGET LOCKED: SAI PRASANTH</span>
                    </div>
                    <span>LV.99 // CONQUEROR</span>
                  </div>

                  <div className="flex justify-center items-center opacity-60">
                    <Crosshair className="w-12 h-12 text-[#FFB900] animate-pulse" />
                  </div>

                  <div className="flex items-center justify-between font-mono-tech text-[9px] text-[#34D399]">
                    <span>STATUS: READY FOR DEPLOYMENT</span>
                    <span>STAFFORD, TX</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating prompt invite to touch character */}
            {!isCharacterInspecting && (
              <motion.div
                animate={{ y: [0, -4, 0], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-black/85 backdrop-blur-md border border-[#FFB900] px-3 sm:px-4 py-1.5 text-center shadow-[0_0_20px_rgba(255,185,0,0.35)] transform group-hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-center space-x-1.5 font-mono-tech text-[10px] sm:text-[11px] text-[#FFB900] font-bold tracking-widest uppercase">
                  <Crosshair className="w-3.5 h-3.5 animate-pulse text-[#FFB900]" />
                  <span>TAP OPERATIVE FOR CHARACTERISTICS</span>
                </div>
                <div className="text-[9px] font-mono-tech text-white/90 mt-0.5">
                  Sai Prasanth • Backend & AI Engineer
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 3. CENTERED SCI-FI POPUP: OPERATIVE CHARACTERISTICS DOSSIER OVERLAY (Pops right when touched) */}
      <AnimatePresence>
        {isCharacterInspecting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#0E1216] border-2 border-[#FFB900] p-4 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden text-left"
            >
              {/* Header Strip */}
              <div className="flex items-center justify-between border-b border-[#3A3F45] pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-[#FFB900] animate-pulse" />
                  <span className="font-mono-tech text-[10px] sm:text-[11px] text-[#FFB900] font-bold tracking-widest uppercase">
                    OPERATIVE CHARACTERISTICS // CLASSIFIED
                  </span>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsCharacterInspecting(false);
                  }}
                  className="p-1.5 text-[#A6A6A0] hover:text-[#FFB900] hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Characteristics Content */}
              <div className="overflow-y-auto space-y-4 custom-scrollbar pr-1">
                {/* Identity Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase">
                      Sai Prasanth
                    </h3>
                    <span className="bg-[#FFB900] text-[#080B0D] font-display font-black text-xs px-2 py-0.5">
                      LV.99 PRO
                    </span>
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm text-[#FFB900] tracking-wider uppercase flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Backend & AI Engineer</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-[#A6A6A0] font-mono-tech pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FFB900] flex-shrink-0" />
                    <span className="text-[#F5F5F0]">Stafford, TX (Texas, US) // Remote & Hybrid</span>
                  </div>
                </div>

                {/* Headline / Specialization Badge */}
                <div className="bg-[#151A20] p-3 border-l-2 border-l-[#FFB900]">
                  <span className="text-[9px] font-mono-tech text-[#FFB900] uppercase font-bold block mb-1">
                    PRIMARY DIRECTIVE & HEADLINE
                  </span>
                  <p className="text-xs font-mono-tech text-white leading-relaxed font-semibold">
                    Production LLM agents, asynchronous Python services (FastAPI/AsyncIO), distributed RAG pipelines, and safety-critical evaluation tooling.
                  </p>
                </div>

                {/* Characteristics Matrix */}
                <div className="space-y-2 bg-[#12161C] p-3 border border-white/5">
                  <span className="text-[10px] font-mono-tech text-[#FFB900] uppercase font-bold block">
                    OPERATIVE PROFICIENCY RATINGS
                  </span>
                  
                  <div className="space-y-2 text-[11px] font-mono-tech">
                    <div>
                      <div className="flex justify-between text-white mb-0.5">
                        <span>Autonomous Multi-Agent Swarms</span>
                        <span className="text-[#FFB900] font-bold">98% [MASTER]</span>
                      </div>
                      <div className="h-1.5 bg-[#1C232B] w-full overflow-hidden">
                        <div className="h-full bg-[#FFB900] w-[98%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-white mb-0.5">
                        <span>Python Microservices (FastAPI/AsyncIO)</span>
                        <span className="text-[#FFB900] font-bold">98% [MASTER]</span>
                      </div>
                      <div className="h-1.5 bg-[#1C232B] w-full overflow-hidden">
                        <div className="h-full bg-[#FFB900] w-[98%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-white mb-0.5">
                        <span>Safety-Critical Eval & Guardrails</span>
                        <span className="text-[#FFB900] font-bold">95% [MASTER]</span>
                      </div>
                      <div className="h-1.5 bg-[#1C232B] w-full overflow-hidden">
                        <div className="h-full bg-[#FFB900] w-[95%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-white mb-0.5">
                        <span>Sub-50ms Vector RAG & Retrieval</span>
                        <span className="text-[#FFB900] font-bold">96% [MASTER]</span>
                      </div>
                      <div className="h-1.5 bg-[#1C232B] w-full overflow-hidden">
                        <div className="h-full bg-[#FFB900] w-[96%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2">
                    {/* GitHub CTA */}
                    <a
                      href="https://github.com/saiprasanth-git"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex items-center justify-center space-x-1.5 bg-[#1A222B] hover:bg-[#252E38] text-white border border-white/20 hover:border-[#FFB900] py-2 px-2.5 text-xs font-mono-tech font-bold transition-all truncate"
                    >
                      <Github className="w-3.5 h-3.5 text-[#FFB900] flex-shrink-0" />
                      <span className="truncate">saiprasanth-git</span>
                    </a>

                    {/* Email CTA with Copy */}
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center justify-center space-x-1.5 bg-[#1A222B] hover:bg-[#252E38] text-white border border-white/20 hover:border-[#FFB900] py-2 px-2.5 text-xs font-mono-tech font-bold transition-all truncate"
                      title="Copy email: prasanthgrandhisiri@gmail.com"
                    >
                      {copiedEmailToast ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Mail className="w-3.5 h-3.5 text-[#FFB900] flex-shrink-0" />}
                      <span className="truncate">{copiedEmailToast ? 'COPIED!' : 'EMAIL OPERATIVE'}</span>
                    </button>
                  </div>

                  {/* Open Hobbies / Passions Button */}
                  <button
                    onClick={() => {
                      sound.playModalOpen();
                      setIsCharacterInspecting(false);
                      setActiveTab('hobbies');
                    }}
                    className="w-full pubg-start-btn py-2 text-center font-display font-black text-xs text-[#080B0D] uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>VIEW HOBBIES & PASSIONS</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. TOP HUD BAR (Player Profile, Currencies, Conqueror Pass, Contact CTA) */}
      <div className="absolute top-0 inset-x-0 p-2 sm:p-4 md:p-5 flex items-start justify-between z-20 pointer-events-auto">
        {/* Top Left Stack: Player Profile, followed by Map Selector Card, START button, and tactical toolbar */}
        <div className="flex flex-col space-y-2 sm:space-y-2.5 max-w-[260px] sm:max-w-[275px]">
          {/* Player Avatar, Level, Callsign, Rank */}
          <div
            onClick={() => handleOpenTab('hobbies')}
            className="group flex items-center space-x-2 sm:space-x-3 bg-black/80 hover:bg-black/95 backdrop-blur-md p-1.5 sm:p-2 border border-white/20 hover:border-[#FFB900] cursor-pointer transition-all shadow-lg w-fit"
          >
            {/* Avatar with LV badge */}
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-11 sm:h-11 object-cover border border-[#FFB900]"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#FFB900] text-[#080B0D] font-display font-black text-[9px] px-1 py-0.2">
                LV.{profile.level}
              </div>
            </div>

            {/* Player Info */}
            <div className="pr-1 sm:pr-2">
              <div className="flex items-center space-x-1.5">
                <Crown className="w-3.5 h-3.5 text-[#FFB900]" />
                <span className="font-display font-black text-xs sm:text-sm text-white tracking-wider uppercase group-hover:text-[#FFB900] transition-colors">
                  {profile.name}
                </span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono-tech text-[#FFB900] flex items-center gap-1 sm:gap-1.5">
                <span>{profile.rank}</span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-[#34D399] font-bold hidden sm:inline">● {profile.serverPing}</span>
              </div>
            </div>
          </div>

          {/* AUTHENTIC MAP SELECTOR HUD CARD (Above START Button) */}
          <ArcadeModeCard
            region="Texas"
            selectModeLabel="Select Mode"
            modeTitle="Stafford"
            perspective="(TPP)"
            mapSubtitle="Map: Quick Match"
            playerCount={4}
            weaponImageUrl="/src/assets/images/pubg_weapon_arcade.jpg"
            onClick={handleStartGame}
            className="shadow-2xl"
          />

          {/* COMPACT AUTHENTIC PUBG START BUTTON (Directly below Map Card) */}
          <button
            id="pubg-main-start-btn"
            onClick={handleStartGame}
            onMouseEnter={() => sound.playHover()}
            className="pubg-start-btn w-full py-2 sm:py-2.5 px-4 flex items-center justify-center space-x-2 text-[#080B0D] font-display font-black text-lg sm:text-xl tracking-[0.18em] uppercase shadow-[0_8px_25px_rgba(255,185,0,0.45)] transform hover:scale-[1.01] active:scale-[0.98] transition-all"
            title="Launch Career Experience & Missions"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#080B0D]" />
            <span>START</span>
          </button>

          {/* Tactical Quick Action Toolbar (Voice, Mic, Invite 10/151) */}
          <div className="flex items-center space-x-1.5 pt-0.5">
            <button
              onClick={toggleSound}
              title={soundState.isMuted ? "Unmute Audio" : "Mute Audio"}
              className="hud-panel p-1.5 sm:p-2 text-[#C8C7BE] hover:text-[#F2C62D] hover:border-[#F2C62D] transition-colors"
            >
              {soundState.isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F2C62D]" />}
            </button>
            
            <button
              onClick={() => sound.playClick()}
              title="Voice Channel: All Team"
              className="hud-panel p-1.5 sm:p-2 text-[#C8C7BE] hover:text-[#F2C62D] hover:border-[#F2C62D] transition-colors"
            >
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#34D399]" />
            </button>

            {/* Invite 10/151 button (Opens Contact/Team Dispatch modal) */}
            <button
              onClick={() => handleOpenTab('contact')}
              onMouseEnter={() => sound.playHover()}
              className="hud-panel px-2.5 sm:px-3 py-1.5 flex items-center space-x-1.5 text-[#C8C7BE] hover:text-white hover:border-[#F2C62D] transition-colors flex-1 justify-between"
            >
              <div className="flex items-center space-x-1.5">
                <UserPlus className="w-3.5 h-3.5 text-[#F2C62D]" />
                <span className="font-condensed font-bold text-xs uppercase tracking-wider">
                  Invite <span className="text-[#F2C62D]">10/151</span>
                </span>
              </div>
              <ChevronRight className="w-3 h-3 text-[#A6A6A0]" />
            </button>
          </div>
        </div>

        {/* Top Right & Right Side: Currencies + Right-Side Navigation (PROJECTS, HOBBIES, SKILLS, EXPERIENCE) */}
        <div className="flex flex-col items-end space-y-2.5 pointer-events-auto">
          {/* Top Bar: Currencies, Conqueror Pass, and Contact Button */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Currency 1: BP (Years Experience) */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 bg-black/75 backdrop-blur-md px-2 sm:px-2.5 py-1 border border-white/15">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FFB900] text-[#080B0D] font-black text-[8px] sm:text-[9px] flex items-center justify-center font-display">
                G
              </div>
              <div className="font-mono-tech text-[11px] sm:text-xs text-[#FFB900] font-bold">
                {profile.currencies.bp}
              </div>
            </div>

            {/* Currency 2: UC (Code Repos / Commits) */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 bg-black/75 backdrop-blur-md px-2 sm:px-2.5 py-1 border border-white/15">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-xs bg-[#4FC3F7] text-[#080B0D] font-black text-[8px] sm:text-[9px] flex items-center justify-center font-display">
                ★
              </div>
              <div className="font-mono-tech text-[11px] sm:text-xs text-white font-bold">
                {profile.currencies.uc}
              </div>
            </div>

            {/* S-Tier Career Pass Button */}
            <button
              id="rp-pass-btn"
              onClick={() => handleOpenTab('experience')}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-[#D8940B] to-[#FFB900] text-[#080B0D] px-2.5 sm:px-3 py-1 font-display font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
              title="Open Career Experience & Resume Hub"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">CONQUEROR PASS</span>
              <span className="sm:hidden">PASS</span>
            </button>

            {/* Contact / Hire Button */}
            <button
              id="shop-hire-btn"
              onClick={() => handleOpenTab('contact')}
              className="flex items-center space-x-1 bg-[#1C232B] hover:bg-[#26303B] text-[#FFB900] border border-[#FFB900]/50 px-2 sm:px-2.5 py-1 font-display font-bold text-xs uppercase tracking-wider transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FFB900]" />
              <span>CONTACT</span>
            </button>
          </div>

          {/* RIGHT-HAND SIDE TACTICAL NAVIGATION PANELS */}
          <div className="flex flex-col space-y-1.5 sm:space-y-2 w-44 sm:w-52">
            {/* 1. PROJECTS (Brought out to right-hand menu) */}
            <button
              id="hud-nav-projects"
              onClick={() => handleOpenTab('projects')}
              onMouseEnter={() => sound.playHover()}
              className="group hud-panel flex items-center justify-between p-2 sm:p-2.5 text-left border-r-3 border-r-[#FFB900] bg-black/85 hover:bg-black/95 transition-all shadow-md"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1 sm:p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors rounded-[2px]">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-display font-black text-[11px] sm:text-xs text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors flex items-center gap-1.5">
                    <span>PROJECTS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-mono-tech text-[#A6A6A0]">
                    GitHub Repositories
                  </div>
                </div>
              </div>
              <span className="bg-red-600 text-white font-mono-tech font-bold text-[8px] sm:text-[9px] px-1 py-0.2">
                CODE
              </span>
            </button>

            {/* 2. HOBBIES */}
            <button
              id="hud-nav-hobbies"
              onClick={() => handleOpenTab('hobbies')}
              onMouseEnter={() => sound.playHover()}
              className="group hud-panel flex items-center justify-between p-2 sm:p-2.5 text-left border-r-3 border-r-[#FFB900] bg-black/85 hover:bg-black/95 transition-all shadow-md"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1 sm:p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors rounded-[2px]">
                  <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-display font-black text-[11px] sm:text-xs text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                    HOBBIES
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-mono-tech text-[#A6A6A0]">
                    Gaming & Passions
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* 3. SKILLS */}
            <button
              id="hud-nav-skills"
              onClick={() => handleOpenTab('skills')}
              onMouseEnter={() => sound.playHover()}
              className="group hud-panel flex items-center justify-between p-2 sm:p-2.5 text-left border-r-3 border-r-[#FFB900] bg-black/85 hover:bg-black/95 transition-all shadow-md"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1 sm:p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors rounded-[2px]">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-display font-black text-[11px] sm:text-xs text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                    SKILLS
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-mono-tech text-[#A6A6A0]">
                    Tech & LLM Stacks
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* 4. EXPERIENCE */}
            <button
              id="hud-nav-experience"
              onClick={() => handleOpenTab('experience')}
              onMouseEnter={() => sound.playHover()}
              className="group hud-panel flex items-center justify-between p-2 sm:p-2.5 text-left border-r-3 border-r-[#FFB900] bg-black/85 hover:bg-black/95 transition-all shadow-md"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1 sm:p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors rounded-[2px]">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-display font-black text-[11px] sm:text-xs text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                    EXPERIENCE
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-mono-tech text-[#A6A6A0]">
                    Timeline & Resume
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM HUD STRIP (Location, Relays / Social Links, Title Return) */}
      <div className="absolute bottom-0 inset-x-0 h-11 sm:h-12 bg-black/90 backdrop-blur-md border-t border-[#3A3F45] px-2 sm:px-6 flex items-center justify-between z-20 pointer-events-auto">
        {/* Left Server/Location Tag */}
        <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono-tech text-[#A6A6A0]">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span className="hidden xs:inline">LOCATION:</span>
          <span className="text-white font-bold">{profile.location}</span>
        </div>

        {/* Center: RELAYS (Social Channels) */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1">
          <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#FFB900] uppercase font-bold tracking-widest hidden sm:inline mr-1">
            RELAYS:
          </span>
          {socials.map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              title={soc.name}
              onClick={() => sound.playClick()}
              className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1 bg-[#1A222B]/90 hover:bg-[#FFB900] text-[#C8C7BE] hover:text-[#080B0D] border border-white/10 hover:border-[#FFB900] transition-colors rounded-[2px]"
            >
              {soc.name === 'GitHub' && <Github className="w-3.5 h-3.5" />}
              {soc.name === 'Direct Email' && <Mail className="w-3.5 h-3.5" />}
              {soc.name === 'Live Portfolio' && <Globe className="w-3.5 h-3.5" />}
              {soc.name === 'LinkedIn' && <Linkedin className="w-3.5 h-3.5" />}
              {soc.name === 'Comm Channel' && <Radio className="w-3.5 h-3.5" />}
              <span className="font-condensed font-bold text-[11px] sm:text-xs uppercase tracking-wider hidden md:inline">
                {soc.name}
              </span>
            </a>
          ))}
        </div>

        {/* Right Controls: Clean Title Return Button */}
        <div className="flex items-center space-x-2">
          <button
            id="return-title-btn"
            onClick={() => {
              sound.playClick();
              onReturnToTitle();
            }}
            className="flex items-center space-x-1 bg-[#181E24] hover:bg-[#252E38] border border-white/10 text-[9px] sm:text-[10px] font-mono-tech text-[#A6A6A0] hover:text-white px-2.5 py-1 sm:py-1.5 transition-colors rounded-[2px]"
            title="Return to Title Screen"
          >
            <RotateCcw className="w-3 h-3 text-[#FFB900]" />
            <span className="hidden sm:inline">TITLE</span>
          </button>
        </div>
      </div>

      {/* 9. MODAL OVERLAYS */}
      <AnimatePresence>
        {(activeTab === 'hobbies' || activeTab === 'about') && (
          <HobbiesModal
            profile={profile}
            hobbies={HOBBIES_DATA}
            stats={stats}
            onClose={handleCloseModal}
            onOpenProjects={() => setActiveTab('projects')}
            onOpenContact={() => setActiveTab('contact')}
          />
        )}

        {activeTab === 'projects' && !selectedProject && (
          <ProjectsModal
            projects={projects}
            onClose={handleCloseModal}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={handleCloseModal}
            onBackToProjects={() => setSelectedProject(null)}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceModal
            experiences={experiences}
            profile={profile}
            onClose={handleCloseModal}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsModal
            categories={skills}
            onClose={handleCloseModal}
          />
        )}

        {activeTab === 'contact' && (
          <ContactModal
            profile={profile}
            socials={socials}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
