export interface Game {
  gameId: string
  homeTeam: string
  awayTeam: string
  currentScoreHome: number
  currentScoreAway: number
  gameState: 'scheduled' | 'in_progress' | 'finished' | 'postponed'
  gameTime?: string
  quarter?: number
  timeRemaining?: string
  winProbability?: {
    home: number
    away: number
  }
}

export interface Team {
  teamId: string
  teamName: string
  teamLogo: string
  abbreviation: string
}

export interface Player {
  playerId: string
  playerName: string
  playerTeam: string
  position?: string
}

export interface UserPreferences {
  userId: string
  followedTeams: string[]
  notificationSettings: {
    scoreUpdates: boolean
    gameEvents: boolean
  }
}

export interface PlayerStats {
  playerId: string
  playerName: string
  team: string
  position: string
  passingYards?: number
  rushingYards?: number
  receivingYards?: number
  touchdowns?: number
  interceptions?: number
  sacks?: number
  tackles?: number
}

export interface GameStats {
  gameId: string
  homeTeamStats: PlayerStats[]
  awayTeamStats: PlayerStats[]
}

