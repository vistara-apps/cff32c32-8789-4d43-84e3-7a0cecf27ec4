import { GameList } from '@/components/GameList'
import { FrameHeader } from '@/components/FrameHeader'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <FrameHeader title="Farrow Score" />
      <main className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            NFL Live Scores
          </h1>
          <p className="text-muted-foreground">
            Real-time NFL scores & win probabilities
          </p>
        </div>
        <GameList />
      </main>
    </div>
  )
}

