import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

type Stage = 'INTRO' | 'LOBBY';

export default function App() {
  const [stage, setStage] = useState<Stage>('INTRO');

  return (
    <div className="relative w-screen h-[100svh] bg-[#080B0D] overflow-hidden text-[#F5F5F0]">
      <AnimatePresence mode="wait">
        {stage === 'INTRO' ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <IntroScreen
              profile={PROFILE_DATA}
              onEnterLobby={() => setStage('LOBBY')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <PortfolioLobby
              profile={PROFILE_DATA}
              projects={PROJECTS}
              experiences={EXPERIENCE_ITEMS}
              skills={SKILL_CATEGORIES}
              socials={SOCIAL_LINKS}
              stats={DIRECTIVE_STATS}
              onReturnToTitle={() => setStage('INTRO')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
