import { Game, Team, PlayerStats } from '@/types'

// Mock NFL teams
export const mockTeams: Team[] = [
  { teamId: '1', teamName: 'Kansas City Chiefs', teamLogo: '/logos/kc.svg', abbreviation: 'KC' },
  { teamId: '2', teamName: 'San Francisco 49ers', teamLogo: '/logos/sf.svg', abbreviation: 'SF' },
  { teamId: '3', teamName: 'Buffalo Bills', teamLogo: '/logos/buf.svg', abbreviation: 'BUF' },
  { teamId: '4', teamName: 'Detroit Lions', teamLogo: '/logos/det.svg', abbreviation: 'DET' },
  { teamId: '5', teamName: 'Philadelphia Eagles', teamLogo: '/logos/phi.svg', abbreviation: 'PHI' },
  { teamId: '6', teamName: 'Dallas Cowboys', teamLogo: '/logos/dal.svg', abbreviation: 'DAL' },
  { teamId: '7', teamName: 'Miami Dolphins', teamLogo: '/logos/mia.svg', abbreviation: 'MIA' },
  { teamId: '8', teamName: 'Cleveland Browns', teamLogo: '/logos/cle.svg', abbreviation: 'CLE' },
]

// Mock NFL games
export const mockGames: Game[] = [
  {
    gameId: '1',
    homeTeam: 'Kansas City Chiefs',
    awayTeam: 'San Francisco 49ers',
    currentScoreHome: 24,
    currentScoreAway: 17,
    gameState: 'in_progress',
    quarter: 3,
    timeRemaining: '8:42',
    winProbability: { home: 0.72, away: 0.28 }
  },
  {
    gameId: '2',
    homeTeam: 'Buffalo Bills',
    awayTeam: 'Detroit Lions',
    currentScoreHome: 14,
    currentScoreAway: 21,
    gameState: 'in_progress',
    quarter: 2,
    timeRemaining: '12:15',
    winProbability: { home: 0.35, away: 0.65 }
  },
  {
    gameId: '3',
    homeTeam: 'Philadelphia Eagles',
    awayTeam: 'Dallas Cowboys',
    currentScoreHome: 0,
    currentScoreAway: 0,
    gameState: 'scheduled',
    gameTime: '1:00 PM ET'
  },
  {
    gameId: '4',
    homeTeam: 'Miami Dolphins',
    awayTeam: 'Cleveland Browns',
    currentScoreHome: 31,
    currentScoreAway: 28,
    gameState: 'finished',
    winProbability: { home: 0.58, away: 0.42 }
  }
]

// Mock player stats
export const mockPlayerStats: PlayerStats[] = [
  {
    playerId: '1',
    playerName: 'Patrick Mahomes',
    team: 'Kansas City Chiefs',
    position: 'QB',
    passingYards: 285,
    touchdowns: 2,
    interceptions: 0
  },
  {
    playerId: '2',
    playerName: 'Christian McCaffrey',
    team: 'San Francisco 49ers',
    position: 'RB',
    rushingYards: 89,
    receivingYards: 45,
    touchdowns: 1
  },
  {
    playerId: '3',
    playerName: 'Josh Allen',
    team: 'Buffalo Bills',
    position: 'QB',
    passingYards: 198,
    touchdowns: 1
  },
  {
    playerId: '4',
    playerName: 'Jared Goff',
    team: 'Detroit Lions',
    position: 'QB',
    passingYards: 267,
    touchdowns: 2,
    interceptions: 1
  }
]

// API simulation functions
export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await fetch('/api/games')
    const data = await response.json()
    if (data.success) {
      return data.data
    }
    throw new Error(data.error || 'Failed to fetch games')
  } catch (error) {
    console.error('API call failed, using mock data:', error)
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockGames
  }
}

export const fetchGameDetails = async (gameId: string): Promise<Game | null> => {
  try {
    const response = await fetch(`/api/games/${gameId}`)
    const data = await response.json()
    if (data.success) {
      return data.data.game
    }
    throw new Error(data.error || 'Failed to fetch game details')
  } catch (error) {
    console.error('API call failed, using mock data:', error)
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockGames.find(game => game.gameId === gameId) || null
  }
}

export const fetchPlayerStats = async (gameId: string): Promise<PlayerStats[]> => {
  try {
    const response = await fetch(`/api/games/${gameId}`)
    const data = await response.json()
    if (data.success) {
      return data.data.playerStats || []
    }
    throw new Error(data.error || 'Failed to fetch player stats')
  } catch (error) {
    console.error('API call failed, using mock data:', error)
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 400))
    const game = mockGames.find(g => g.gameId === gameId)
    if (!game) return []

    return mockPlayerStats.filter(player =>
      player.team === game.homeTeam || player.team === game.awayTeam
    )
  }
}

