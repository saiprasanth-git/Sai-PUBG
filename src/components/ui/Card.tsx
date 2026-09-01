import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'surface' | 'glass' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  className = '',
  ...props
}) => {
  const styles = {
    surface: 'bg-[#15181A] border border-[#393936] text-[#F5F5F0]',
    glass: 'bg-[#15181A]/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[#F5F5F0]',
    bordered: 'bg-[#080B0D] border border-[#393936] text-[#F5F5F0]',
  };

  return (
    <div
      className={`rounded-[3px] transition-all duration-300 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
