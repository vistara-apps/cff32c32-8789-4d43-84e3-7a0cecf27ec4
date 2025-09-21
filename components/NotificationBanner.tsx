'use client';

import { X, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationBannerProps {
  variant: 'scoreUpdate' | 'gameEvent';
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function NotificationBanner({ 
  variant, 
  message, 
  onDismiss,
  className 
}: NotificationBannerProps) {
  const Icon = variant === 'scoreUpdate' ? TrendingUp : Target;
  
  return (
    <div className={cn(
      'flex items-center justify-between p-3 rounded-lg border-l-4',
      variant === 'scoreUpdate' 
        ? 'bg-blue-900/20 border-blue-500 text-blue-200'
        : 'bg-green-900/20 border-green-500 text-green-200',
      className
    )}>
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-gray-700 rounded-md transition-colors duration-200"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
