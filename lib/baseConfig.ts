// Base network configuration
export const BASE_CONFIG = {
  chainId: 8453,
  chainName: 'Base',
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org'],
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
}

// Micro-transaction pricing (in wei)
export const PRICING = {
  ADVANCED_STATS: '50000000000000000', // 0.05 ETH = $0.50 at $2000/ETH
  HISTORICAL_DATA: '100000000000000000', // 0.1 ETH = $1.00
  PREMIUM_MONTHLY: '2990000000000000000', // 2.99 ETH = $2.99/month
}

// Contract addresses (placeholder - to be deployed)
export const CONTRACTS = {
  PAYMENT_CONTRACT: '0x0000000000000000000000000000000000000000',
  NOTIFICATION_CONTRACT: '0x0000000000000000000000000000000000000000',
}

// API endpoints
export const API_ENDPOINTS = {
  NFL_DATA: process.env.NFL_API_BASE_URL || 'https://api.example-nfl.com/v1',
  NOTIFICATIONS: process.env.NOTIFICATION_WEBHOOK_URL || 'https://api.base.org/notifications',
}

// Feature flags
export const FEATURES = {
  ENABLE_MICRO_TRANSACTIONS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ADVANCED_STATS: true,
  ENABLE_HISTORICAL_DATA: false, // Coming soon
}

