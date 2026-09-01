import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'hud';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B916] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B0D] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none rounded-[2px] active:translate-y-[0px]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-extrabold',
  };

  const variantStyles = {
    primary:
      'bg-[#F5B916] text-[#080B0D] hover:bg-[#FFCC2E] hover:shadow-[0_0_20px_rgba(245,185,22,0.4)] hover:-translate-y-[1px]',
    secondary:
      'bg-[#15181A] text-[#F5F5F0] border border-[#393936] hover:border-[#F5B916] hover:text-[#F5B916] hover:-translate-y-[1px]',
    outline:
      'bg-transparent text-[#F5F5F0] border border-[rgba(255,255,255,0.2)] hover:border-[#F5B916] hover:text-[#F5B916] hover:bg-[rgba(245,185,22,0.05)] hover:-translate-y-[1px]',
    ghost:
      'bg-transparent text-[#A6A6A0] hover:text-[#F5B916] hover:bg-[rgba(255,255,255,0.03)]',
    hud:
      'bg-[#080B0D]/80 text-[#F5B916] border border-[#F5B916]/40 font-mono-tech text-xs hover:border-[#F5B916] hover:bg-[#F5B916]/10',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
