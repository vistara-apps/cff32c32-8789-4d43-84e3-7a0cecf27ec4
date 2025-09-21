import { Game, Team, WinProbabilityData } from './types';

export const mockTeams: Team[] = [
  {
    teamId: '1',
    teamName: 'Kansas City Chiefs',
    teamLogo: '🏈',
    abbreviation: 'KC',
    primaryColor: '#FF0000'
  },
  {
    teamId: '2',
    teamName: 'Buffalo Bills',
    teamLogo: '🦬',
    abbreviation: 'BUF',
    primaryColor: '#0000FF'
  },
  {
    teamId: '3',
    teamName: 'Miami Dolphins',
    teamLogo: '🐬',
    abbreviation: 'MIA',
    primaryColor: '#008B8B'
  },
  {
    teamId: '4',
    teamName: 'New England Patriots',
    teamLogo: '🇺🇸',
    abbreviation: 'NE',
    primaryColor: '#002244'
  }
];

export const mockGames: Game[] = [
  {
    gameId: '1',
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    currentScoreHome: 21,
    currentScoreAway: 14,
    gameState: 'live',
    quarter: 3,
    timeRemaining: '8:45',
    winProbability: {
      home: 68,
      away: 32
    },
    lastUpdate: new Date().toISOString()
  },
  {
    gameId: '2',
    homeTeam: mockTeams[2],
    awayTeam: mockTeams[3],
    currentScoreHome: 7,
    currentScoreAway: 10,
    gameState: 'live',
    quarter: 2,
    timeRemaining: '3:22',
    winProbability: {
      home: 42,
      away: 58
    },
    lastUpdate: new Date().toISOString()
  }
];

export const mockWinProbabilityData: WinProbabilityData[] = [
  { time: '15:00', homeWinProb: 50, awayWinProb: 50, quarter: 1 },
  { time: '12:30', homeWinProb: 55, awayWinProb: 45, quarter: 1 },
  { time: '8:15', homeWinProb: 48, awayWinProb: 52, quarter: 1 },
  { time: '3:45', homeWinProb: 62, awayWinProb: 38, quarter: 1 },
  { time: '0:00', homeWinProb: 58, awayWinProb: 42, quarter: 1 },
  { time: '15:00', homeWinProb: 61, awayWinProb: 39, quarter: 2 },
  { time: '10:22', homeWinProb: 65, awayWinProb: 35, quarter: 2 },
  { time: '6:18', homeWinProb: 72, awayWinProb: 28, quarter: 2 },
  { time: '2:45', homeWinProb: 68, awayWinProb: 32, quarter: 2 },
  { time: '0:00', homeWinProb: 70, awayWinProb: 30, quarter: 2 },
  { time: '15:00', homeWinProb: 68, awayWinProb: 32, quarter: 3 },
  { time: '8:45', homeWinProb: 68, awayWinProb: 32, quarter: 3 }
];

// Mock API functions
export async function fetchGames(): Promise<Game[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGames;
}

export async function fetchGameById(gameId: string): Promise<Game | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockGames.find(game => game.gameId === gameId) || null;
}

export async function fetchWinProbabilityData(gameId: string): Promise<WinProbabilityData[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockWinProbabilityData;
}
