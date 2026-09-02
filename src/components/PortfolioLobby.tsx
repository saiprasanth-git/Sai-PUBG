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
  Mic,
  MicOff,
  UserPlus,
  Users,
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
  Phone,
  X
} from 'lucide-react';
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

const MAP_SELECTOR_IMAGE = 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=1000&auto=format&fit=crop';

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
  const [micActive, setMicActive] = useState(true);
  const [copiedEmailToast, setCopiedEmailToast] = useState(false);

  useEffect(() => {
    const unsubscribe = sound.subscribe((state) => {
      setSoundState(state);
    });
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

  const toggleMic = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setMicActive((prev) => !prev);
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0D]/85 via-transparent to-[#080B0D]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(8,11,13,0.7)_100%)]" />
        <div className="pubg-scanlines absolute inset-0 opacity-15" />
      </div>

      {/* 2. NON-INTERACTIVE OPERATIVE VISUAL IN CENTER (no hover, no click, purely decorative) */}
      <div
        className="absolute inset-x-0 bottom-[14%] sm:bottom-[10%] top-[10%] sm:top-[12%] flex justify-center items-center z-15 pointer-events-none"
      >
        <div className="relative w-full max-w-2xl h-full flex justify-center items-center">
          <div
            id="operative-character-hitbox"
            className="relative w-64 sm:w-80 md:w-96 h-[88%] rounded-2xl flex flex-col items-center justify-end pb-8"
          />
        </div>
      </div>

      {/* 4. TOP HUD BAR (Player Profile, Currencies, Conqueror Pass, Contact CTA) */}
      <div className="absolute top-0 inset-x-0 p-2 sm:p-4 md:p-5 flex items-start justify-between z-20 pointer-events-auto">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div
            onClick={() => handleOpenTab('hobbies')}
            className="group flex items-center space-x-2 sm:space-x-3 bg-black/80 hover:bg-black/95 backdrop-blur-md p-1.5 sm:p-2 border border-white/20 hover:border-[#FFB900] cursor-pointer transition-all shadow-lg"
          >
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-12 sm:h-12 object-cover border border-[#FFB900]"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#FFB900] text-[#080B0D] font-display font-black text-[9px] px-1 py-0.2">
                LV.{profile.level}
              </div>
            </div>
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
        </div>
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          <div className="flex items-center space-x-1 sm:space-x-1.5 bg-black/75 backdrop-blur-md px-2 sm:px-2.5 py-1 border border-white/15">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FFB900] text-[#080B0D] font-black text-[8px] sm:text-[9px] flex items-center justify-center font-display">
              G
            </div>
            <div className="font-mono-tech text-[11px] sm:text-xs text-[#FFB900] font-bold">
              {profile.currencies.bp}
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-1.5 bg-black/75 backdrop-blur-md px-2 sm:px-2.5 py-1 border border-white/15">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-xs bg-[#4FC3F7] text-[#080B0D] font-black text-[8px] sm:text-[9px] flex items-center justify-center font-display">
              ★
            </div>
            <div className="font-mono-tech text-[11px] sm:text-xs text-white font-bold">
              {profile.currencies.uc}
            </div>
          </div>
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
          <button
            id="shop-hire-btn"
            onClick={() => handleOpenTab('contact')}
            className="flex items-center space-x-1 bg-[#1C232B] hover:bg-[#26303B] text-[#FFB900] border border-[#FFB900]/50 px-2 sm:px-2.5 py-1 font-display font-bold text-xs uppercase tracking-wider transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#FFB900]" />
            <span>CONTACT</span>
          </button>
        </div>
      </div>

      {/* 5. RIGHT-SIDE PANEL: FEATURED REPOSITORY SPOTLIGHT + NAVIGATION (Desktop only) */}
      <div className="hidden lg:flex absolute right-4 md:right-6 top-20 sm:top-24 z-20 flex-col space-y-2 sm:space-y-2.5 w-48 sm:w-56 pointer-events-auto">
        {featuredProject && (
          <div
            onClick={() => {
              sound.playModalOpen();
              setSelectedProject(featuredProject);
            }}
            className="group hud-panel p-3 border-r-4 border-r-[#FFB900] cursor-pointer hover:border-[#FFB900] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono-tech text-[9px] text-[#FFB900] font-bold uppercase">
                FEATURED REPOSITORY
              </span>
              <span className="bg-[#FFB900] text-[#080B0D] font-display font-black text-[9px] px-1 py-0.2">
                GITHUB
              </span>
            </div>
            <div className="font-display font-black text-xs text-white group-hover:text-[#FFB900] transition-colors truncate">
              {featuredProject.title}
            </div>
            <div className="text-[10px] text-[#A6A6A0] line-clamp-2 mt-1 font-mono-tech">
              {featuredProject.subtitle}
            </div>
            <div className="mt-2 text-[10px] font-mono-tech text-[#FFB900] flex items-center justify-end gap-1 font-bold">
              <span>VIEW REPOSITORY</span>
              <ChevronRight className="w-3 h-3 text-[#FFB900]" />
            </div>
          </div>
        )}
        <button
          id="hud-nav-projects"
          onClick={() => handleOpenTab('projects')}
          onMouseEnter={() => sound.playHover()}
          className="group hud-panel flex items-center justify-between p-2.5 sm:p-3 text-left border-r-4 border-r-[#FFB900]"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors flex items-center gap-1.5">
                <span>PROJECTS</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="text-[9px] font-mono-tech text-[#A6A6A0]">
                GitHub Repositories
              </div>
            </div>
          </div>
          <span className="bg-red-600 text-white font-mono-tech font-bold text-[9px] px-1.5 py-0.2">
            CODE
          </span>
        </button>
        <button
          id="hud-nav-hobbies"
          onClick={() => handleOpenTab('hobbies')}
          onMouseEnter={() => sound.playHover()}
          className="group hud-panel flex items-center justify-between p-2.5 sm:p-3 text-left border-r-4 border-r-[#FFB900]"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                HOBBIES
              </div>
              <div className="text-[9px] font-mono-tech text-[#A6A6A0]">
                Gaming & Passions
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
        </button>
        <button
          id="hud-nav-skills"
          onClick={() => handleOpenTab('skills')}
          onMouseEnter={() => sound.playHover()}
          className="group hud-panel flex items-center justify-between p-2.5 sm:p-3 text-left border-r-4 border-r-[#FFB900]"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                SKILLS
              </div>
              <div className="text-[9px] font-mono-tech text-[#A6A6A0]">
                Tech & LLM Stacks
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
        </button>
        <button
          id="hud-nav-experience"
          onClick={() => handleOpenTab('experience')}
          onMouseEnter={() => sound.playHover()}
          className="group hud-panel flex items-center justify-between p-2.5 sm:p-3 text-left border-r-4 border-r-[#FFB900]"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                EXPERIENCE
              </div>
              <div className="text-[9px] font-mono-tech text-[#A6A6A0]">
                Timeline & Resume
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* 7. LEFT ACTION STACK: MAP SELECTOR CARD, START BUTTON, MICRO-TOOLBAR */}
      <div className="absolute left-3 sm:left-4 md:left-6 bottom-16 sm:bottom-16 z-20 flex flex-col space-y-1.5 sm:space-y-2 pointer-events-auto w-[240px] sm:w-[260px]">
        {/* MAP SELECTOR HUD CARD (ArcadeModeCard) */}
        <div
          onClick={() => handleOpenTab('projects')}
          className="relative w-full h-[100px] sm:h-[115px] bg-[#12161a]/95 border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between p-2.5 sm:p-3 group cursor-pointer hover:border-[#FFB900]/60 transition-all"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FFB900]" />
          <img
            src={MAP_SELECTOR_IMAGE}
            alt="Tactical loadout"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-300 tracking-wide">Texas</span>
            <span className="flex items-center font-bold text-[#FFB900] text-[11px] tracking-tight group-hover:translate-x-0.5 transition-transform">
              Select Mode &gt;&gt;&gt;
            </span>
          </div>
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase drop-shadow">
                  Stafford
                </span>
                <span className="text-xs font-medium text-zinc-400 font-mono-tech tracking-tighter">
                  (TPP)
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium">Map: Quick Match</p>
            </div>
            <div className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 border border-white/10 text-zinc-300 text-[11px] font-mono-tech">
              <Users className="w-3.5 h-3.5 text-[#FFB900]" />
              <span className="font-bold">4</span>
            </div>
          </div>
        </div>
        {/* GIANT YELLOW PUBG START BUTTON */}
        <button
          id="pubg-main-start-btn"
          onClick={handleStartGame}
          onMouseEnter={() => sound.playHover()}
          className="pubg-start-btn w-full py-2.5 sm:py-3 px-4 sm:px-6 flex items-center justify-center space-x-2 sm:space-x-3 text-[#080B0D] font-display font-black text-xl sm:text-2xl tracking-[0.18em] uppercase shadow-[0_10px_35px_rgba(255,185,0,0.5)] transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#080B0D]" />
          <span>START</span>
        </button>
        {/* TACTICAL MICRO-TOOLBAR */}
        <div className="flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-xs text-zinc-300">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="hover:text-[#FFB900] transition-colors"
              title="Toggle Speaker"
            >
              {soundState.isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleMic}
              className="hover:text-[#FFB900] transition-colors"
              title="Toggle Mic"
            >
              {micActive ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4 text-zinc-500" />}
            </button>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-mono-tech text-zinc-300 hover:text-[#FFB900] transition-colors">
            <UserPlus className="w-3.5 h-3.5" />
            <span>INVITE 10/151</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 8. BOTTOM HUD STRIP: LOCATION, RELAYS PILL ROW, TITLE RETURN */}
      <div className="absolute bottom-0 inset-x-0 h-11 sm:h-12 bg-black/90 backdrop-blur-md border-t border-[#3A3F45] px-2 sm:px-6 flex items-center justify-between z-20 pointer-events-auto">
        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono-tech text-[#A6A6A0]">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>LOCATION:</span>
          <span className="text-white font-bold">{profile.location}</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1 flex-1 min-w-0 justify-center">
          {socials
            .filter((soc) => soc.name !== 'LinkedIn' && soc.name !== 'Live Portfolio')
            .map((soc, idx) => {
              let Icon = Radio;
              if (soc.name === 'GitHub') Icon = Github;
              if (soc.name === 'Direct Email') Icon = Mail;
              return (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1 sm:gap-1.5 bg-white/5 hover:bg-[#FFB900]/20 hover:border-[#FFB900]/50 border border-white/10 px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono-tech text-[#A6A6A0] hover:text-white transition-all uppercase whitespace-nowrap"
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFB900]" />
                  <span className="hidden md:inline">{soc.name}</span>
                </a>
              );
            })}
          <a
            href="tel:+10000000000"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1 sm:gap-1.5 bg-white/5 hover:bg-[#FFB900]/20 hover:border-[#FFB900]/50 border border-white/10 px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono-tech text-[#A6A6A0] hover:text-white transition-all uppercase whitespace-nowrap"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFB900]" />
            <span className="hidden md:inline">Phone</span>
          </a>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onReturnToTitle();
          }}
          className="flex items-center space-x-1 text-[#A6A6A0] hover:text-[#FFB900] text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-wider transition-colors px-2 py-1 flex-shrink-0"
          title="Return to Title Screen"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>TITLE</span>
        </button>
      </div>

      {/* 9. MODAL OVERLAYS */}
      {(activeTab === 'hobbies' || activeTab === 'about') && (
        <HobbiesModal onClose={handleCloseModal} onOpenProjects={() => setActiveTab('projects')} onOpenContact={() => setActiveTab('contact')} />
      )}
      {activeTab === 'projects' && !selectedProject && (
        <ProjectsModal projects={projects} onClose={handleCloseModal} onSelectProject={(p) => setSelectedProject(p)} />
      )}
      {selectedProject && (
        <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      {activeTab === 'experience' && (
        <ExperienceModal experiences={experiences} onClose={handleCloseModal} />
      )}
      {activeTab === 'skills' && (
        <SkillsModal skills={skills} onClose={handleCloseModal} />
      )}
      {activeTab === 'contact' && (
        <ContactModal onClose={handleCloseModal} />
      )}
    </div>
  );
};
