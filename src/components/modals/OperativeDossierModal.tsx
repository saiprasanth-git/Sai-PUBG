import React from 'react';
import { motion } from 'motion/react';
import { ProfileInfo } from '../../types';
import { 
  X, 
  Crown, 
  Globe, 
  Crosshair, 
  ShieldCheck, 
  Zap,
  Target,
  Car,
  Github,
  Instagram
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { TACTICAL_WEAPONS, TACTICAL_VEHICLES } from '../../data/portfolioData';

interface OperativeDossierModalProps {
  profile: ProfileInfo;
  onClose: () => void;
  onOpenContact: () => void;
}

export const OperativeDossierModal: React.FC<OperativeDossierModalProps> = ({
  profile,
  onClose,
  onOpenContact
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0D1115] border-2 border-[#FFB900] shadow-[0_0_60px_rgba(0,0,0,0.98)] overflow-hidden text-left"
      >
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#14191F] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-2.5">
            <div className="w-3 h-3 bg-[#FFB900] animate-pulse" />
            <span className="font-mono-tech text-[10px] sm:text-xs text-[#FFB900] font-bold tracking-[0.2em] uppercase">
              OPERATIVE DOSSIER // CLASSIFIED PERSONNEL
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-[#A6A6A0] hover:text-[#FFB900] hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar pr-2">
          
          {/* 1. OPERATIVE IDENTITY & AVATAR BANNER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141920] p-4 sm:p-5 border border-white/10 relative overflow-hidden">
            <div className="flex items-center space-x-4 z-10">
              {/* Picture / Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-[#FFB900] shadow-[0_0_15px_rgba(255,185,0,0.35)]"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#FFB900] text-[#080B0D] font-display font-black text-[10px] px-1.5 py-0.5">
                  LV.{profile.level}
                </div>
              </div>

              {/* Name & Callsign */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-[#FFB900]" />
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase">
                    {profile.name}
                  </h2>
                </div>
                <div className="font-mono-tech text-xs text-[#FFB900] font-bold tracking-wider">
                  CALLSIGN: {profile.callsign} // {profile.rank}
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono-tech text-[#A6A6A0] pt-0.5">
                  <Globe className="w-3.5 h-3.5 text-[#34D399]" />
                  <span className="text-white font-semibold">North America</span>
                  <span className="text-white/30">•</span>
                  <span className="text-[#34D399] font-bold">● {profile.serverPing}</span>
                </div>
              </div>
            </div>

            {/* Status Tag */}
            <div className="z-10 self-stretch sm:self-center flex sm:flex-col justify-between items-end bg-[#0B0E11] sm:bg-transparent p-2 sm:p-0 border border-white/5 sm:border-0">
              <span className="text-[10px] font-mono-tech text-[#7A838F] uppercase">STATUS</span>
              <span className="text-xs font-mono-tech text-[#34D399] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                CONQUEROR PRO
              </span>
            </div>

            {/* Subtle background insignia */}
            <div className="absolute right-0 top-0 bottom-0 opacity-5 pointer-events-none flex items-center pr-6">
              <Crosshair className="w-44 h-44 text-[#FFB900]" />
            </div>
          </div>

          {/* 2. TACTICAL WEAPONS LOADOUT (GUNS: AWM, MK14, AK-49) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-[#FFB900]" />
                <span className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wider">
                  TACTICAL ARSENAL & WEAPONS (GUNS)
                </span>
              </div>
              <span className="font-mono-tech text-[10px] text-[#FFB900] uppercase font-bold">
                CRATE & DROP SPEC
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TACTICAL_WEAPONS.map((weapon) => (
                <div 
                  key={weapon.id}
                  className="bg-[#141920] border border-white/15 hover:border-[#FFB900] p-4 flex flex-col justify-between space-y-3 group transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono-tech text-[#FFB900] font-bold uppercase tracking-wider">
                        {weapon.category}
                      </span>
                      <span className="bg-[#FFB900] text-[#080B0D] font-display font-black text-[9px] px-1.5 py-0.2">
                        DMG {weapon.damage}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-lg text-white uppercase group-hover:text-[#FFB900] transition-colors">
                      {weapon.name}
                    </h4>
                    <div className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase mb-2">
                      {weapon.codename}
                    </div>

                    <p className="text-xs font-mono-tech text-[#C8C7BE] leading-relaxed mb-3">
                      {weapon.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-[10px] font-mono-tech">
                    <div className="flex justify-between text-[#A6A6A0]">
                      <span>AMMO:</span>
                      <span className="text-white font-bold">{weapon.ammo}</span>
                    </div>
                    <div className="flex justify-between text-[#A6A6A0]">
                      <span>RANGE:</span>
                      <span className="text-white font-bold">{weapon.effectiveRange}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[#34D399] font-bold pt-1">
                      <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{weapon.specialTrait}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. EXFIL FLEET & VEHICLES (CARS: FERRARI, MAFIA CAR) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-[#FFB900]" />
                <span className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wider">
                  EXFIL FLEET & COMBAT VEHICLES (CARS)
                </span>
              </div>
              <span className="font-mono-tech text-[10px] text-[#FFB900] uppercase font-bold">
                HIGH-VELOCITY MOTOR POOL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TACTICAL_VEHICLES.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className="bg-[#141920] border border-white/15 hover:border-[#FFB900] p-4 flex flex-col justify-between space-y-3 group transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono-tech text-[#FFB900] font-bold uppercase tracking-wider">
                        {vehicle.category}
                      </span>
                      <span className="bg-[#1E2733] text-[#34D399] border border-[#34D399]/40 font-mono-tech font-bold text-[10px] px-2 py-0.5">
                        {vehicle.topSpeed}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-lg text-white uppercase group-hover:text-[#FFB900] transition-colors">
                      {vehicle.name}
                    </h4>
                    <div className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase mb-2">
                      {vehicle.codename}
                    </div>

                    <p className="text-xs font-mono-tech text-[#C8C7BE] leading-relaxed mb-3">
                      {vehicle.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-[10px] font-mono-tech">
                    <div className="flex justify-between text-[#A6A6A0]">
                      <span>ENGINE:</span>
                      <span className="text-white font-bold">{vehicle.engine}</span>
                    </div>
                    <div className="flex justify-between text-[#A6A6A0]">
                      <span>ARMOR SPEC:</span>
                      <span className="text-white font-bold">{vehicle.armorRating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[#FFB900] font-bold pt-1">
                      <Zap className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{vehicle.specialTrait}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#14191F] border-t border-[#3A3F45]">
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/saiprasanth-git"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1C232B] hover:bg-[#28323D] text-white border border-white/15 text-xs font-mono-tech font-bold transition-all"
            >
              <Github className="w-3.5 h-3.5 text-[#FFB900]" />
              <span>GITHUB</span>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1C232B] hover:bg-[#28323D] text-white border border-white/15 text-xs font-mono-tech font-bold transition-all"
            >
              <span className="font-bold text-xs text-[#FFB900]">𝕏</span>
              <span>TWITTER</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1C232B] hover:bg-[#28323D] text-white border border-white/15 text-xs font-mono-tech font-bold transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-[#FFB900]" />
              <span>INSTAGRAM</span>
            </a>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onOpenContact();
              }}
              className="pubg-start-btn flex-1 sm:flex-none px-5 py-2 font-display font-black text-xs text-[#080B0D] uppercase tracking-wider"
            >
              CONTACT OPERATIVE
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
