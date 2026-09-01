import React from 'react';
import { motion } from 'motion/react';
import { SkillCategory } from '../../types';
import { X, Crosshair, Cpu, Flame, Layers, Server, Sparkles, Zap, Gamepad2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SkillsModalProps {
  categories: SkillCategory[];
  onClose: () => void;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ categories, onClose }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#0F1317] border-2 border-[#FFB900] shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#FFB900] text-[#080B0D]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] text-[#FFB900] tracking-widest uppercase font-bold">
                TACTICAL ARMORY // PROFICIENCY & CALIBER
              </div>
              <h2 className="font-display font-black text-xl md:text-2xl text-[#F5F5F0] tracking-wide uppercase">
                WEAPONRY & SKILL INVENTORY
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-[#151B21] border border-white/10 p-5 space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2 text-[#FFB900]">
                    {getCategoryIcon(cat.iconName)}
                    <h3 className="font-display font-black text-base text-white uppercase tracking-wider">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="font-mono-tech text-[10px] text-[#FFB900] bg-[#FFB900]/10 border border-[#FFB900]/30 px-2 py-0.5 font-bold">
                    {cat.code}
                  </span>
                </div>

                {/* Skills in Category */}
                <div className="space-y-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5 bg-[#0F1317] p-3 border border-white/5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white font-mono-tech">{skill.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#FFB900] text-[#080B0D] font-mono-tech font-black text-[10px] px-1.5 py-0.2">
                            {skill.tier}
                          </span>
                          <span className="font-mono-tech font-bold text-[#FFB900]">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-[#202730] overflow-hidden rounded-xs">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * sIdx }}
                          className="h-full bg-gradient-to-r from-[#D8940B] via-[#FFB900] to-[#FFC51B]"
                        />
                      </div>

                      <div className="text-[11px] font-mono-tech text-[#A6A6A0]">
                        {skill.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] border-t border-[#3A3F45]">
          <span className="text-xs font-mono-tech text-[#A6A6A0]">
            MASTERY LEVEL: 99 // EQUIPPED FOR NEXT-GEN PRODUCTION
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pubg-start-btn font-display font-black text-xs text-[#080B0D] px-5 py-2 uppercase tracking-wider shadow-md"
          >
            RETURN TO LOBBY
          </button>
        </div>
      </motion.div>
    </div>
  );
};
