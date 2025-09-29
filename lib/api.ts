import { Game, Team, Player, WinProbabilityData, GameEvent, HistoricalGame, ApiResponse } from './types';

// Environment variables for API configuration
const NFL_API_BASE_URL = process.env.NEXT_PUBLIC_NFL_API_BASE_URL || 'https://api.nfl.com/v1';
const NFL_API_KEY = process.env.NEXT_PUBLIC_NFL_API_KEY;
const ESPN_API_BASE_URL = process.env.NEXT_PUBLIC_ESPN_API_BASE_URL || 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';
const SPORTS_DATA_API_BASE_URL = process.env.NEXT_PUBLIC_SPORTS_DATA_API_BASE_URL || 'https://api.sportsdata.io/v2/json';
const SPORTS_DATA_API_KEY = process.env.NEXT_PUBLIC_SPORTS_DATA_API_KEY;

// API rate limiting and caching
const API_CACHE_DURATION = 30000; // 30 seconds for live games
const HISTORICAL_CACHE_DURATION = 3600000; // 1 hour for historical data

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string, maxAge: number): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

const apiCache = new ApiCache();

// Error handling
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function with error handling
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FarrowScore/1.0',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        url
      );
    }

    const data = await response.json();

    return {
      data,
      success: true,
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substr(2, 9)
    };
  } catch (error) {
    console.error('API Request Error:', error);

    return {
      data: null as T,
      success: false,
      error: error instanceof ApiError ? error.message : 'Unknown API error',
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substr(2, 9)
    };
  }
}

// NFL API Service Functions

/**
 * Fetch current NFL games (live and scheduled)
 */
export async function fetchLiveGames(): Promise<Game[]> {
  const cacheKey = 'live_games';
  const cached = apiCache.get<Game[]>(cacheKey, API_CACHE_DURATION);
  if (cached) return cached;

  try {
    // Try ESPN API first (free tier)
    const espnResponse = await apiRequest<any>(`${ESPN_API_BASE_URL}/scoreboard`);

    if (espnResponse.success && espnResponse.data?.events) {
      const games = espnResponse.data.events.map(transformEspnGameToGame);
      apiCache.set(cacheKey, games);
      return games;
    }

    // Fallback to mock data if APIs are unavailable
    console.warn('ESPN API unavailable, using mock data');
    const { fetchGames } = await import('./mock-data');
    return fetchGames();

  } catch (error) {
    console.error('Error fetching live games:', error);
    // Fallback to mock data
    const { fetchGames } = await import('./mock-data');
    return fetchGames();
  }
}

/**
 * Fetch detailed information for a specific game
 */
export async function fetchGameDetails(gameId: string): Promise<Game | null> {
  const cacheKey = `game_${gameId}`;
  const cached = apiCache.get<Game>(cacheKey, API_CACHE_DURATION);
  if (cached) return cached;

  try {
    // Try ESPN API for game details
    const espnResponse = await apiRequest<any>(`${ESPN_API_BASE_URL}/scoreboard/${gameId}`);

    if (espnResponse.success && espnResponse.data) {
      const game = transformEspnGameToGame(espnResponse.data);
      apiCache.set(cacheKey, game);
      return game;
    }

    // Fallback to mock data
    const { fetchGameById } = await import('./mock-data');
    return fetchGameById(gameId);

  } catch (error) {
    console.error('Error fetching game details:', error);
    const { fetchGameById } = await import('./mock-data');
    return fetchGameById(gameId);
  }
}

/**
 * Fetch win probability data for a game
 */
export async function fetchWinProbability(gameId: string): Promise<WinProbabilityData[]> {
  const cacheKey = `win_prob_${gameId}`;
  const cached = apiCache.get<WinProbabilityData[]>(cacheKey, API_CACHE_DURATION);
  if (cached) return cached;

  try {
    // For now, use mock data as win probability APIs are typically premium
    const { fetchWinProbabilityData } = await import('./mock-data');
    const data = await fetchWinProbabilityData(gameId);
    apiCache.set(cacheKey, data);
    return data;

  } catch (error) {
    console.error('Error fetching win probability:', error);
    const { fetchWinProbabilityData } = await import('./mock-data');
    return fetchWinProbabilityData(gameId);
  }
}

/**
 * Fetch player statistics for a game or team
 */
export async function fetchPlayerStats(gameId?: string, teamId?: string): Promise<Player[]> {
  const cacheKey = `players_${gameId || 'all'}_${teamId || 'all'}`;
  const cached = apiCache.get<Player[]>(cacheKey, API_CACHE_DURATION);
  if (cached) return cached;

  try {
    // Try SportsData.io API for player stats
    if (SPORTS_DATA_API_KEY) {
      let url = `${SPORTS_DATA_API_BASE_URL}/Players`;

      if (gameId) {
        // Get players for a specific game
        url = `${SPORTS_DATA_API_BASE_URL}/GamesBySeason/2024`;
        const gamesResponse = await apiRequest<any[]>(url, {
          headers: { 'Ocp-Apim-Subscription-Key': SPORTS_DATA_API_KEY }
        });

        if (gamesResponse.success && gamesResponse.data) {
          const game = gamesResponse.data.find((g: any) => g.GameID.toString() === gameId);
          if (game) {
            // Get player stats for this game
            const statsUrl = `${SPORTS_DATA_API_BASE_URL}/PlayerGameStatsBySeason/2024`;
            const statsResponse = await apiRequest<any[]>(statsUrl, {
              headers: { 'Ocp-Apim-Subscription-Key': SPORTS_DATA_API_KEY }
            });

            if (statsResponse.success && statsResponse.data) {
              const gameStats = statsResponse.data.filter((s: any) => s.GameID === game.GameID);
              const players = gameStats.map(transformSportsDataPlayer);
              apiCache.set(cacheKey, players);
              return players;
            }
          }
        }
      }
    }

    // Fallback to mock data
    const { fetchPlayers } = await import('./mock-data');
    const players = await fetchPlayers(teamId);
    apiCache.set(cacheKey, players);
    return players;

  } catch (error) {
    console.error('Error fetching player stats:', error);
    const { fetchPlayers } = await import('./mock-data');
    return fetchPlayers(teamId);
  }
}

/**
 * Fetch game events (plays, scores, etc.)
 */
export async function fetchGameEvents(gameId: string): Promise<GameEvent[]> {
  const cacheKey = `events_${gameId}`;
  const cached = apiCache.get<GameEvent[]>(cacheKey, API_CACHE_DURATION);
  if (cached) return cached;

  try {
    // For now, use mock data as detailed play-by-play APIs are typically premium
    const { fetchGameEvents } = await import('./mock-data');
    const events = await fetchGameEvents(gameId);
    apiCache.set(cacheKey, events);
    return events;

  } catch (error) {
    console.error('Error fetching game events:', error);
    const { fetchGameEvents } = await import('./mock-data');
    return fetchGameEvents(gameId);
  }
}

/**
 * Fetch historical games data
 */
export async function fetchHistoricalGames(teamId?: string, limit: number = 10): Promise<HistoricalGame[]> {
  const cacheKey = `historical_${teamId || 'all'}_${limit}`;
  const cached = apiCache.get<HistoricalGame[]>(cacheKey, HISTORICAL_CACHE_DURATION);
  if (cached) return cached;

  try {
    // Try SportsData.io for historical games
    if (SPORTS_DATA_API_KEY) {
      const url = `${SPORTS_DATA_API_BASE_URL}/GamesBySeason/2023`;
      const response = await apiRequest<any[]>(url, {
        headers: { 'Ocp-Apim-Subscription-Key': SPORTS_DATA_API_KEY }
      });

      if (response.success && response.data) {
        let games = response.data.map(transformSportsDataHistoricalGame);

        if (teamId) {
          games = games.filter(game =>
            game.homeTeam.teamId === teamId || game.awayTeam.teamId === teamId
          );
        }

        const limitedGames = games.slice(0, limit);
        apiCache.set(cacheKey, limitedGames);
        return limitedGames;
      }
    }

    // Fallback to mock data
    const { fetchHistoricalGames } = await import('./mock-data');
    const games = await fetchHistoricalGames(teamId, limit);
    apiCache.set(cacheKey, games);
    return games;

  } catch (error) {
    console.error('Error fetching historical games:', error);
    const { fetchHistoricalGames } = await import('./mock-data');
    return fetchHistoricalGames(teamId, limit);
  }
}

/**
 * Fetch NFL teams information
 */
export async function fetchTeams(): Promise<Team[]> {
  const cacheKey = 'teams';
  const cached = apiCache.get<Team[]>(cacheKey, HISTORICAL_CACHE_DURATION);
  if (cached) return cached;

  try {
    // Try ESPN API for teams
    const response = await apiRequest<any>(`${ESPN_API_BASE_URL}/teams`);

    if (response.success && response.data?.sports?.[0]?.leagues?.[0]?.teams) {
      const teams = response.data.sports[0].leagues[0].teams.map(transformEspnTeam);
      apiCache.set(cacheKey, teams);
      return teams;
    }

    // Fallback to mock data
    const { mockTeams } = await import('./mock-data');
    apiCache.set(cacheKey, mockTeams);
    return mockTeams;

  } catch (error) {
    console.error('Error fetching teams:', error);
    const { mockTeams } = await import('./mock-data');
    return mockTeams;
  }
}

// Data transformation functions

function transformEspnGameToGame(espnGame: any): Game {
  const competition = espnGame.competitions?.[0];
  if (!competition) return null as any;

  const homeTeam = competition.competitors?.find((c: any) => c.homeAway === 'home');
  const awayTeam = competition.competitors?.find((c: any) => c.homeAway === 'away');

  if (!homeTeam || !awayTeam) return null as any;

  const status = espnGame.status;
  const gameState = status.type.state === 'in' ? 'live' :
                   status.type.state === 'post' ? 'final' : 'scheduled';

  return {
    gameId: espnGame.id,
    homeTeam: transformEspnTeam(homeTeam.team),
    awayTeam: transformEspnTeam(awayTeam.team),
    currentScoreHome: parseInt(homeTeam.score) || 0,
    currentScoreAway: parseInt(awayTeam.score) || 0,
    gameState,
    quarter: status.period || 1,
    timeRemaining: status.displayClock || '15:00',
    winProbability: {
      home: 50, // ESPN doesn't provide win probability in free tier
      away: 50
    },
    gameDate: espnGame.date,
    venue: competition.venue?.fullName,
    attendance: competition.attendance,
    tvBroadcast: competition.broadcasts?.[0]?.names?.[0],
    lastUpdate: new Date().toISOString()
  };
}

function transformEspnTeam(espnTeam: any): Team {
  return {
    teamId: espnTeam.id,
    teamName: espnTeam.displayName,
    teamLogo: espnTeam.logo,
    abbreviation: espnTeam.abbreviation,
    primaryColor: espnTeam.color || '#000000',
    secondaryColor: espnTeam.alternateColor,
    city: espnTeam.location,
    stadium: espnTeam.venue?.fullName,
    headCoach: espnTeam.coach,
    conference: espnTeam.conferenceId === 0 ? 'AFC' : 'NFC',
    division: getDivisionFromEspn(espnTeam)
  };
}

function transformSportsDataPlayer(sportsDataPlayer: any): Player {
  return {
    playerId: sportsDataPlayer.PlayerID.toString(),
    playerName: sportsDataPlayer.Name,
    playerTeam: sportsDataPlayer.Team,
    position: sportsDataPlayer.Position,
    jerseyNumber: sportsDataPlayer.Number,
    height: sportsDataPlayer.Height,
    weight: sportsDataPlayer.Weight,
    experience: sportsDataPlayer.Experience,
    college: sportsDataPlayer.College,
    stats: {
      passingYards: sportsDataPlayer.PassingYards,
      passingTouchdowns: sportsDataPlayer.PassingTouchdowns,
      rushingYards: sportsDataPlayer.RushingYards,
      rushingTouchdowns: sportsDataPlayer.RushingTouchdowns,
      receivingYards: sportsDataPlayer.ReceivingYards,
      receivingTouchdowns: sportsDataPlayer.ReceivingTouchdowns,
      tackles: sportsDataPlayer.Tackles,
      sacks: sportsDataPlayer.Sacks,
      interceptions: sportsDataPlayer.Interceptions
    }
  };
}

function transformSportsDataHistoricalGame(sportsDataGame: any): HistoricalGame {
  return {
    gameId: sportsDataGame.GameID.toString(),
    season: sportsDataGame.Season,
    week: sportsDataGame.Week,
    homeTeam: {
      teamId: sportsDataGame.HomeTeamID.toString(),
      teamName: sportsDataGame.HomeTeamName,
      teamLogo: '🏈',
      abbreviation: sportsDataGame.HomeTeam,
      primaryColor: '#000000'
    },
    awayTeam: {
      teamId: sportsDataGame.AwayTeamID.toString(),
      teamName: sportsDataGame.AwayTeamName,
      teamLogo: '🏈',
      abbreviation: sportsDataGame.AwayTeam,
      primaryColor: '#000000'
    },
    finalScoreHome: sportsDataGame.HomeScore,
    finalScoreAway: sportsDataGame.AwayScore,
    winner: sportsDataGame.HomeScore > sportsDataGame.AwayScore ? sportsDataGame.HomeTeam : sportsDataGame.AwayTeam,
    gameDate: sportsDataGame.DateTime,
    venue: sportsDataGame.StadiumName
  };
}

function getDivisionFromEspn(team: any): 'East' | 'West' | 'North' | 'South' {
  // This is a simplified mapping - in a real implementation,
  // you'd need to map ESPN's group IDs to NFL divisions
  const groupId = team.groupId;
  const divisionMap: Record<number, 'East' | 'West' | 'North' | 'South'> = {
    1: 'East',
    2: 'North',
    3: 'South',
    4: 'West'
  };
  return divisionMap[groupId] || 'East';
}

// Export cache management functions
export const clearApiCache = () => apiCache.clear();
export const getCacheStats = () => ({
  size: apiCache['cache'].size,
  keys: Array.from(apiCache['cache'].keys())
});

