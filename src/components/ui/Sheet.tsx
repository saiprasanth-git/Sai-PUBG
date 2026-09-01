import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080B0D]/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel */}
      <div className="relative z-10 w-full max-w-md h-full bg-[#15181A] border-l border-[#393936] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#393936] mb-6">
            <div>
              {subtitle && (
                <p className="text-xs font-mono-tech text-[#F5B916] uppercase tracking-widest">
                  {subtitle}
                </p>
              )}
              {title && (
                <h3 className="text-xl font-bold tracking-tight text-[#F5F5F0]">
                  {title}
                </h3>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#A6A6A0] hover:text-[#F5B916] hover:bg-[#080B0D] rounded transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">{children}</div>
        </div>

        <div className="pt-6 mt-6 border-t border-[#393936] text-xs font-mono-tech text-[#A6A6A0]">
          <span className="text-[#F5B916]">SYS //</span> HUD v2.6.4 READY
        </div>
      </div>
    </div>
  );
};
