import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'dark' | 'outline' | 'hud';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  className = '',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center text-[11px] font-mono-tech font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-[2px] transition-colors';

  const variants = {
    gold: 'bg-[#F5B916] text-[#080B0D] shadow-[0_0_12px_rgba(245,185,22,0.3)]',
    dark: 'bg-[#15181A] text-[#F5B916] border border-[#393936]',
    outline: 'bg-transparent text-[#F5B916] border border-[#F5B916]/40',
    hud: 'bg-[#080B0D]/90 text-[#F5F5F0] border-l-2 border-[#F5B916] pl-2 pr-2.5',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
