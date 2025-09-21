import { NextResponse } from 'next/server'
import { mockGames } from '@/lib/mockData'

export async function GET() {
  try {
    // In a real implementation, this would fetch from the NFL API
    // For now, return mock data
    return NextResponse.json({
      success: true,
      data: mockGames,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch games' },
      { status: 500 }
    )
  }
}

