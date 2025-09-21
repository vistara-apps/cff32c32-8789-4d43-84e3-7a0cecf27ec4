'use client';

import { Game } from '@/lib/types';
import { cn, getGameStatusText, formatWinProbability } from '@/lib/utils';

interface ScoreCardProps {
  game: Game;
  variant?: 'default' | 'highlighted';
  onClick?: () => void;
  className?: string;
}

export function ScoreCard({ 
  game, 
  variant = 'default', 
  onClick,
  className 
}: ScoreCardProps) {
  const isLive = game.gameState === 'live';
  const homeWinning = game.currentScoreHome > game.currentScoreAway;
  const awayWinning = game.currentScoreAway > game.currentScoreHome;

  return (
    <div
      className={cn(
        'card p-4 cursor-pointer transition-all duration-200',
        variant === 'highlighted' && 'ring-2 ring-primary',
        'hover:bg-gray-750 card-hover',
        className
      )}
      onClick={onClick}
    >
      {/* Game Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {isLive && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
          <span className={cn(
            'text-sm font-medium',
            isLive ? 'text-red-400' : 'text-gray-400'
          )}>
            {getGameStatusText(game)}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {new Date(game.lastUpdate).toLocaleTimeString()}
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="space-y-3">
        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{game.awayTeam.teamLogo}</span>
            <div>
              <div className={cn(
                'font-semibold',
                awayWinning ? 'text-white' : 'text-gray-400'
              )}>
                {game.awayTeam.abbreviation}
              </div>
              <div className="text-xs text-gray-500">
                {game.awayTeam.teamName}
              </div>
            </div>
          </div>
          <div className={cn(
            'text-2xl font-bold',
            awayWinning ? 'text-white' : 'text-gray-400'
          )}>
            {game.currentScoreAway}
          </div>
        </div>

        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{game.homeTeam.teamLogo}</span>
            <div>
              <div className={cn(
                'font-semibold',
                homeWinning ? 'text-white' : 'text-gray-400'
              )}>
                {game.homeTeam.abbreviation}
              </div>
              <div className="text-xs text-gray-500">
                {game.homeTeam.teamName}
              </div>
            </div>
          </div>
          <div className={cn(
            'text-2xl font-bold',
            homeWinning ? 'text-white' : 'text-gray-400'
          )}>
            {game.currentScoreHome}
          </div>
        </div>
      </div>

      {/* Win Probability */}
      {isLive && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Win Probability</span>
            <div className="flex space-x-4">
              <span className={cn(
                'font-medium',
                game.winProbability.away > 50 ? 'text-success' : 'text-gray-400'
              )}>
                {game.awayTeam.abbreviation}: {formatWinProbability(game.winProbability.away)}
              </span>
              <span className={cn(
                'font-medium',
                game.winProbability.home > 50 ? 'text-success' : 'text-gray-400'
              )}>
                {game.homeTeam.abbreviation}: {formatWinProbability(game.winProbability.home)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
