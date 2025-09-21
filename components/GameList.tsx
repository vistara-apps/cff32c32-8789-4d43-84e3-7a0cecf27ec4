'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Game } from '@/types'
import { ScoreCard } from './ScoreCard'
import { fetchGames } from '@/lib/mockData'

export function GameList() {
  const router = useRouter()
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameData = await fetchGames()
        setGames(gameData)
      } catch (err) {
        setError('Failed to load games')
      } finally {
        setLoading(false)
      }
    }

    loadGames()

    // Refresh data every 30 seconds for live games
    const interval = setInterval(loadGames, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-8"></div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {games.map((game) => (
        <ScoreCard
          key={game.gameId}
          game={game}
          onClick={() => handleGameClick(game.gameId)}
        />
      ))}
    </div>
  )
}

