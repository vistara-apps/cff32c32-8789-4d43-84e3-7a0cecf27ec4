export interface Game {
  gameId: string;
  homeTeam: Team;
  awayTeam: Team;
  currentScoreHome: number;
  currentScoreAway: number;
  gameState: 'scheduled' | 'live' | 'final';
  quarter: number;
  timeRemaining: string;
  winProbability: {
    home: number;
    away: number;
  };
  lastUpdate: string;
}

export interface Team {
  teamId: string;
  teamName: string;
  teamLogo: string;
  abbreviation: string;
  primaryColor: string;
}

export interface Player {
  playerId: string;
  playerName: string;
  playerTeam: string;
  position: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  passingYards?: number;
  rushingYards?: number;
  receivingYards?: number;
  touchdowns?: number;
  interceptions?: number;
  tackles?: number;
}

export interface UserPreferences {
  userId: string;
  followedTeams: string[];
  notificationSettings: {
    scoreUpdates: boolean;
    gameEvents: boolean;
    favoriteTeamsOnly: boolean;
  };
}

export interface WinProbabilityData {
  time: string;
  homeWinProb: number;
  awayWinProb: number;
  quarter: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
