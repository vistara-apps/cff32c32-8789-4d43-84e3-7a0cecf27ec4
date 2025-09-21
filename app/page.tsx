'use client';

import { useState, useEffect } from 'react';
import { FrameHeader } from '@/components/FrameHeader';
import { ScoreCard } from '@/components/ScoreCard';
import { NotificationBanner } from '@/components/NotificationBanner';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Game } from '@/lib/types';
import { fetchGames } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadGames();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateScores();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const gamesData = await fetchGames();
      setGames(gamesData);
      setError(null);
    } catch (err) {
      setError('Failed to load games');
      console.error('Error loading games:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateScores = async () => {
    try {
      const updatedGames = await fetchGames();
      
      // Check for score changes
      const hasScoreUpdate = updatedGames.some((newGame, index) => {
        const oldGame = games[index];
        return oldGame && (
          newGame.currentScoreHome !== oldGame.currentScoreHome ||
          newGame.currentScoreAway !== oldGame.currentScoreAway
        );
      });

      if (hasScoreUpdate) {
        setNotification('Scores updated!');
        setTimeout(() => setNotification(null), 5000);
      }

      setGames(updatedGames);
    } catch (err) {
      console.error('Error updating scores:', err);
    }
  };

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <FrameHeader title="Farrow Score" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400">Loading live scores...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <FrameHeader title="Farrow Score" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <p className="text-danger">{error}</p>
            <button
              onClick={loadGames}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <FrameHeader 
        title="Farrow Score" 
        showSettings={true}
        onSettings={() => router.push('/settings')}
      />
      
      <main className="container max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Notification */}
        {notification && (
          <NotificationBanner
            variant="scoreUpdate"
            message={notification}
            onDismiss={() => setNotification(null)}
          />
        )}

        {/* Hero Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Live NFL Scores
          </h2>
          <p className="text-gray-400">
            Real-time scores & win probabilities
          </p>
        </div>

        {/* Live Games */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Live Games
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-red-400">Live</span>
            </div>
          </div>
          
          {games.filter(game => game.gameState === 'live').length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-gray-400">No live games at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {games
                .filter(game => game.gameState === 'live')
                .map(game => (
                  <ScoreCard
                    key={game.gameId}
                    game={game}
                    variant="highlighted"
                    onClick={() => handleGameClick(game.gameId)}
                  />
                ))}
            </div>
          )}
        </div>

        {/* All Games */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            All Games
          </h3>
          
          <div className="space-y-4">
            {games.map(game => (
              <ScoreCard
                key={game.gameId}
                game={game}
                onClick={() => handleGameClick(game.gameId)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <p className="text-xs text-gray-500">
            Powered by Base • Real-time NFL data
          </p>
        </div>
      </main>
    </div>
  );
}
