import React from 'react';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  withAccent?: boolean;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  withAccent = false,
  className = '',
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={`w-[1px] bg-[#393936] self-stretch ${className}`}
        {...props}
      />
    );
  }

  return (
    <div className={`relative w-full h-[1px] bg-[#393936] my-6 ${className}`} {...props}>
      {withAccent && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-[#F5B916]" />
      )}
    </div>
  );
};
