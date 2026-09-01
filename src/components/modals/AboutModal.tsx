import React from 'react';
import { motion } from 'motion/react';
import { ProfileInfo, DirectiveStat } from '../../types';
import { X, Shield, MapPin, Award, GraduationCap, Crosshair, Download, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AboutModalProps {
  profile: ProfileInfo;
  stats: DirectiveStat[];
  onClose: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  profile,
  stats,
  onClose,
  onOpenProjects,
  onOpenContact,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0F1317] border-2 border-[#FFB900] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#FFB900] text-[#080B0D]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] text-[#FFB900] tracking-widest uppercase font-bold">
                PERSONNEL DOSSIER // CLASSIFIED
              </div>
              <h2 className="font-display font-black text-xl md:text-2xl text-[#F5F5F0] tracking-wide uppercase">
                ABOUT // {profile.name}
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
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Top Hero Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#181E24] p-5 border border-white/10">
            {/* Avatar & Rank */}
            <div className="flex flex-col items-center text-center space-y-3 md:border-r md:border-white/10 md:pr-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 object-cover border-2 border-[#FFB900] shadow-md"
                />
                <div className="absolute -bottom-2 bg-[#FFB900] text-[#080B0D] font-display font-black text-xs px-2 py-0.5 uppercase tracking-wider">
                  LV.{profile.level}
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">{profile.name}</h3>
                <p className="font-mono-tech text-xs text-[#FFB900]">{profile.rank}</p>
                <div className="flex items-center justify-center space-x-1 text-xs text-[#A6A6A0] mt-1 font-mono-tech">
                  <MapPin className="w-3.5 h-3.5 text-[#FFB900]" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Core Bio & Mission */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="font-mono-tech text-[11px] text-[#FFB900] font-bold tracking-wider uppercase block mb-1">
                  OPERATIONAL BRIEFING
                </span>
                <p className="text-sm md:text-base text-[#F5F5F0] leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#101418] p-3 border border-white/5">
                  <span className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase block">ACTIVE STATUS</span>
                  <span className="text-xs font-mono-tech text-[#34D399] font-bold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    {profile.status}
                  </span>
                </div>
                <div className="bg-[#101418] p-3 border border-white/5">
                  <span className="text-[10px] font-mono-tech text-[#A6A6A0] uppercase block">TACTICAL EXP</span>
                  <span className="text-xs font-mono-tech text-[#FFB900] font-bold block mt-0.5">
                    {profile.yearsOfExperience} High-End Graphics
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tactical Stats Grid */}
          <div>
            <div className="font-mono-tech text-xs text-[#FFB900] tracking-widest uppercase font-bold mb-3 flex items-center gap-2">
              <Crosshair className="w-4 h-4" />
              DEPLOYMENT METRICS & STATS
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#181E24] p-4 border border-white/10 flex flex-col justify-between">
                  <span className="font-mono-tech text-[10px] text-[#A6A6A0] uppercase tracking-wider">{stat.label}</span>
                  <div className="my-2">
                    <span className="font-display font-black text-3xl md:text-4xl text-[#FFB900]">{stat.value}</span>
                    {stat.unit && <span className="font-mono-tech text-xs text-white/70 ml-1">{stat.unit}</span>}
                  </div>
                  <span className="font-mono-tech text-[10px] text-[#A6A6A0] truncate">{stat.subtext}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical & Personal Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Interests */}
            <div className="bg-[#181E24] p-5 border border-white/10 space-y-3">
              <div className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                TECHNICAL DIRECTIVES
              </div>
              <ul className="space-y-2">
                {profile.technicalInterests.map((interest, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-xs md:text-sm text-[#F5F5F0]">
                    <span className="w-1.5 h-1.5 bg-[#FFB900] rounded-sm" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-[#181E24] p-5 border border-white/10 space-y-3">
              <div className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                ACADEMIC & CERTIFICATIONS
              </div>
              <div className="space-y-3">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-[#FFB900] pl-3">
                    <div className="text-xs font-bold text-white">{edu.degree}</div>
                    <div className="text-[11px] font-mono-tech text-[#A6A6A0]">{edu.institution} • {edu.year}</div>
                    <div className="text-[11px] text-white/70 mt-0.5">{edu.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#151A20] border-t border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenProjects();
              }}
              className="pubg-start-btn font-display font-black text-sm text-[#080B0D] px-5 py-2.5 uppercase tracking-wider shadow-md"
            >
              VIEW PROJECTS & DIRECTIVES
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenContact();
              }}
              className="bg-[#242C35] hover:bg-[#2F3843] border border-white/20 font-display font-bold text-sm text-white px-4 py-2.5 uppercase tracking-wider transition-colors"
            >
              OPEN COMM LINK
            </button>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-xs font-mono-tech text-[#A6A6A0] hover:text-white uppercase transition-colors"
          >
            [CLOSE ESC]
          </button>
        </div>
      </motion.div>
    </div>
  );
};
