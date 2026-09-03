import React from 'react';
import { motion } from 'motion/react';
import { ProfileInfo, DirectiveStat, HobbyItem } from '../../types';
import { X, Crosshair, Sparkles, Terminal, Zap, Compass, Gamepad2, Laptop, BookOpen, Flame } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HobbiesModalProps {
  profile: ProfileInfo;
  hobbies: HobbyItem[];
  stats: DirectiveStat[];
  onClose: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

export const HobbiesModal: React.FC<HobbiesModalProps> = ({
  profile,
  hobbies,
  stats,
  onClose,
  onOpenProjects,
  onOpenContact,
}) => {
  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crosshair':
        return <Crosshair className="w-5 h-5 text-[#FFB900]" />;
      case 'Cpu':
        return <Laptop className="w-5 h-5 text-[#FFB900]" />;
      case 'Sparkles':
        return <Gamepad2 className="w-5 h-5 text-[#FFB900]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#FFB900]" />;
      case 'Terminal':
        return <BookOpen className="w-5 h-5 text-[#FFB900]" />;
      case 'MapPin':
        return <Compass className="w-5 h-5 text-[#FFB900]" />;
      default:
        return <Flame className="w-5 h-5 text-[#FFB900]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="pubg-modal-card relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0F1317] border-2 border-[#FFB900] shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Modal Top Header Bar */}
        <div className="pubg-modal-header flex items-center justify-between px-4 sm:px-6 py-4 bg-[#151A20] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#FFB900] text-[#080B0D]">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] text-[#FFB900] tracking-widest uppercase font-bold">
                OPERATIVE DOSSIER // PERSONAL PROFILE
              </div>
              <h2 className="pubg-modal-title font-display font-black text-lg sm:text-2xl text-[#F5F5F0] tracking-wide uppercase">
                HOBBIES & PASSIONS // {profile.name}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-[#A6A6A0] hover:text-[#FFB900] hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          {/* Hobbies Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#FFB900] font-bold tracking-wider uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB900]" />
                ACTIVE HOBBIES & SPECIAL PASSIONS
              </span>
              <span className="font-mono-tech text-[11px] text-[#A6A6A0]">
                {hobbies.length} PURSUITS LOGGED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {hobbies.map((hobby) => (
                <div
                  key={hobby.id}
                  className="bg-[#161C22] border border-white/10 hover:border-[#FFB900] p-4 transition-colors relative group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-[#101418] border border-white/10">
                        {getHobbyIcon(hobby.iconName)}
                      </div>
                      <span className="text-[9px] font-mono-tech text-[#FFB900] bg-[#FFB900]/10 px-2 py-0.5 font-bold">
                        {hobby.category}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#FFB900] transition-colors">
                      {hobby.title}
                    </h4>

                    <p className="text-xs text-[#A6A6A0] leading-relaxed">
                      {hobby.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tech text-[#FFB900]">
                    <span className="text-[#A6A6A0] text-[10px]">TAG:</span>
                    <span className="font-bold">{hobby.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Gaming Setup & Hardware Specs */}
          <div className="bg-[#14191F] border border-white/10 p-4 sm:p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono-tech text-[#FFB900] font-bold uppercase">
              <Terminal className="w-4 h-4 text-[#FFB900]" />
              <span>BATTLE STATION & HOMELAB SETUP</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono-tech">
              <div className="bg-[#0E1216] p-2.5 border border-white/5">
                <span className="text-[10px] text-[#A6A6A0] block">KEYBOARD</span>
                <span className="text-white font-bold">Custom 75% Mechanical</span>
              </div>
              <div className="bg-[#0E1216] p-2.5 border border-white/5">
                <span className="text-[10px] text-[#A6A6A0] block">PRIMARY OS</span>
                <span className="text-white font-bold">Linux / macOS Dev</span>
              </div>
              <div className="bg-[#0E1216] p-2.5 border border-white/5">
                <span className="text-[10px] text-[#A6A6A0] block">HOMELAB</span>
                <span className="text-white font-bold">Local LLM & Containers</span>
              </div>
              <div className="bg-[#0E1216] p-2.5 border border-white/5">
                <span className="text-[10px] text-[#A6A6A0] block">GAMING RIG</span>
                <span className="text-white font-bold">High Refresh 240Hz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#151A20] border-t border-[#3A3F45]">
          <span className="font-mono-tech text-xs text-[#A6A6A0]">
            STATUS: <span className="text-[#34D399] font-bold">ONLINE & READY</span>
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onOpenProjects();
              }}
              className="px-4 py-2 bg-[#222933] hover:bg-[#2C3542] text-white font-mono-tech font-bold text-xs uppercase transition-colors"
            >
              VIEW GITHUB PROJECTS
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onOpenContact();
              }}
              className="px-4 py-2 bg-[#FFB900] hover:bg-[#FFC933] text-[#080B0D] font-display font-black text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              ESTABLISH COMMS
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
