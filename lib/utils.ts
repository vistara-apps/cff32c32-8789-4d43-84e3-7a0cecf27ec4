import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(timeString: string): string {
  if (!timeString) return '00:00';
  return timeString;
}

export function formatWinProbability(probability: number): string {
  return `${Math.round(probability)}%`;
}

export function getGameStatusText(game: any): string {
  switch (game.gameState) {
    case 'scheduled':
      return 'Upcoming';
    case 'live':
      return `Q${game.quarter} ${game.timeRemaining}`;
    case 'final':
      return 'Final';
    default:
      return 'Unknown';
  }
}

export function getTeamColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    '#FF0000': 'text-red-500',
    '#0000FF': 'text-blue-500',
    '#008000': 'text-green-500',
    '#800080': 'text-purple-500',
    '#FFA500': 'text-orange-500',
    '#FFFF00': 'text-yellow-500',
  };
  
  return colorMap[color] || 'text-gray-400';
}
