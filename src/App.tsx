import React, { useState, useEffect } from 'react';
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

  // Allow switching stages
  const handleEnterLobby = () => {
    setCurrentStage('lobby');
  };

  const handleReturnToTitle = () => {
    setCurrentStage('title');
  };

  return (
    <div className="w-full min-h-screen bg-[#080B0D] text-[#F5F5F0] overflow-hidden select-none">
      {currentStage === 'title' ? (
        <IntroScreen 
          profile={PROFILE_DATA} 
          onEnterLobby={handleEnterLobby} 
        />
      ) : (
        <PortfolioLobby
          profile={PROFILE_DATA}
          projects={PROJECTS}
          experiences={EXPERIENCE_ITEMS}
          skills={SKILL_CATEGORIES}
          socials={SOCIAL_LINKS}
          stats={DIRECTIVE_STATS}
          onReturnToTitle={handleReturnToTitle}
        />
      )}
    </div>
  );
}
