import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { X, Layers, ExternalLink, Github, Filter, Sparkles, ChevronRight, Eye, Code, Star, GitFork } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProjectsModalProps {
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  projects,
  onClose,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0F1317] border-2 border-[#FFB900] shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#151A20] border-b border-[#3A3F45]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#FFB900] text-[#080B0D]">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] text-[#FFB900] tracking-widest uppercase font-bold">
                GITHUB ARSENAL // {filteredProjects.length} REPOSITORIES
              </div>
              <h2 className="font-display font-black text-lg sm:text-2xl text-[#F5F5F0] tracking-wide uppercase">
                GITHUB OPEN-SOURCE PROJECTS
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

        {/* Filter & GitHub Link Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#11161B] border-b border-white/10">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <span className="font-mono-tech text-xs text-[#A6A6A0] flex items-center gap-1.5 pr-2 font-bold whitespace-nowrap">
              <Filter className="w-3.5 h-3.5 text-[#FFB900]" />
              CATEGORY:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 text-xs font-mono-tech uppercase font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#FFB900] text-[#080B0D] shadow-md'
                    : 'bg-[#1C2229] text-[#A6A6A0] hover:text-white hover:bg-[#262E37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GitHub Profile Direct CTA */}
          <a
            href="https://github.com/saiprasanth-git"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center space-x-1.5 text-xs font-mono-tech text-white bg-[#222933] hover:bg-[#2C3542] px-3 py-1.5 border border-white/10 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#FFB900]" />
            <span>saiprasanth-git</span>
          </a>
        </div>

        {/* Scrollable Project Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col justify-between bg-[#161C22] border border-white/15 hover:border-[#FFB900] transition-colors shadow-lg overflow-hidden"
              >
                <div>
                  {/* Project Image Preview */}
                  <div className="relative h-40 w-full overflow-hidden bg-black/60">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161C22] via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-[#080B0D]/85 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[10px] font-mono-tech text-[#FFB900] font-bold">
                      {project.category}
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-3 right-3 bg-[#FFB900] text-[#080B0D] font-display font-black text-xs px-2 py-0.5">
                      {project.year}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono-tech text-[#FFB900]">
                      <Code className="w-3.5 h-3.5" />
                      <span className="font-bold truncate">{project.codename}</span>
                    </div>

                    <h3
                      onClick={() => {
                        sound.playModalOpen();
                        onSelectProject(project);
                      }}
                      className="font-display font-bold text-base text-white group-hover:text-[#FFB900] transition-colors cursor-pointer line-clamp-2"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#A6A6A0] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#0E1216] border border-white/10 text-[10px] font-mono-tech text-[#D4D4D0] px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                    }}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-[#222933] hover:bg-[#2C3542] text-white font-mono-tech font-bold text-xs uppercase transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-[#FFB900]" />
                    <span>GITHUB</span>
                  </a>

                  <button
                    onClick={() => {
                      sound.playModalOpen();
                      onSelectProject(project);
                    }}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-[#FFB900] hover:bg-[#FFC933] text-[#080B0D] font-display font-black text-xs uppercase tracking-wider transition-colors shadow"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>DETAILS</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#151A20] border-t border-[#3A3F45]">
          <span className="font-mono-tech text-xs text-[#A6A6A0]">
            GITHUB REPOSITORY ARCHIVE // <span className="text-[#34D399] font-bold">ALL REPOS SYNCHRONIZED</span>
          </span>

          <a
            href="https://github.com/saiprasanth-git"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FFB900] hover:bg-[#FFC933] text-[#080B0D] font-display font-black text-xs uppercase tracking-wider transition-colors shadow"
          >
            <Github className="w-4 h-4" />
            <span>VISIT FULL GITHUB PROFILE</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
