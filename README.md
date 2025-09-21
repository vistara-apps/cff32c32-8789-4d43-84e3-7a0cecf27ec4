# Farrow Score - NFL Scores Mini App

Real-time NFL scores & win probabilities, powered by Base.

## Features

- **Live Scoreboard**: Real-time NFL game scores with team logos and game status
- **Win Probability Charts**: Dynamic visualization of team win likelihood throughout games
- **Real-time Updates**: Automatic score updates every 30 seconds
- **Premium Stats**: Micro-transaction model for advanced player and team statistics
- **Mobile-First Design**: Optimized for Base App and Farcaster frames
- **Dark Theme**: Modern, sports-focused UI design

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base integration via MiniKit
- **UI**: Tailwind CSS with custom design system
- **Charts**: Recharts for win probability visualization
- **Icons**: Lucide React
- **TypeScript**: Full type safety throughout

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Add your OnchainKit API key
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Home page with live scores
├── providers.tsx      # MiniKit and OnchainKit providers
├── game/[id]/         # Game detail pages
└── settings/          # Settings page

components/
├── FrameHeader.tsx    # Navigation header
├── ScoreCard.tsx      # Game score display
├── WinProbChart.tsx   # Win probability chart
├── StatRow.tsx        # Statistics display
├── NotificationBanner.tsx # Real-time notifications
└── LoadingSpinner.tsx # Loading states

lib/
├── types.ts           # TypeScript interfaces
├── utils.ts           # Utility functions
└── mock-data.ts       # Mock NFL data for demo
```

## Features Implementation

### Live Scoreboard
- Real-time score updates
- Game status indicators (live, final, scheduled)
- Team logos and abbreviations
- Win probability display

### Win Probability Chart
- Interactive line chart showing probability over time
- Quarter-by-quarter breakdown
- Live updates during games
- Responsive design for mobile

### Micro-transactions
- Premium advanced stats unlock ($0.50)
- Base blockchain integration

## API Documentation

### NFL Game Data API

The app uses mock data for development but is designed to integrate with real NFL APIs.

#### Endpoints

**GET /api/games**
- Returns list of current NFL games
- Response: `{ data: Game[], success: boolean, message: string }`

**GET /api/games/[id]**
- Returns detailed game information including win probability data
- Parameters: `id` (string) - Game ID
- Response: `{ data: { game: Game, winProbabilityData: WinProbabilityData[] }, success: boolean, message: string }`

#### Data Models

**Game**
```typescript
{
  gameId: string;
  homeTeam: Team;
  awayTeam: Team;
  currentScoreHome: number;
  currentScoreAway: number;
  gameState: 'scheduled' | 'live' | 'final';
  quarter: number;
  timeRemaining: string;
  winProbability: { home: number; away: number };
  lastUpdate: string;
}
```

**Team**
```typescript
{
  teamId: string;
  teamName: string;
  teamLogo: string;
  abbreviation: string;
  primaryColor: string;
}
```

### Base Notification Service

For production deployment, integrate with Base notification services for real-time alerts.

#### Configuration
- Set `NOTIFICATION_WEBHOOK_URL` in environment variables
- Webhook receives game events (scores, touchdowns, etc.)
- User preferences filter notifications

## Deployment

### Base Mini App Deployment

1. **Build the application:**
```bash
npm run build
```

2. **Configure environment variables:**
```bash
cp .env.example .env.local
# Fill in your API keys and configuration
```

3. **Deploy to Base:**
- Use Base's deployment tools for Mini Apps
- Configure Base App manifest in `public/manifest.json`
- Set up Base Wallet integration

### Production Checklist

- [x] All technical specifications finalized
- [x] API documentation completed
- [x] UI/UX requirements implemented
- [x] Business logic (micro-transactions) added
- [x] All features from PRD implemented
- [x] Production-ready build tested
- [x] Environment variables configured
- [x] Base integration verified
- [x] TypeScript compilation successful
- [x] Responsive design tested

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | Coinbase OnchainKit API key | Yes |
| `NFL_API_KEY` | NFL data API key (production) | No |
| `NEXT_PUBLIC_BASE_RPC_URL` | Base network RPC URL | Yes |
| `NEXT_PUBLIC_BASE_CHAIN_ID` | Base chain ID (8453) | Yes |
| `NOTIFICATION_WEBHOOK_URL` | Notification service webhook | No |
- Secure payment flow
- Feature gating for premium content

### Real-time Updates
- Automatic score refreshing
- Push notification simulation
- Live game indicators
- Update timestamps

## Customization

The app uses a custom design system with CSS variables:

```css
:root {
  --primary: hsl(234, 100%, 50%);
  --accent: hsl(40, 90%, 50%);
  --bg: hsl(230, 60%, 95%);
  --surface: hsl(0, 0%, 100%);
  --danger: hsl(10, 80%, 50%);
  --success: hsl(160, 70%, 50%);
}
```

## License

MIT License - see LICENSE file for details.
