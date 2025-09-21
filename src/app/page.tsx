'use client';

import { useState } from 'react';
import { GamesList } from '@/components/games-list';
import { GameDetails } from '@/components/game-details';

export default function Home() {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId);
  };

  const handleBack = () => {
    setSelectedGameId(null);
  };

  return (
    <main className="min-h-screen">
      {selectedGameId ? (
        <GameDetails gameId={selectedGameId} onBack={handleBack} />
      ) : (
        <GamesList onGameSelect={handleGameSelect} />
      )}
    </main>
  );
}

