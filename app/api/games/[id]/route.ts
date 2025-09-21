import { NextResponse } from 'next/server'
import { mockGames, mockPlayerStats } from '@/lib/mockData'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = params.id

    // Find the game
    const game = mockGames.find(g => g.gameId === gameId)

    if (!game) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      )
    }

    // Get player stats for this game
    const playerStats = mockPlayerStats.filter(player =>
      player.team === game.homeTeam || player.team === game.awayTeam
    )

    return NextResponse.json({
      success: true,
      data: {
        game,
        playerStats,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error fetching game details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch game details' },
      { status: 500 }
    )
  }
}

