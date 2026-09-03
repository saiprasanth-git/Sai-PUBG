import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { X, ArrowLeft, ExternalLink, Github, CheckCircle2, ShieldAlert, Cpu, Sparkles, Trophy, Layers } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
  onBackToProjects: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onBackToProjects,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features' | 'results'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.2 }}
        className="pubg-modal-card relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0F1317] border-2 border-[#FFB900] shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Header Bar */}
        <div className="pubg-modal-header flex items-center justify-between px-6 py-4 bg-[#151A20] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                sound.playClick();
                onBackToProjects();
              }}
              className="flex items-center space-x-1 text-xs font-mono-tech text-[#FFB900] bg-[#1F2630] hover:bg-[#2A3442] px-2.5 py-1.5 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ALL MISSIONS</span>
            </button>
            <div className="border-l border-white/20 pl-3">
              <span className="font-mono-tech text-[10px] text-[#FFB900] uppercase tracking-widest font-bold block">
                DOSSIER SPECIFICATION // {project.codename}
              </span>
              <h2 className="pubg-modal-title font-display font-black text-xl md:text-2xl text-white uppercase truncate max-w-lg">
                {project.title}
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

        {/* Hero Media Banner & Live Action Strip */}
        <div className="relative h-56 md:h-72 w-full bg-black overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1317] via-[#0F1317]/40 to-transparent" />
          
          {/* Floating Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[#FFB900] text-[#080B0D] font-display font-black text-xs px-2.5 py-0.5 uppercase">
                  {project.category}
                </span>
                <span className="bg-[#101418]/90 border border-white/20 text-[#A6A6A0] text-xs font-mono-tech px-2.5 py-0.5">
                  YEAR {project.year} • {project.clientOrStudio}
                </span>
              </div>
              <p className="text-sm md:text-base text-[#F5F5F0] font-medium max-w-2xl drop-shadow-md">
                {project.subtitle}
              </p>
            </div>

            {/* Quick External CTAs */}
            <div className="flex items-center space-x-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center space-x-2 pubg-start-btn font-display font-black text-xs text-[#080B0D] px-4 py-2 uppercase tracking-wider shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH LIVE DEMO</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center space-x-2 bg-[#1A222B] hover:bg-[#25303D] border border-white/20 text-xs font-mono-tech text-white px-3.5 py-2 uppercase transition-colors"
                >
                  <Github className="w-4 h-4 text-[#FFB900]" />
                  <span>SOURCE REPO</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 px-6 bg-[#151A20] border-b border-[#3A3F45] overflow-x-auto">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('overview');
            }}
            className={`px-4 py-3 text-xs font-mono-tech font-bold uppercase transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#FFB900] text-[#FFB900] bg-[#1E252E]'
                : 'border-transparent text-[#A6A6A0] hover:text-white'
            }`}
          >
            01 // OVERVIEW & CHALLENGE
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('architecture');
            }}
            className={`px-4 py-3 text-xs font-mono-tech font-bold uppercase transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-[#FFB900] text-[#FFB900] bg-[#1E252E]'
                : 'border-transparent text-[#A6A6A0] hover:text-white'
            }`}
          >
            02 // TECHNICAL ARCHITECTURE
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('features');
            }}
            className={`px-4 py-3 text-xs font-mono-tech font-bold uppercase transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-[#FFB900] text-[#FFB900] bg-[#1E252E]'
                : 'border-transparent text-[#A6A6A0] hover:text-white'
            }`}
          >
            03 // KEY FEATURES & VFX
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('results');
            }}
            className={`px-4 py-3 text-xs font-mono-tech font-bold uppercase transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'results'
                ? 'border-[#FFB900] text-[#FFB900] bg-[#1E252E]'
                : 'border-transparent text-[#A6A6A0] hover:text-white'
            }`}
          >
            04 // METRICS & IMPACT
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <span className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider block mb-1">
                  PROJECT DIRECTIVE SUMMARY
                </span>
                <p className="text-sm md:text-base text-[#F5F5F0] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.problem && (
                  <div className="bg-[#181E24] p-4 border-l-4 border-red-500/80 border-y border-r border-white/10">
                    <span className="font-mono-tech text-xs text-red-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      CRITICAL BOTTLENECK / CHALLENGE
                    </span>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="bg-[#181E24] p-4 border-l-4 border-[#34D399] border-y border-r border-white/10">
                    <span className="font-mono-tech text-xs text-[#34D399] font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                      ENGINEERED SOLUTION
                    </span>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Technologies Tag Array */}
              <div>
                <span className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider block mb-2">
                  TACTICAL TECH STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#181E24] border border-[#FFB900]/40 text-[#FFB900] px-3 py-1 text-xs font-mono-tech font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {project.architecture && (
                <div className="bg-[#181E24] p-5 border border-white/10 space-y-2">
                  <span className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    CORE PIPELINE & ENGINE ARCHITECTURE
                  </span>
                  <p className="text-sm text-[#F5F5F0] leading-relaxed font-mono-tech">
                    {project.architecture}
                  </p>
                </div>
              )}

              {project.responsibilities && (
                <div className="space-y-3">
                  <span className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider block">
                    ROLE & TECHNICAL RESPONSIBILITIES ({project.role || 'Graphics Engineer'})
                  </span>
                  <div className="space-y-2">
                    {project.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-[#161C22] p-3 border border-white/5">
                        <span className="font-mono-tech text-xs text-[#FFB900] font-bold mt-0.5">0{idx + 1}</span>
                        <p className="text-xs sm:text-sm text-white/90">{resp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <span className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider block">
                SPECIALIZED CAPABILITIES & SHADER HIGHLIGHTS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-[#181E24] p-4 border border-white/10">
                    <Sparkles className="w-4 h-4 text-[#FFB900] flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#F5F5F0] leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div>
                <span className="font-mono-tech text-xs text-[#FFB900] font-bold uppercase tracking-wider block mb-3">
                  PERFORMANCE BENCHMARKS
                </span>
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#181E24] p-4 border border-white/10 text-center">
                      <span className="font-mono-tech text-[10px] text-[#A6A6A0] uppercase block">{m.label}</span>
                      <span className="font-display font-black text-2xl text-[#FFB900] block mt-1">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results list */}
              {project.resultsImpact && (
                <div className="space-y-3">
                  <span className="font-mono-tech text-xs text-[#34D399] font-bold uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    ACCLAIM & MEASURED PRODUCTION IMPACT
                  </span>
                  <div className="space-y-2">
                    {project.resultsImpact.map((res, idx) => (
                      <div key={idx} className="flex items-center space-x-3 bg-[#161C22] p-3 border-l-2 border-[#34D399]">
                        <CheckCircle2 className="w-4 h-4 text-[#34D399] flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-white">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] border-t border-[#3A3F45]">
          <button
            onClick={() => {
              sound.playClick();
              onBackToProjects();
            }}
            className="text-xs font-mono-tech text-[#A6A6A0] hover:text-[#FFB900] uppercase"
          >
            ← BACK TO MISSION LIST
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pubg-start-btn font-display font-black text-xs text-[#080B0D] px-5 py-2 uppercase tracking-wider"
          >
            CLOSE DOSSIER
          </button>
        </div>
      </motion.div>
    </div>
  );
};
