import { Game, Team, WinProbabilityData, Player, GameEvent, HistoricalGame } from './types';

export const mockTeams: Team[] = [
  // AFC East
  {
    teamId: '1',
    teamName: 'Buffalo Bills',
    teamLogo: '🦬',
    abbreviation: 'BUF',
    primaryColor: '#00338D',
    secondaryColor: '#C60C30',
    conference: 'AFC',
    division: 'East',
    city: 'Buffalo',
    stadium: 'Highmark Stadium',
    headCoach: 'Sean McDermott',
    record: { wins: 11, losses: 6, ties: 0, winPercentage: 0.647 }
  },
  {
    teamId: '2',
    teamName: 'Miami Dolphins',
    teamLogo: '🐬',
    abbreviation: 'MIA',
    primaryColor: '#008E97',
    secondaryColor: '#FC4C02',
    conference: 'AFC',
    division: 'East',
    city: 'Miami Gardens',
    stadium: 'Hard Rock Stadium',
    headCoach: 'Mike McDaniel',
    record: { wins: 11, losses: 6, ties: 0, winPercentage: 0.647 }
  },
  {
    teamId: '3',
    teamName: 'New England Patriots',
    teamLogo: '🇺🇸',
    abbreviation: 'NE',
    primaryColor: '#002244',
    secondaryColor: '#C60C30',
    conference: 'AFC',
    division: 'East',
    city: 'Foxborough',
    stadium: 'Gillette Stadium',
    headCoach: 'Jerod Mayo',
    record: { wins: 4, losses: 13, ties: 0, winPercentage: 0.235 }
  },
  {
    teamId: '4',
    teamName: 'New York Jets',
    teamLogo: '✈️',
    abbreviation: 'NYJ',
    primaryColor: '#125740',
    secondaryColor: '#FFFFFF',
    conference: 'AFC',
    division: 'East',
    city: 'Florham Park',
    stadium: 'MetLife Stadium',
    headCoach: 'Robert Saleh',
    record: { wins: 5, losses: 12, ties: 0, winPercentage: 0.294 }
  },

  // AFC North
  {
    teamId: '5',
    teamName: 'Baltimore Ravens',
    teamLogo: '🐦',
    abbreviation: 'BAL',
    primaryColor: '#241773',
    secondaryColor: '#9E7C0C',
    conference: 'AFC',
    division: 'North',
    city: 'Baltimore',
    stadium: 'M&T Bank Stadium',
    headCoach: 'John Harbaugh',
    record: { wins: 12, losses: 5, ties: 0, winPercentage: 0.706 }
  },
  {
    teamId: '6',
    teamName: 'Cincinnati Bengals',
    teamLogo: '🐯',
    abbreviation: 'CIN',
    primaryColor: '#FB4F14',
    secondaryColor: '#000000',
    conference: 'AFC',
    division: 'North',
    city: 'Cincinnati',
    stadium: 'Paycor Stadium',
    headCoach: 'Zac Taylor',
    record: { wins: 9, losses: 8, ties: 0, winPercentage: 0.529 }
  },
  {
    teamId: '7',
    teamName: 'Cleveland Browns',
    teamLogo: '🐶',
    abbreviation: 'CLE',
    primaryColor: '#FF3C00',
    secondaryColor: '#311D00',
    conference: 'AFC',
    division: 'North',
    city: 'Cleveland',
    stadium: 'Cleveland Browns Stadium',
    headCoach: 'Kevin Stefanski',
    record: { wins: 11, losses: 6, ties: 0, winPercentage: 0.647 }
  },
  {
    teamId: '8',
    teamName: 'Pittsburgh Steelers',
    teamLogo: '🏈',
    abbreviation: 'PIT',
    primaryColor: '#FFB612',
    secondaryColor: '#101820',
    conference: 'AFC',
    division: 'North',
    city: 'Pittsburgh',
    stadium: 'Acrisure Stadium',
    headCoach: 'Mike Tomlin',
    record: { wins: 10, losses: 7, ties: 0, winPercentage: 0.588 }
  },

  // AFC South
  {
    teamId: '9',
    teamName: 'Houston Texans',
    teamLogo: '🐆',
    abbreviation: 'HOU',
    primaryColor: '#03202F',
    secondaryColor: '#A71930',
    conference: 'AFC',
    division: 'South',
    city: 'Houston',
    stadium: 'NRG Stadium',
    headCoach: 'DeMeco Ryans',
    record: { wins: 10, losses: 7, ties: 0, winPercentage: 0.588 }
  },
  {
    teamId: '10',
    teamName: 'Indianapolis Colts',
    teamLogo: '🏈',
    abbreviation: 'IND',
    primaryColor: '#002C5F',
    secondaryColor: '#A2AAAD',
    conference: 'AFC',
    division: 'South',
    city: 'Indianapolis',
    stadium: 'Lucas Oil Stadium',
    headCoach: 'Shane Steichen',
    record: { wins: 8, losses: 9, ties: 0, winPercentage: 0.471 }
  },
  {
    teamId: '11',
    teamName: 'Jacksonville Jaguars',
    teamLogo: '🐆',
    abbreviation: 'JAX',
    primaryColor: '#101820',
    secondaryColor: '#D7A22A',
    conference: 'AFC',
    division: 'South',
    city: 'Jacksonville',
    stadium: 'EverBank Stadium',
    headCoach: 'Doug Pederson',
    record: { wins: 4, losses: 13, ties: 0, winPercentage: 0.235 }
  },
  {
    teamId: '12',
    teamName: 'Tennessee Titans',
    teamLogo: '🏈',
    abbreviation: 'TEN',
    primaryColor: '#0C2340',
    secondaryColor: '#4B92DB',
    conference: 'AFC',
    division: 'South',
    city: 'Nashville',
    stadium: 'Nissan Stadium',
    headCoach: 'Brian Callahan',
    record: { wins: 6, losses: 11, ties: 0, winPercentage: 0.353 }
  },

  // AFC West
  {
    teamId: '13',
    teamName: 'Denver Broncos',
    teamLogo: '🐴',
    abbreviation: 'DEN',
    primaryColor: '#FB4F14',
    secondaryColor: '#002244',
    conference: 'AFC',
    division: 'West',
    city: 'Denver',
    stadium: 'Empower Field at Mile High',
    headCoach: 'Sean Payton',
    record: { wins: 8, losses: 9, ties: 0, winPercentage: 0.471 }
  },
  {
    teamId: '14',
    teamName: 'Kansas City Chiefs',
    teamLogo: '🏈',
    abbreviation: 'KC',
    primaryColor: '#E31837',
    secondaryColor: '#FFB612',
    conference: 'AFC',
    division: 'West',
    city: 'Kansas City',
    stadium: 'Arrowhead Stadium',
    headCoach: 'Andy Reid',
    record: { wins: 11, losses: 6, ties: 0, winPercentage: 0.647 }
  },
  {
    teamId: '15',
    teamName: 'Las Vegas Raiders',
    teamLogo: '👑',
    abbreviation: 'LV',
    primaryColor: '#000000',
    secondaryColor: '#A5ACAF',
    conference: 'AFC',
    division: 'West',
    city: 'Las Vegas',
    stadium: 'Allegiant Stadium',
    headCoach: 'Antonio Pierce',
    record: { wins: 4, losses: 13, ties: 0, winPercentage: 0.235 }
  },
  {
    teamId: '16',
    teamName: 'Los Angeles Chargers',
    teamLogo: '⚡',
    abbreviation: 'LAC',
    primaryColor: '#0080C6',
    secondaryColor: '#FFC20E',
    conference: 'AFC',
    division: 'West',
    city: 'Inglewood',
    stadium: 'SoFi Stadium',
    headCoach: 'Jim Harbaugh',
    record: { wins: 11, losses: 6, ties: 0, winPercentage: 0.647 }
  },

  // NFC East
  {
    teamId: '17',
    teamName: 'Dallas Cowboys',
    teamLogo: '⭐',
    abbreviation: 'DAL',
    primaryColor: '#003594',
    secondaryColor: '#869397',
    conference: 'NFC',
    division: 'East',
    city: 'Arlington',
    stadium: 'AT&T Stadium',
    headCoach: 'Mike McCarthy',
    record: { wins: 7, losses: 10, ties: 0, winPercentage: 0.412 }
  },
  {
    teamId: '18',
    teamName: 'New York Giants',
    teamLogo: '🏈',
    abbreviation: 'NYG',
    primaryColor: '#0B2265',
    secondaryColor: '#A71930',
    conference: 'NFC',
    division: 'East',
    city: 'East Rutherford',
    stadium: 'MetLife Stadium',
    headCoach: 'Brian Daboll',
    record: { wins: 6, losses: 11, ties: 0, winPercentage: 0.353 }
  },
  {
    teamId: '19',
    teamName: 'Philadelphia Eagles',
    teamLogo: '🦅',
    abbreviation: 'PHI',
    primaryColor: '#004C54',
    secondaryColor: '#A5ACAF',
    conference: 'NFC',
    division: 'East',
    city: 'Philadelphia',
    stadium: 'Lincoln Financial Field',
    headCoach: 'Nick Sirianni',
    record: { wins: 11, losses: 6, ties: 0, winPercentage: 0.647 }
  },
  {
    teamId: '20',
    teamName: 'Washington Commanders',
    teamLogo: '🏈',
    abbreviation: 'WAS',
    primaryColor: '#5A1414',
    secondaryColor: '#FFB612',
    conference: 'NFC',
    division: 'East',
    city: 'Landover',
    stadium: 'Northwest Stadium',
    headCoach: 'Dan Quinn',
    record: { wins: 12, losses: 5, ties: 0, winPercentage: 0.706 }
  },

  // NFC North
  {
    teamId: '21',
    teamName: 'Chicago Bears',
    teamLogo: '🐻',
    abbreviation: 'CHI',
    primaryColor: '#0B162A',
    secondaryColor: '#C83803',
    conference: 'NFC',
    division: 'North',
    city: 'Chicago',
    stadium: 'Soldier Field',
    headCoach: 'Matt Eberflus',
    record: { wins: 5, losses: 12, ties: 0, winPercentage: 0.294 }
  },
  {
    teamId: '22',
    teamName: 'Detroit Lions',
    teamLogo: '🦁',
    abbreviation: 'DET',
    primaryColor: '#0076B6',
    secondaryColor: '#B0B7BC',
    conference: 'NFC',
    division: 'North',
    city: 'Detroit',
    stadium: 'Ford Field',
    headCoach: 'Dan Campbell',
    record: { wins: 12, losses: 5, ties: 0, winPercentage: 0.706 }
  },
  {
    teamId: '23',
    teamName: 'Green Bay Packers',
    teamLogo: '🧀',
    abbreviation: 'GB',
    primaryColor: '#203731',
    secondaryColor: '#FFB612',
    conference: 'NFC',
    division: 'North',
    city: 'Green Bay',
    stadium: 'Lambeau Field',
    headCoach: 'Matt LaFleur',
    record: { wins: 11, losses: 6, ties: 0, winPercentage: 0.647 }
  },
  {
    teamId: '24',
    teamName: 'Minnesota Vikings',
    teamLogo: '🛡️',
    abbreviation: 'MIN',
    primaryColor: '#4F2683',
    secondaryColor: '#FFC62F',
    conference: 'NFC',
    division: 'North',
    city: 'Minneapolis',
    stadium: 'U.S. Bank Stadium',
    headCoach: 'Kevin O\'Connell',
    record: { wins: 7, losses: 10, ties: 0, winPercentage: 0.412 }
  },

  // NFC South
  {
    teamId: '25',
    teamName: 'Atlanta Falcons',
    teamLogo: '🦅',
    abbreviation: 'ATL',
    primaryColor: '#A71930',
    secondaryColor: '#000000',
    conference: 'NFC',
    division: 'South',
    city: 'Atlanta',
    stadium: 'Mercedes-Benz Stadium',
    headCoach: 'Raheem Morris',
    record: { wins: 7, losses: 10, ties: 0, winPercentage: 0.412 }
  },
  {
    teamId: '26',
    teamName: 'Carolina Panthers',
    teamLogo: '🐆',
    abbreviation: 'CAR',
    primaryColor: '#0085CA',
    secondaryColor: '#101820',
    conference: 'NFC',
    division: 'South',
    city: 'Charlotte',
    stadium: 'Bank of America Stadium',
    headCoach: 'Dave Canales',
    record: { wins: 5, losses: 12, ties: 0, winPercentage: 0.294 }
  },
  {
    teamId: '27',
    teamName: 'New Orleans Saints',
    teamLogo: '🏈',
    abbreviation: 'NO',
    primaryColor: '#D3BC8D',
    secondaryColor: '#101820',
    conference: 'NFC',
    division: 'South',
    city: 'New Orleans',
    stadium: 'Caesars Superdome',
    headCoach: 'Dennis Allen',
    record: { wins: 2, losses: 15, ties: 0, winPercentage: 0.118 }
  },
  {
    teamId: '28',
    teamName: 'Tampa Bay Buccaneers',
    teamLogo: '🏴‍☠️',
    abbreviation: 'TB',
    primaryColor: '#D50A0A',
    secondaryColor: '#34302B',
    conference: 'NFC',
    division: 'South',
    city: 'Tampa',
    stadium: 'Raymond James Stadium',
    headCoach: 'Todd Bowles',
    record: { wins: 5, losses: 12, ties: 0, winPercentage: 0.294 }
  },

  // NFC West
  {
    teamId: '29',
    teamName: 'Arizona Cardinals',
    teamLogo: '🐦',
    abbreviation: 'ARI',
    primaryColor: '#97233F',
    secondaryColor: '#000000',
    conference: 'NFC',
    division: 'West',
    city: 'Glendale',
    stadium: 'State Farm Stadium',
    headCoach: 'Jonathan Gannon',
    record: { wins: 4, losses: 13, ties: 0, winPercentage: 0.235 }
  },
  {
    teamId: '30',
    teamName: 'Los Angeles Rams',
    teamLogo: '🐏',
    abbreviation: 'LAR',
    primaryColor: '#003594',
    secondaryColor: '#FFA300',
    conference: 'NFC',
    division: 'West',
    city: 'Inglewood',
    stadium: 'SoFi Stadium',
    headCoach: 'Sean McVay',
    record: { wins: 10, losses: 7, ties: 0, winPercentage: 0.588 }
  },
  {
    teamId: '31',
    teamName: 'San Francisco 49ers',
    teamLogo: '🎩',
    abbreviation: 'SF',
    primaryColor: '#AA0000',
    secondaryColor: '#B3995D',
    conference: 'NFC',
    division: 'West',
    city: 'Santa Clara',
    stadium: 'Levi\'s Stadium',
    headCoach: 'Kyle Shanahan',
    record: { wins: 6, losses: 11, ties: 0, winPercentage: 0.353 }
  },
  {
    teamId: '32',
    teamName: 'Seattle Seahawks',
    teamLogo: '⚓',
    abbreviation: 'SEA',
    primaryColor: '#002244',
    secondaryColor: '#69BE28',
    conference: 'NFC',
    division: 'West',
    city: 'Seattle',
    stadium: 'Lumen Field',
    stadium: 'Lumen Field',
    headCoach: 'Mike Macdonald',
    record: { wins: 6, losses: 11, ties: 0, winPercentage: 0.353 }
  }
];

export const mockGames: Game[] = [
  {
    gameId: '1',
    homeTeam: mockTeams[4], // Baltimore Ravens
    awayTeam: mockTeams[13], // Denver Broncos
    currentScoreHome: 21,
    currentScoreAway: 14,
    gameState: 'live',
    quarter: 3,
    timeRemaining: '8:45',
    winProbability: {
      home: 68,
      away: 32
    },
    gameDate: '2024-12-15T16:25:00Z',
    venue: 'M&T Bank Stadium',
    attendance: 71008,
    weather: {
      temperature: 32,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 8,
      windDirection: 'NW'
    },
    tvBroadcast: 'CBS',
    lastUpdate: new Date().toISOString()
  },
  {
    gameId: '2',
    homeTeam: mockTeams[21], // Detroit Lions
    awayTeam: mockTeams[18], // New York Giants
    currentScoreHome: 31,
    currentScoreAway: 17,
    gameState: 'live',
    quarter: 4,
    timeRemaining: '2:15',
    winProbability: {
      home: 85,
      away: 15
    },
    gameDate: '2024-12-15T13:00:00Z',
    venue: 'Ford Field',
    attendance: 65000,
    weather: {
      temperature: 28,
      condition: 'Indoor',
      humidity: 45,
      windSpeed: 0,
      windDirection: 'N/A'
    },
    tvBroadcast: 'FOX',
    lastUpdate: new Date().toISOString()
  },
  {
    gameId: '3',
    homeTeam: mockTeams[13], // Kansas City Chiefs
    awayTeam: mockTeams[15], // Los Angeles Chargers
    currentScoreHome: 17,
    currentScoreAway: 14,
    gameState: 'live',
    quarter: 2,
    timeRemaining: '12:33',
    winProbability: {
      home: 62,
      away: 38
    },
    gameDate: '2024-12-15T20:20:00Z',
    venue: 'Arrowhead Stadium',
    attendance: 76416,
    weather: {
      temperature: 25,
      condition: 'Clear',
      humidity: 55,
      windSpeed: 12,
      windDirection: 'S'
    },
    tvBroadcast: 'NBC',
    lastUpdate: new Date().toISOString()
  },
  {
    gameId: '4',
    homeTeam: mockTeams[19], // Philadelphia Eagles
    awayTeam: mockTeams[17], // Dallas Cowboys
    currentScoreHome: 24,
    currentScoreAway: 21,
    gameState: 'final',
    quarter: 4,
    timeRemaining: '0:00',
    winProbability: {
      home: 100,
      away: 0
    },
    gameDate: '2024-12-14T20:15:00Z',
    venue: 'Lincoln Financial Field',
    attendance: 69879,
    weather: {
      temperature: 35,
      condition: 'Cloudy',
      humidity: 70,
      windSpeed: 6,
      windDirection: 'NE'
    },
    tvBroadcast: 'ESPN',
    lastUpdate: new Date().toISOString()
  },
  {
    gameId: '5',
    homeTeam: mockTeams[22], // Green Bay Packers
    awayTeam: mockTeams[23], // Minnesota Vikings
    currentScoreHome: 13,
    currentScoreAway: 10,
    gameState: 'scheduled',
    quarter: 1,
    timeRemaining: '15:00',
    winProbability: {
      home: 50,
      away: 50
    },
    gameDate: '2024-12-16T20:15:00Z',
    venue: 'Lambeau Field',
    weather: {
      temperature: 15,
      condition: 'Snow',
      humidity: 85,
      windSpeed: 15,
      windDirection: 'NW'
    },
    tvBroadcast: 'FOX',
    lastUpdate: new Date().toISOString()
  }
];

export const mockPlayers: Player[] = [
  // Kansas City Chiefs QB
  {
    playerId: 'p1',
    playerName: 'Patrick Mahomes',
    playerTeam: 'KC',
    position: 'QB',
    jerseyNumber: 15,
    height: '6\'3"',
    weight: 225,
    experience: 8,
    college: 'Texas Tech',
    stats: {
      passingAttempts: 25,
      passingCompletions: 18,
      passingYards: 245,
      passingTouchdowns: 2,
      interceptions: 0,
      passerRating: 125.8
    }
  },
  // Baltimore Ravens QB
  {
    playerId: 'p2',
    playerName: 'Lamar Jackson',
    playerTeam: 'BAL',
    position: 'QB',
    jerseyNumber: 8,
    height: '6\'2"',
    weight: 210,
    experience: 7,
    college: 'Louisville',
    stats: {
      passingAttempts: 22,
      passingCompletions: 16,
      passingYards: 189,
      passingTouchdowns: 1,
      interceptions: 1,
      passerRating: 98.3,
      rushingAttempts: 8,
      rushingYards: 67,
      rushingTouchdowns: 1
    }
  },
  // Detroit Lions QB
  {
    playerId: 'p3',
    playerName: 'Jared Goff',
    playerTeam: 'DET',
    position: 'QB',
    jerseyNumber: 16,
    height: '6\'4"',
    weight: 217,
    experience: 9,
    college: 'California',
    stats: {
      passingAttempts: 28,
      passingCompletions: 20,
      passingYards: 267,
      passingTouchdowns: 3,
      interceptions: 0,
      passerRating: 132.6
    }
  }
];

export const mockGameEvents: GameEvent[] = [
  {
    eventId: 'e1',
    gameId: '1',
    eventType: 'touchdown',
    description: 'Lamar Jackson 5-yard touchdown pass to Mark Andrews',
    quarter: 2,
    timeRemaining: '2:15',
    team: 'BAL',
    player: 'Mark Andrews',
    yards: 5,
    timestamp: '2024-12-15T17:42:45Z'
  },
  {
    eventId: 'e2',
    gameId: '1',
    eventType: 'field_goal',
    description: 'Justin Tucker 42-yard field goal',
    quarter: 3,
    timeRemaining: '8:45',
    team: 'BAL',
    player: 'Justin Tucker',
    yards: 42,
    timestamp: '2024-12-15T18:06:15Z'
  },
  {
    eventId: 'e3',
    gameId: '2',
    eventType: 'touchdown',
    description: 'Amon-Ra St. Brown 25-yard touchdown reception',
    quarter: 4,
    timeRemaining: '2:15',
    team: 'DET',
    player: 'Amon-Ra St. Brown',
    yards: 25,
    timestamp: '2024-12-15T15:42:45Z'
  }
];

export const mockWinProbabilityData: WinProbabilityData[] = [
  { time: '15:00', homeWinProb: 50, awayWinProb: 50, quarter: 1, scoreDifferential: 0, timeRemainingInGame: 3600 },
  { time: '12:30', homeWinProb: 55, awayWinProb: 45, quarter: 1, scoreDifferential: 3, timeRemainingInGame: 3330 },
  { time: '8:15', homeWinProb: 48, awayWinProb: 52, quarter: 1, scoreDifferential: 0, timeRemainingInGame: 2895 },
  { time: '3:45', homeWinProb: 62, awayWinProb: 38, quarter: 1, scoreDifferential: 7, timeRemainingInGame: 1425 },
  { time: '0:00', homeWinProb: 58, awayWinProb: 42, quarter: 1, scoreDifferential: 7, timeRemainingInGame: 900 },
  { time: '15:00', homeWinProb: 61, awayWinProb: 39, quarter: 2, scoreDifferential: 7, timeRemainingInGame: 2700 },
  { time: '10:22', homeWinProb: 65, awayWinProb: 35, quarter: 2, scoreDifferential: 14, timeRemainingInGame: 2322 },
  { time: '6:18', homeWinProb: 72, awayWinProb: 28, quarter: 2, scoreDifferential: 17, timeRemainingInGame: 1878 },
  { time: '2:45', homeWinProb: 68, awayWinProb: 32, quarter: 2, scoreDifferential: 14, timeRemainingInGame: 1545 },
  { time: '0:00', homeWinProb: 70, awayWinProb: 30, quarter: 2, scoreDifferential: 14, timeRemainingInGame: 1800 },
  { time: '15:00', homeWinProb: 68, awayWinProb: 32, quarter: 3, scoreDifferential: 7, timeRemainingInGame: 900 },
  { time: '8:45', homeWinProb: 68, awayWinProb: 32, quarter: 3, scoreDifferential: 7, timeRemainingInGame: 525 }
];

export const mockHistoricalGames: HistoricalGame[] = [
  {
    gameId: 'h1',
    season: 2023,
    week: 18,
    homeTeam: mockTeams[13], // Kansas City Chiefs
    awayTeam: mockTeams[15], // Los Angeles Chargers
    finalScoreHome: 31,
    finalScoreAway: 14,
    winner: 'KC',
    gameDate: '2024-01-07T20:15:00Z',
    venue: 'Arrowhead Stadium'
  },
  {
    gameId: 'h2',
    season: 2023,
    week: 17,
    homeTeam: mockTeams[4], // Baltimore Ravens
    awayTeam: mockTeams[7], // Pittsburgh Steelers
    finalScoreHome: 17,
    finalScoreAway: 10,
    winner: 'BAL',
    gameDate: '2023-12-31T13:00:00Z',
    venue: 'M&T Bank Stadium'
  },
  {
    gameId: 'h3',
    season: 2023,
    week: 16,
    homeTeam: mockTeams[21], // Detroit Lions
    awayTeam: mockTeams[17], // Dallas Cowboys
    finalScoreHome: 42,
    finalScoreAway: 19,
    winner: 'DET',
    gameDate: '2023-12-24T16:25:00Z',
    venue: 'Ford Field'
  }
];

// Mock API functions
export async function fetchGames(): Promise<Game[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGames;
}

export async function fetchGameById(gameId: string): Promise<Game | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const game = mockGames.find(game => game.gameId === gameId) || null;
  if (game) {
    // Add events to the game
    game.events = mockGameEvents.filter(event => event.gameId === gameId);
  }
  return game;
}

export async function fetchWinProbabilityData(gameId: string): Promise<WinProbabilityData[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockWinProbabilityData;
}

export async function fetchPlayers(teamId?: string): Promise<Player[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (teamId) {
    return mockPlayers.filter(player => player.playerTeam === teamId);
  }
  return mockPlayers;
}

export async function fetchGameEvents(gameId: string): Promise<GameEvent[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockGameEvents.filter(event => event.gameId === gameId);
}

export async function fetchHistoricalGames(teamId?: string, limit: number = 10): Promise<HistoricalGame[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  let games = mockHistoricalGames;
  if (teamId) {
    games = games.filter(game =>
      game.homeTeam.teamId === teamId || game.awayTeam.teamId === teamId
    );
  }
  return games.slice(0, limit);
}
