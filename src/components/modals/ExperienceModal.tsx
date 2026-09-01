import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExperienceItem, ProfileInfo } from '../../types';
import { X, Award, Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles, Download, FileText, ExternalLink } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ExperienceModalProps {
  experiences: ExperienceItem[];
  profile: ProfileInfo;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experiences, profile, onClose }) => {
  const handleDownloadResume = () => {
    sound.playClick();
    window.open(profile.resumeUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-[#0E1216] border-2 border-[#FFB900] shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#3A3F45] bg-[#12161C]">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#FFB900]" />
            <div>
              <div className="font-mono-tech text-[9px] text-[#FFB900] uppercase font-bold tracking-widest">
                CAREER PASS // RECORD & RESUME
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wide">
                Experience & Resume
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadResume}
              className="hidden sm:flex items-center gap-1.5 bg-[#FFB900] text-[#080B0D] px-3 py-1.5 font-display font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-2 text-[#A6A6A0] hover:text-[#FFB900] hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Download CTA */}
        <div className="sm:hidden p-3 border-b border-[#3A3F45]">
          <button
            onClick={handleDownloadResume}
            className="w-full flex items-center justify-center gap-1.5 bg-[#FFB900] text-[#080B0D] py-2 font-display font-black text-xs uppercase tracking-wider"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Timeline Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
          {experiences.map((item, index) => (
            <div key={item.id} className="relative pl-5 border-l-2 border-[#3A3F45]">
              <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#FFB900]" />
              <div className="font-mono-tech text-[9px] text-[#FFB900] uppercase font-bold tracking-widest mb-1">
                ROLE 0{index + 1} • {item.type}
              </div>
              <h3 className="font-display font-black text-base sm:text-lg text-white uppercase">
                {item.role}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-[#FFB900] font-bold mt-0.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{item.company}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[#A6A6A0] font-mono-tech mt-1">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.dates}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#D6D6D0] mt-2 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-3 space-y-1.5">
                {item.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-1.5 text-xs text-[#D6D6D0]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.technologies.map((tech) => (
                  <span key={tech} className="bg-[#1A222B] border border-white/10 text-[10px] font-mono-tech text-[#A6A6A0] px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[#3A3F45] bg-[#12161C]">
          <div className="font-mono-tech text-[10px] text-[#A6A6A0]">
            CAREER STATUS: <span className="text-[#34D399] font-bold">{profile.yearsOfExperience} VERIFIED</span>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-4 py-2 bg-[#222933] hover:bg-[#2C3542] text-white font-mono-tech font-bold text-xs uppercase transition-colors"
          >
            RETURN TO LOBBY
          </button>
        </div>
      </motion.div>
    </div>
  );
};
