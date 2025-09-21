# Farrow Score - NFL Scores & Win Probabilities

Real-time NFL scores & win probabilities, powered by Base. A Base Mini App that provides live NFL game data within Base Wallets and Farcaster frames.

## Features

- **Live Scoreboard**: Real-time NFL game scores with team logos and game status
- **Win Probability Charts**: Dynamic visualization of teams' likelihood of winning throughout the game
- **Player Statistics**: Key player stats including passing, rushing, and receiving yards
- **Push Notifications**: Real-time alerts for game events and score updates
- **Micro-transactions**: Freemium model with optional paid advanced features

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for win probability visualization
- **Blockchain**: Base network integration
- **TypeScript**: Full type safety

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── game/[id]/         # Dynamic game detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── FrameHeader.tsx    # App header component
│   ├── GameList.tsx       # List of games
│   ├── ScoreCard.tsx      # Individual game score display
│   ├── StatRow.tsx        # Player/team stats display
│   ├── WinProbChart.tsx   # Win probability chart
│   └── NotificationBanner.tsx # Notification display
├── lib/                   # Utility libraries
│   └── mockData.ts        # Mock data and API functions
├── types/                 # TypeScript type definitions
│   └── index.ts           # Data model types
└── utils/                 # Utility functions
    └── cn.ts              # Class name utility
```

## Data Models

### Game
```typescript
interface Game {
  gameId: string
  homeTeam: string
  awayTeam: string
  currentScoreHome: number
  currentScoreAway: number
  gameState: 'scheduled' | 'in_progress' | 'finished' | 'postponed'
  gameTime?: string
  quarter?: number
  timeRemaining?: string
  winProbability?: {
    home: number
    away: number
  }
}
```

### Team
```typescript
interface Team {
  teamId: string
  teamName: string
  teamLogo: string
  abbreviation: string
}
```

### Player
```typescript
interface Player {
  playerId: string
  playerName: string
  playerTeam: string
  position?: string
}
```

### UserPreferences
```typescript
interface UserPreferences {
  userId: string
  followedTeams: string[]
  notificationSettings: {
    scoreUpdates: boolean
    gameEvents: boolean
  }
}
```

## API Endpoints

### NFL Game Data API
- **Purpose**: Fetch real-time scores, game states, team information, and player stats
- **Base URL**: `https://api.example-nfl.com/v1`
- **Endpoints**:
  - `GET /games` - Get all current games
  - `GET /games/{gameId}` - Get specific game details
  - `GET /games/{gameId}/stats` - Get game statistics
  - `GET /teams` - Get team information
  - `GET /players` - Get player information

### Base Notification Service
- **Purpose**: Send push notifications for game events
- **Integration**: Webhook-based notifications triggered by backend events

## Design System

### Colors
- **Primary**: `hsl(234, 100%, 50%)` - Blue
- **Accent**: `hsl(40, 90%, 50%)` - Orange
- **Background**: `hsl(230, 60%, 95%)` - Light blue-gray
- **Surface**: `hsl(0, 0%, 100%)` - White
- **Danger**: `hsl(10, 80%, 50%)` - Red
- **Success**: `hsl(160, 70%, 50%)` - Green

### Typography
- **Display**: `text-3xl | semi-bold`
- **Headline**: `text-2xl | bold`
- **Body**: `text-base | leading-6`
- **Caption**: `text-sm | text-muted-foreground`

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 24px

### Border Radius
- **sm**: 4px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px

## User Flows

### Initial Frame Load & Game Selection
1. User opens Farcaster frame/Base MiniApp
2. App fetches active NFL games via API
3. Displays list of current games with basic score overview
4. User taps on specific game to view details
5. App fetches detailed stats and win probability for selected game
6. Visualizes score and win probability chart

### Real-time Update & Notification
1. User viewing game detail frame or app running in background
2. API data updates with score change or game event
3. App backend detects update
4. If user has notifications enabled for event/team, notification triggered
5. User receives push notification about game update
6. User can tap notification to open app/frame to relevant game

### Micro-transaction for Advanced Stats
1. User viewing game and wants advanced player metrics
2. User taps 'View Advanced Stats' button
3. App presents prompt for micro-transaction ($0.50)
4. User confirms transaction via Base Wallet
5. Upon successful transaction, advanced player stats displayed
6. Transaction logged and user gains access for limited time

## Business Model

### Type: Micro-transactions
### Pricing:
- **Core Features**: Free (live scores, basic win probability)
- **Advanced Stats**: $0.50 per game view
- **Historical Data**: $1 per game
- **Premium Features**: $2.99/month subscription

### Justification
Micro-transactions align with Base ecosystem's focus on small, frequent on-chain transactions and crypto-native users. Allows broad access to core features while monetizing deeper insights.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

Create a `.env.local` file with:

```env
# NFL API Configuration
NFL_API_KEY=your_api_key_here
NFL_API_BASE_URL=https://api.example-nfl.com/v1

# Base Network Configuration
BASE_RPC_URL=https://mainnet.base.org
BASE_CHAIN_ID=8453

# Notification Service
NOTIFICATION_WEBHOOK_URL=your_webhook_url_here
```

## Deployment

### Base Mini App Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel or your preferred hosting platform
3. Configure Base Mini App manifest
4. Register with Base ecosystem

### Farcaster Frame Configuration
1. Set up frame metadata in HTML head
2. Configure frame actions and callbacks
3. Test frame functionality in Farcaster

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add your feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

