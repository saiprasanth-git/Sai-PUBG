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
      <div className="pubg-top-hud absolute top-0 inset-x-0 p-1.5 sm:p-3 md:p-4 flex items-start justify-between z-20 pointer-events-auto">
        {/* Top Left: Player Avatar, Level, Callsign, Rank (Opens Operative Dossier) */}
        <div
          onClick={() => handleOpenTab('profile_dossier')}
          className="pubg-avatar-box group flex items-center space-x-1.5 sm:space-x-2.5 bg-black/80 hover:bg-black/95 backdrop-blur-md p-1 sm:p-1.5 border border-white/20 hover:border-[#FFB900] cursor-pointer transition-all shadow-lg w-fit"
        >
          {/* Avatar with LV badge */}
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="pubg-avatar-img w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-cover border border-[#FFB900]"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#FFB900] text-[#080B0D] font-display font-black text-[7px] sm:text-[8px] px-0.5 py-0.1 leading-none">
              LV.{profile.level}
            </div>
          </div>

          {/* Player Info */}
          <div className="pr-1">
            <div className="flex items-center space-x-1">
              <Crown className="w-3 h-3 text-[#FFB900]" />
              <span className="pubg-avatar-name font-display font-black text-[11px] sm:text-xs md:text-sm text-white tracking-wider uppercase group-hover:text-[#FFB900] transition-colors leading-tight">
                {profile.name}
              </span>
            </div>
            <div className="pubg-avatar-rank text-[8px] sm:text-[9px] font-mono-tech text-[#FFB900] flex items-center gap-1 leading-tight">
              <span>{profile.rank}</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="text-[#34D399] font-bold hidden sm:inline">● {profile.serverPing}</span>
            </div>
          </div>
        </div>

        {/* Top Right & Right Side: Currencies + Right-Side Navigation (PROJECTS, HOBBIES, SKILLS) */}
        <div className="flex flex-col items-end space-y-2 pointer-events-auto">
          {/* Top Bar: Currencies, Conqueror Pass, and Contact Button */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Currency 1: BP (Years Experience) */}
            <div className="pubg-top-currency flex items-center space-x-1 sm:space-x-1.5 bg-black/75 backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 border border-white/15">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FFB900] text-[#080B0D] font-black text-[7px] sm:text-[8px] flex items-center justify-center font-display">
                G
              </div>
              <div className="font-mono-tech text-[10px] sm:text-[11px] text-[#FFB900] font-bold">
                {profile.currencies.bp}
              </div>
            </div>

            {/* Currency 2: UC (Code Repos / Commits) */}
            <div className="pubg-top-currency flex items-center space-x-1 sm:space-x-1.5 bg-black/75 backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 border border-white/15">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs bg-[#4FC3F7] text-[#080B0D] font-black text-[7px] sm:text-[8px] flex items-center justify-center font-display">
                ★
              </div>
              <div className="font-mono-tech text-[10px] sm:text-[11px] text-white font-bold">
                {profile.currencies.uc}
              </div>
            </div>

            {/* S-Tier Career Pass Button */}
            <button
              id="rp-pass-btn"
              onClick={() => handleOpenTab('experience')}
              className="pubg-top-pass-btn flex items-center space-x-1 sm:space-x-1.5 bg-gradient-to-r from-[#D8940B] to-[#FFB900] text-[#080B0D] px-2 sm:px-2.5 py-0.5 sm:py-1 font-display font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
              title="Open Career Experience & Resume Hub"
            >
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span className="hidden sm:inline">CONQUEROR PASS</span>
              <span className="sm:hidden">PASS</span>
            </button>

            {/* Contact / Hire Button */}
            <button
              id="shop-hire-btn"
              onClick={() => handleOpenTab('contact')}
              className="pubg-top-contact-btn flex items-center space-x-1 bg-[#1C232B] hover:bg-[#26303B] text-[#FFB900] border border-[#FFB900]/50 px-2 sm:px-2.5 py-0.5 sm:py-1 font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFB900]" />
              <span>CONTACT</span>
            </button>
          </div>

          {/* RIGHT-HAND SIDE TACTICAL NAVIGATION PANELS */}
          <div className="pubg-right-nav-container flex flex-col space-y-1 sm:space-y-1.5 w-40 sm:w-48">
            {/* 1. PROJECTS */}
            <button
              id="hud-nav-projects"
              onClick={() => handleOpenTab('projects')}
              onMouseEnter={() => sound.playHover()}
              className="pubg-right-nav-btn group hud-panel flex items-center justify-between p-1.5 sm:p-2 text-left border-r-3 border-r-[#FFB900] bg-black/85 hover:bg-black/95 transition-all shadow-md"
            >
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <div className="p-1 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors rounded-[2px]">
                  <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div>
                  <div className="pubg-right-nav-title font-display font-black text-[10px] sm:text-[11px] text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors flex items-center gap-1.5">
                    <span>PROJECTS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <div className="pubg-right-nav-subtitle text-[8px] font-mono-tech text-[#A6A6A0]">
                    GitHub Repositories
                  </div>
                </div>
              </div>
              <span className="pubg-right-nav-badge bg-red-600 text-white font-mono-tech font-bold text-[7px] sm:text-[8px] px-1 py-0.1">
                CODE
              </span>
            </button>

            {/* 2. HOBBIES */}
            <button
              id="hud-nav-hobbies"
              onClick={() => handleOpenTab('hobbies')}
              onMouseEnter={() => sound.playHover()}
              className="pubg-right-nav-btn group hud-panel flex items-center justify-between p-1.5 sm:p-2 text-left border-r-3 border-r-[#FFB900] bg-black/85 hover:bg-black/95 transition-all shadow-md"
            >
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <div className="p-1 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors rounded-[2px]">
                  <Gamepad2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div>
                  <div className="pubg-right-nav-title font-display font-black text-[10px] sm:text-[11px] text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                    HOBBIES
                  </div>
                  <div className="pubg-right-nav-subtitle text-[8px] font-mono-tech text-[#A6A6A0]">
                    Gaming & Passions
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3 h-3 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* 3. SKILLS */}
            <button
              id="hud-nav-skills"
              onClick={() => handleOpenTab('skills')}
              onMouseEnter={() => sound.playHover()}
              className="pubg-right-nav-btn group hud-panel flex items-center justify-between p-1.5 sm:p-2 text-left border-r-3 border-r-[#FFB900] bg-black/85 hover:bg-black/95 transition-all shadow-md"
            >
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <div className="p-1 bg-[#FFB900]/15 text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#080B0D] transition-colors rounded-[2px]">
                  <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div>
                  <div className="pubg-right-nav-title font-display font-black text-[10px] sm:text-[11px] text-white uppercase tracking-wider group-hover:text-[#FFB900] transition-colors">
                    SKILLS
                  </div>
                  <div className="pubg-right-nav-subtitle text-[8px] font-mono-tech text-[#A6A6A0]">
                    Tech & LLM Stacks
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3 h-3 text-[#A6A6A0] group-hover:text-[#FFB900] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT TACTICAL LAUNCH HUD: Map Card + START Button + Quick Toolbar */}
      <div className="pubg-bottom-launch-hub absolute left-2 sm:left-4 md:left-5 bottom-12 sm:bottom-14 z-20 flex flex-col space-y-1.5 sm:space-y-2 max-w-[200px] sm:max-w-[225px] md:max-w-[245px] pointer-events-auto">
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
          className="pubg-start-btn pubg-start-btn-landscape w-full py-1.5 sm:py-2 px-3 sm:px-4 flex items-center justify-center space-x-1.5 sm:space-x-2 text-[#080B0D] font-display font-black text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase shadow-[0_6px_20px_rgba(255,185,0,0.4)] transform hover:scale-[1.01] active:scale-[0.98] transition-all"
          title="Launch Career Experience & Missions"
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#080B0D]" />
          <span>START</span>
        </button>

        {/* Tactical Quick Action Toolbar (Voice, Mic, Invite 10/151) */}
        <div className="pubg-quick-toolbar flex items-center space-x-1 pt-0.5">
          <button
            onClick={toggleSound}
            title={soundState.isMuted ? "Unmute Audio" : "Mute Audio"}
            className="pubg-quick-tool-btn hud-panel p-1 sm:p-1.5 text-[#C8C7BE] hover:text-[#F2C62D] hover:border-[#F2C62D] transition-colors"
          >
            {soundState.isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F2C62D]" />}
          </button>
          
          <button
            onClick={() => sound.playClick()}
            title="Voice Channel: All Team"
            className="pubg-quick-tool-btn hud-panel p-1 sm:p-1.5 text-[#C8C7BE] hover:text-[#F2C62D] hover:border-[#F2C62D] transition-colors"
          >
            <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#34D399]" />
          </button>

          {/* Invite 10/151 button (Opens Contact/Team Dispatch modal) */}
          <button
            onClick={() => handleOpenTab('contact')}
            onMouseEnter={() => sound.playHover()}
            className="pubg-quick-tool-btn hud-panel px-2 sm:px-2.5 py-1 flex items-center space-x-1 text-[#C8C7BE] hover:text-white hover:border-[#F2C62D] transition-colors flex-1 justify-between"
          >
            <div className="flex items-center space-x-1">
              <UserPlus className="w-3 h-3 text-[#F2C62D]" />
              <span className="font-condensed font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                Invite <span className="text-[#F2C62D]">10/151</span>
              </span>
            </div>
            <ChevronRight className="w-3 h-3 text-[#F2C62D]" />
          </button>
        </div>
      </div>

      {/* 4. BOTTOM HUD STRIP (Location, Relays / Social Links, Title Return) */}
      <div className="pubg-bottom-strip absolute bottom-0 inset-x-0 h-11 sm:h-12 bg-black/90 backdrop-blur-md border-t border-[#3A3F45] px-2 sm:px-6 flex items-center justify-between z-20 pointer-events-auto">
        {/* Left Server/Location Tag with Globe */}
        <div className="pubg-bottom-location flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-mono-tech text-[#A6A6A0]">
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
                  className="pubg-bottom-relay-btn flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1 bg-[#1A222B]/90 hover:bg-[#FFB900] text-[#C8C7BE] hover:text-[#080B0D] border border-white/10 hover:border-[#FFB900] transition-colors rounded-[2px]"
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
                className="pubg-bottom-relay-btn flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1 bg-[#1A222B]/90 hover:bg-[#FFB900] text-[#C8C7BE] hover:text-[#080B0D] border border-white/10 hover:border-[#FFB900] transition-colors rounded-[2px]"
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
            className="pubg-bottom-title-btn flex items-center space-x-1 bg-[#181E24] hover:bg-[#252E38] border border-white/10 text-[9px] sm:text-[10px] font-mono-tech text-[#A6A6A0] hover:text-white px-2.5 py-1 sm:py-1.5 transition-colors rounded-[2px]"
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
