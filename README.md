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

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

## License

MIT License - see LICENSE file for details.
