import React from 'react';
import { Users, ChevronRight } from 'lucide-react';

export interface ArcadeModeCardProps {
  region?: string;
  selectModeLabel?: string;
  modeTitle?: string;
  perspective?: string;
  mapSubtitle?: string;
  playerCount?: number | string;
  weaponImageUrl?: string;
  onClick?: () => void;
  className?: string;
}

export const ArcadeModeCard: React.FC<ArcadeModeCardProps> = ({
  region = 'Texas',
  selectModeLabel = 'Select Mode',
  modeTitle = 'Stafford',
  perspective = '(TPP)',
  mapSubtitle = 'Map: Quick Match',
  playerCount = 4,
  weaponImageUrl = '/src/assets/images/pubg_weapon_arcade.jpg',
  onClick,
  className = '',
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      id="arcade-map-selector"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`group relative w-[250px] sm:w-[265px] h-[110px] sm:h-[118px] select-none cursor-pointer overflow-hidden rounded-[2px] bg-[#17191A] border border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.7)] transition-all duration-180 ease-out hover:brightness-[1.08] focus:outline-none focus:ring-2 focus:ring-[#F2C62D]/60 ${className}`}
    >
      {/* 3-4px Vertical Yellow Accent Strip on Far-Left Edge */}
      <div 
        id="arcade-card-accent-strip"
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F2C62D] z-30 shadow-[0_0_8px_rgba(242,198,45,0.4)] group-hover:bg-[#FFD233] transition-colors" 
      />

      {/* Full-Bleed Weapon Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={weaponImageUrl}
          alt="Weapon Preset"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-110 saturate-90"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop';
          }}
        />

        {/* Cinematic Translucent Gradients & Dark Protection Overlays */}
        <div className="absolute inset-0 bg-[#0F1112]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/50" />
      </div>

      {/* Card Content Overlay */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-[9px] pl-[12px] font-condensed">
        
        {/* Top Row: Region & Select Mode */}
        <div className="flex items-center justify-between w-full">
          {/* Region Name */}
          <span 
            id="arcade-region-label"
            className="text-[#F3F1E8] text-[13px] sm:text-[14px] font-semibold tracking-normal hud-text-shadow leading-tight"
          >
            {region}
          </span>

          {/* Select Mode with Animated Chevrons */}
          <div 
            id="arcade-select-mode-label"
            className="flex items-center text-[#F2C62D] text-[13px] sm:text-[14px] font-bold tracking-normal hud-text-shadow leading-tight group-hover:text-[#FFD233] transition-colors"
          >
            <span>{selectModeLabel}</span>
            <div className="flex items-center ml-0.5 group-hover:translate-x-0.5 transition-transform duration-180">
              <ChevronRight className="w-3 h-3 -mr-1.5 stroke-[3] text-[#F2C62D]" />
              <ChevronRight className="w-3 h-3 -mr-1.5 stroke-[3] text-[#F2C62D]" />
              <ChevronRight className="w-3 h-3 stroke-[3] text-[#F2C62D]" />
            </div>
          </div>
        </div>

        {/* Bottom Row: Mode Info (Left) & Player Count (Right) */}
        <div className="flex items-end justify-between w-full">
          {/* Bottom-Left Mode Details */}
          <div className="flex flex-col">
            {/* Mode Title & Perspective */}
            <div className="flex items-baseline space-x-1 leading-none">
              <h3 
                id="arcade-mode-title"
                className="text-[#F3F1E8] text-[20px] sm:text-[22px] font-bold tracking-tight hud-text-shadow m-0 p-0"
              >
                {modeTitle}
              </h3>
              <span 
                id="arcade-mode-perspective"
                className="text-[#C8C7BE] text-[12px] sm:text-[13px] font-bold hud-text-shadow"
              >
                {perspective}
              </span>
            </div>

            {/* Map Subtitle */}
            <div 
              id="arcade-map-subtitle"
              className="text-[#C8C7BE] text-[11px] sm:text-[12px] font-semibold tracking-normal hud-text-shadow mt-0.5"
            >
              {mapSubtitle}
            </div>
          </div>

          {/* Bottom-Right Squad / Player Count */}
          <div 
            id="arcade-player-count"
            className="flex items-center space-x-1 mb-0.5 hud-text-shadow"
          >
            <Users className="w-3 h-3 text-[#C8C7BE] stroke-[2.2]" />
            <span className="text-[#F3F1E8] text-[13px] sm:text-[14px] font-semibold leading-none">
              {playerCount}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
