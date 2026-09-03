import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
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
  Crown, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail, 
  RotateCcw, 
  ShoppingBag, 
  Flame, 
  Play, 
  Globe,
  UserPlus,
  Mic,
  Instagram
} from 'lucide-react';
import { ArcadeModeCard } from './ArcadeModeCard';
import { OperativeDossierModal } from './modals/OperativeDossierModal';
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

      {/* 2. TOP HUD BAR (Player Profile, Currencies, Conqueror Pass, Contact CTA) */}
      <div className="absolute top-0 inset-x-0 p-2 sm:p-4 md:p-5 flex items-start justify-between z-20 pointer-events-auto">
        {/* Top Left: Player Avatar, Level, Callsign, Rank (Opens Operative Dossier) */}
        <div
          onClick={() => handleOpenTab('profile_dossier')}
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

        {/* Top Right & Right Side: Currencies + Right-Side Navigation (PROJECTS, HOBBIES, SKILLS) */}
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
            {/* 1. PROJECTS */}
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
          </div>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT TACTICAL LAUNCH HUD: Map Card + START Button + Quick Toolbar */}
      <div className="absolute left-2 sm:left-4 md:left-6 bottom-13 sm:bottom-15 z-20 flex flex-col space-y-2 sm:space-y-2.5 max-w-[240px] sm:max-w-[260px] pointer-events-auto">
        {/* AUTHENTIC MAP SELECTOR HUD CARD (Stafford) - Click plays quick sound, doesn't open experience */}
        <ArcadeModeCard
          region="Texas"
          selectModeLabel="Select Mode"
          modeTitle="Stafford"
          perspective="(TPP)"
          mapSubtitle="Map: Quick Match"
          playerCount={4}
          weaponImageUrl="/src/assets/images/pubg_weapon_arcade.jpg"
          onClick={() => sound.playClick()}
          className="shadow-2xl"
        />

        {/* COMPACT AUTHENTIC PUBG START BUTTON */}
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

      {/* 4. BOTTOM HUD STRIP (Location, Relays / Social Links, Title Return) */}
      <div className="absolute bottom-0 inset-x-0 h-11 sm:h-12 bg-black/90 backdrop-blur-md border-t border-[#3A3F45] px-2 sm:px-6 flex items-center justify-between z-20 pointer-events-auto">
        {/* Left Server/Location Tag with Globe */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-mono-tech text-[#A6A6A0]">
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#34D399]" />
          <span className="hidden xs:inline text-[#7A838F]">LOCATION:</span>
          <span className="text-white font-bold">{profile.location}</span>
        </div>

        {/* Center: RELAYS (Social Channels) */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1">
          <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#FFB900] uppercase font-bold tracking-widest hidden sm:inline mr-1">
            RELAYS:
          </span>
          {socials.map((soc, idx) => {
            const isCommChannel = soc.name === 'Comm Channel';
            if (isCommChannel) {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    handleOpenTab('contact');
                  }}
                  title={soc.name}
                  className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1 bg-[#1A222B]/90 hover:bg-[#FFB900] text-[#C8C7BE] hover:text-[#080B0D] border border-white/10 hover:border-[#FFB900] transition-colors rounded-[2px]"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span className="font-condensed font-bold text-[11px] sm:text-xs uppercase tracking-wider hidden md:inline">
                    {soc.name}
                  </span>
                </button>
              );
            }
            return (
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
                {soc.name === 'X (Twitter)' && <span className="font-bold text-xs">𝕏</span>}
                {soc.name === 'Instagram' && <Instagram className="w-3.5 h-3.5" />}
                <span className="font-condensed font-bold text-[11px] sm:text-xs uppercase tracking-wider hidden md:inline">
                  {soc.name}
                </span>
              </a>
            );
          })}
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
        {activeTab === 'profile_dossier' && (
          <OperativeDossierModal
            profile={profile}
            onClose={handleCloseModal}
            onOpenContact={() => setActiveTab('contact')}
          />
        )}

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
