'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Game, PlayerStats } from '@/types'
import { FrameHeader } from '@/components/FrameHeader'
import { ScoreCard } from '@/components/ScoreCard'
import { WinProbChart } from '@/components/WinProbChart'
import { StatRow } from '@/components/StatRow'
import { NotificationBanner } from '@/components/NotificationBanner'
import { fetchGameDetails, fetchPlayerStats } from '@/lib/mockData'

// Mock win probability data over time
const mockWinProbData = [
  { time: '0:00', homeWinProb: 50, awayWinProb: 50 },
  { time: '5:00', homeWinProb: 55, awayWinProb: 45 },
  { time: '10:00', homeWinProb: 60, awayWinProb: 40 },
  { time: '15:00', homeWinProb: 72, awayWinProb: 28 },
]

export default function GamePage() {
  const params = useParams()
  const gameId = params.id as string

  const [game, setGame] = useState<Game | null>(null)
  const [stats, setStats] = useState<PlayerStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAdvancedStats, setShowAdvancedStats] = useState(false)

  useEffect(() => {
    const loadGameData = async () => {
      try {
        const [gameData, statsData] = await Promise.all([
          fetchGameDetails(gameId),
          fetchPlayerStats(gameId)
        ])

        if (!gameData) {
          setError('Game not found')
          return
        }

        setGame(gameData)
        setStats(statsData)
      } catch (err) {
        setError('Failed to load game data')
      } finally {
        setLoading(false)
      }
    }

    loadGameData()
  }, [gameId])

  const handleAdvancedStatsClick = () => {
    // In a real app, this would trigger a micro-transaction
    setShowAdvancedStats(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <FrameHeader title="Loading..." showBack />
        <div className="p-4">
          <div className="card animate-pulse">
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-bg">
        <FrameHeader title="Error" showBack />
        <div className="p-4 text-center">
          <p className="text-red-500">{error || 'Game not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <FrameHeader title={`${game.awayTeam} @ ${game.homeTeam}`} showBack />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Game Score Card */}
        <ScoreCard game={game} />

        {/* Win Probability Chart */}
        {game.winProbability && (
          <WinProbChart
            data={mockWinProbData}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
          />
        )}

        {/* Notification Banner for live games */}
        {game.gameState === 'in_progress' && (
          <NotificationBanner
            type="gameEvent"
            message="🔥 Game is live! Follow along for real-time updates."
          />
        )}

        {/* Player Stats */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Player Stats</h3>
            {!showAdvancedStats && (
              <button
                onClick={handleAdvancedStatsClick}
                className="btn btn-secondary text-sm"
              >
                View Advanced Stats ($0.50)
              </button>
            )}
          </div>

          <div className="space-y-2">
            {stats.slice(0, showAdvancedStats ? stats.length : 4).map((stat) => (
              <StatRow key={stat.playerId} stat={stat} type="player" />
            ))}
          </div>

          {!showAdvancedStats && stats.length > 4 && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Showing top players. Unlock advanced stats for complete data.
              </p>
            </div>
          )}
        </div>

        {/* Game Events/Notifications */}
        {game.gameState === 'finished' && (
          <NotificationBanner
            type="scoreUpdate"
            message={`🏆 Game Complete: ${game.homeTeam} ${game.currentScoreHome} - ${game.awayTeam} ${game.currentScoreAway}`}
          />
        )}
      </main>
    </div>
  )
}

