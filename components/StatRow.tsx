import { PlayerStats } from '@/types'

interface StatRowProps {
  stat: PlayerStats
  type: 'player' | 'team'
}

export function StatRow({ stat, type }: StatRowProps) {
  if (type === 'player') {
    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
            {stat.playerName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium text-sm">{stat.playerName}</div>
            <div className="text-xs text-gray-500">{stat.position} • {stat.team}</div>
          </div>
        </div>
        <div className="text-right">
          {stat.passingYards && (
            <div className="text-sm font-medium">{stat.passingYards} pass yds</div>
          )}
          {stat.rushingYards && (
            <div className="text-sm font-medium">{stat.rushingYards} rush yds</div>
          )}
          {stat.receivingYards && (
            <div className="text-sm font-medium">{stat.receivingYards} rec yds</div>
          )}
          {stat.touchdowns && stat.touchdowns > 0 && (
            <div className="text-sm text-success font-medium">{stat.touchdowns} TD</div>
          )}
        </div>
      </div>
    )
  }

  // Team stats (placeholder for future implementation)
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="font-medium">{stat.team}</span>
      <span className="text-sm text-gray-600">Team stats coming soon</span>
    </div>
  )
}

