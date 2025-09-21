'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FrameHeader } from '@/components/FrameHeader';
import { ScoreCard } from '@/components/ScoreCard';
import { WinProbChart } from '@/components/WinProbChart';
import { StatRow } from '@/components/StatRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Game, WinProbabilityData } from '@/lib/types';
import { fetchGameById, fetchWinProbabilityData } from '@/lib/mock-data';
import { Lock, Zap } from 'lucide-react';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;
  
  const [game, setGame] = useState<Game | null>(null);
  const [winProbData, setWinProbData] = useState<WinProbabilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);

  useEffect(() => {
    loadGameData();
  }, [gameId]);

  const loadGameData = async () => {
    try {
      setLoading(true);
      const [gameData, probData] = await Promise.all([
        fetchGameById(gameId),
        fetchWinProbabilityData(gameId)
      ]);
      
      if (!gameData) {
        setError('Game not found');
        return;
      }
      
      setGame(gameData);
      setWinProbData(probData);
      setError(null);
    } catch (err) {
      setError('Failed to load game data');
      console.error('Error loading game:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockAdvancedStats = () => {
    // In a real app, this would trigger a micro-transaction
    alert('Micro-transaction: $0.50 for advanced stats access');
    setShowAdvancedStats(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <FrameHeader 
          title="Game Details" 
          showBack={true}
          onBack={() => router.back()}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400">Loading game details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-900">
        <FrameHeader 
          title="Game Details" 
          showBack={true}
          onBack={() => router.back()}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <p className="text-danger">{error || 'Game not found'}</p>
            <button
              onClick={() => router.back()}
              className="btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <FrameHeader 
        title="Game Details" 
        showBack={true}
        onBack={() => router.back()}
      />
      
      <main className="container max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Game Score */}
        <ScoreCard game={game} variant="highlighted" />

        {/* Win Probability Chart */}
        {game.gameState === 'live' && winProbData.length > 0 && (
          <div className="card p-4">
            <WinProbChart
              data={winProbData}
              homeTeam={game.homeTeam.abbreviation}
              awayTeam={game.awayTeam.abbreviation}
              variant="live"
            />
          </div>
        )}

        {/* Basic Stats */}
        <div className="card p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white">Game Stats</h3>
          <div className="space-y-2">
            <StatRow label="Total Points" value={game.currentScoreHome + game.currentScoreAway} />
            <StatRow label="Quarter" value={game.quarter} />
            <StatRow label="Time Remaining" value={game.timeRemaining} />
            <StatRow 
              label="Win Probability" 
              value={`${game.homeTeam.abbreviation} ${game.winProbability.home}%`}
              highlight={game.winProbability.home > 50}
            />
          </div>
        </div>

        {/* Advanced Stats (Premium) */}
        <div className="card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Advanced Stats</h3>
            {!showAdvancedStats && (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">Premium</span>
              </div>
            )}
          </div>
          
          {showAdvancedStats ? (
            <div className="space-y-2">
              <StatRow 
                label="Passing Yards" 
                value={`${game.homeTeam.abbreviation}: 245, ${game.awayTeam.abbreviation}: 189`}
                variant="player"
              />
              <StatRow 
                label="Rushing Yards" 
                value={`${game.homeTeam.abbreviation}: 98, ${game.awayTeam.abbreviation}: 142`}
                variant="player"
              />
              <StatRow 
                label="Turnovers" 
                value={`${game.homeTeam.abbreviation}: 1, ${game.awayTeam.abbreviation}: 2`}
                variant="player"
              />
              <StatRow 
                label="Time of Possession" 
                value={`${game.homeTeam.abbreviation}: 18:45, ${game.awayTeam.abbreviation}: 11:15`}
                variant="player"
              />
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">Unlock advanced player stats</p>
                <p className="text-sm text-gray-500">
                  Get detailed passing, rushing, and defensive statistics
                </p>
              </div>
              <button
                onClick={handleUnlockAdvancedStats}
                className="inline-flex items-center space-x-2 bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                <Zap className="w-4 h-4" />
                <span>Unlock for $0.50</span>
              </button>
            </div>
          )}
        </div>

        {/* Team Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 text-center space-y-2">
            <div className="text-2xl">{game.awayTeam.teamLogo}</div>
            <div className="font-semibold text-white">{game.awayTeam.abbreviation}</div>
            <div className="text-sm text-gray-400">{game.awayTeam.teamName}</div>
            <div className="text-2xl font-bold text-white">{game.currentScoreAway}</div>
          </div>
          
          <div className="card p-4 text-center space-y-2">
            <div className="text-2xl">{game.homeTeam.teamLogo}</div>
            <div className="font-semibold text-white">{game.homeTeam.abbreviation}</div>
            <div className="text-sm text-gray-400">{game.homeTeam.teamName}</div>
            <div className="text-2xl font-bold text-white">{game.currentScoreHome}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
