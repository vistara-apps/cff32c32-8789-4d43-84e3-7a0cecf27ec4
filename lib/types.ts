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
  gameDate: string;
  venue?: string;
  attendance?: number;
  weather?: GameWeather;
  tvBroadcast?: string;
  events?: GameEvent[];
}

export interface Team {
  teamId: string;
  teamName: string;
  teamLogo: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor?: string;
  conference: 'AFC' | 'NFC';
  division: 'East' | 'West' | 'North' | 'South';
  city: string;
  stadium: string;
  headCoach: string;
  record?: TeamRecord;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
}

export interface Player {
  playerId: string;
  playerName: string;
  playerTeam: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'OL' | 'DL' | 'LB' | 'CB' | 'S' | 'K' | 'P';
  jerseyNumber: number;
  height?: string;
  weight?: number;
  experience?: number;
  college?: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  // Passing
  passingAttempts?: number;
  passingCompletions?: number;
  passingYards?: number;
  passingTouchdowns?: number;
  interceptions?: number;
  passerRating?: number;

  // Rushing
  rushingAttempts?: number;
  rushingYards?: number;
  rushingTouchdowns?: number;
  rushingAverage?: number;

  // Receiving
  receptions?: number;
  receivingYards?: number;
  receivingTouchdowns?: number;
  receivingAverage?: number;

  // Defense
  tackles?: number;
  sacks?: number;
  interceptions?: number;
  forcedFumbles?: number;
  fumbleRecoveries?: number;

  // Kicking
  fieldGoalsMade?: number;
  fieldGoalsAttempted?: number;
  extraPointsMade?: number;
  extraPointsAttempted?: number;
}

export interface GameEvent {
  eventId: string;
  gameId: string;
  eventType: 'touchdown' | 'field_goal' | 'extra_point' | 'safety' | 'turnover' | 'penalty' | 'timeout';
  description: string;
  quarter: number;
  timeRemaining: string;
  team: string;
  player?: string;
  yards?: number;
  timestamp: string;
}

export interface GameWeather {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
}

export interface UserPreferences {
  userId: string;
  followedTeams: string[];
  favoritePlayers?: string[];
  notificationSettings: {
    scoreUpdates: boolean;
    gameEvents: boolean;
    favoriteTeamsOnly: boolean;
    touchdownAlerts: boolean;
    finalScoreAlerts: boolean;
  };
  displaySettings: {
    theme: 'dark' | 'light';
    showTeamColors: boolean;
    defaultView: 'live' | 'all';
  };
}

export interface WinProbabilityData {
  time: string;
  homeWinProb: number;
  awayWinProb: number;
  quarter: number;
  scoreDifferential: number;
  timeRemainingInGame: number;
}

export interface HistoricalGame {
  gameId: string;
  season: number;
  week: number;
  homeTeam: Team;
  awayTeam: Team;
  finalScoreHome: number;
  finalScoreAway: number;
  winner: string;
  gameDate: string;
  venue: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
  requestId?: string;
}

export interface PaymentTransaction {
  transactionId: string;
  userId: string;
  amount: number;
  currency: 'USD' | 'ETH' | 'USDC';
  feature: 'advanced_stats' | 'historical_data' | 'premium_notifications';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  timestamp: string;
  txHash?: string;
}

export interface NotificationSubscription {
  subscriptionId: string;
  userId: string;
  gameId?: string;
  teamId?: string;
  eventTypes: string[];
  deliveryMethod: 'push' | 'in_app' | 'email';
  active: boolean;
}
