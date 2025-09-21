import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Farrow Score - NFL Real-time Scores & Win Probabilities',
  description: 'Real-time NFL scores and win probability charts powered by Base. Stay updated with live game data and advanced analytics.',
  keywords: ['NFL', 'football', 'scores', 'win probability', 'real-time', 'Base', 'Farcaster'],
  authors: [{ name: 'Farrow Score Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#00338D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta property="og:title" content="Farrow Score - NFL Real-time Scores" />
        <meta property="og:description" content="Real-time NFL scores and win probabilities powered by Base" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/frame-image.png" />
        <meta property="fc:frame:button:1" content="View Live Scores" />
        <meta property="fc:frame:button:2" content="Win Probabilities" />
        <meta property="fc:frame:post_url" content="/api/frame" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

