import { Game } from '@/types'
import { cn } from '@/utils/cn'

interface ScoreCardProps {
  game: Game
  onClick?: () => void
  className?: string
}

export function ScoreCard({ game, onClick, className }: ScoreCardProps) {
  const getGameStateDisplay = () => {
    switch (game.gameState) {
      case 'scheduled':
        return game.gameTime || 'TBD'
      case 'in_progress':
        return `Q${game.quarter} • ${game.timeRemaining}`
      case 'finished':
        return 'Final'
      case 'postponed':
        return 'Postponed'
      default:
        return ''
    }
  }

  const isLive = game.gameState === 'in_progress'

  return (
    <div
      className={cn(
        'card cursor-pointer hover:shadow-hover transition-shadow duration-200',
        isLive && 'ring-2 ring-primary ring-opacity-50',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={cn(
          'text-sm font-medium px-2 py-1 rounded',
          isLive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
        )}>
          {getGameStateDisplay()}
        </span>
        {isLive && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-500 font-medium">LIVE</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
              {game.awayTeam.split(' ').map(word => word[0]).join('')}
            </div>
            <span className="font-medium text-sm">{game.awayTeam}</span>
          </div>
          <span className="text-2xl font-bold">{game.currentScoreAway}</span>
        </div>

        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
              {game.homeTeam.split(' ').map(word => word[0]).join('')}
            </div>
            <span className="font-medium text-sm">{game.homeTeam}</span>
          </div>
          <span className="text-2xl font-bold">{game.currentScoreHome}</span>
        </div>
      </div>

      {game.winProbability && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2">Win Probability</div>
          <div className="flex space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${game.winProbability.home * 100}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">
              {Math.round(game.winProbability.home * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

