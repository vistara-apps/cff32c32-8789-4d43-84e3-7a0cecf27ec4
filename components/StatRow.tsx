'use client';

import { cn } from '@/lib/utils';

interface StatRowProps {
  label: string;
  value: string | number;
  variant?: 'player' | 'team';
  highlight?: boolean;
  className?: string;
}

export function StatRow({ 
  label, 
  value, 
  variant = 'team', 
  highlight = false,
  className 
}: StatRowProps) {
  return (
    <div className={cn(
      'flex items-center justify-between py-2 px-3 rounded-md',
      highlight && 'bg-gray-700',
      variant === 'player' && 'text-sm',
      className
    )}>
      <span className="text-gray-300">{label}</span>
      <span className={cn(
        'font-semibold',
        highlight ? 'text-accent' : 'text-white'
      )}>
        {value}
      </span>
    </div>
  );
}
