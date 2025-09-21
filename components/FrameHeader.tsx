'use client';

import { ArrowLeft, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FrameHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  onSettings?: () => void;
  className?: string;
}

export function FrameHeader({
  title,
  showBack = false,
  onBack,
  showSettings = false,
  onSettings,
  className
}: FrameHeaderProps) {
  return (
    <header className={cn(
      'flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700',
      className
    )}>
      <div className="flex items-center space-x-3">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {title && (
          <h1 className="text-xl font-bold text-white">{title}</h1>
        )}
      </div>
      
      {showSettings && (
        <button
          onClick={onSettings}
          className="p-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      )}
    </header>
  );
}
