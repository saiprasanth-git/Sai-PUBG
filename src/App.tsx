import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IntroScreen } from './components/IntroScreen';
import { PortfolioLobby } from './components/PortfolioLobby';
import { 
  PROFILE_DATA, 
  PROJECTS, 
  EXPERIENCE_ITEMS, 
  SKILL_CATEGORIES, 
  SOCIAL_LINKS, 
  DIRECTIVE_STATS 
} from './data/portfolioData';

export default function App() {
  const [currentStage, setCurrentStage] = useState<'title' | 'lobby'>('title');

  const handleEnterLobby = () => {
    setCurrentStage('lobby');
  };

  const handleReturnToTitle = () => {
    setCurrentStage('title');
  };

  return (
    <div className="w-full min-h-screen bg-[#080B0D] text-[#F5F5F0] overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {currentStage === 'title' ? (
          <motion.div
            key="title-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <IntroScreen 
              profile={PROFILE_DATA} 
              onEnterLobby={handleEnterLobby} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="lobby-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <PortfolioLobby
              profile={PROFILE_DATA}
              projects={PROJECTS}
              experiences={EXPERIENCE_ITEMS}
              skills={SKILL_CATEGORIES}
              socials={SOCIAL_LINKS}
              stats={DIRECTIVE_STATS}
              onReturnToTitle={handleReturnToTitle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
