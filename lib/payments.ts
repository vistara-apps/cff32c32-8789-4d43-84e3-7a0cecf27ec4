import { PaymentTransaction, ApiResponse } from './types';

// Coinbase Commerce API configuration
const COINBASE_COMMERCE_API_URL = 'https://api.commerce.coinbase.com';
const COINBASE_COMMERCE_API_KEY = process.env.COINBASE_COMMERCE_API_KEY;

// Base network configuration
const BASE_CHAIN_ID = 8453; // Base mainnet
const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // Base USDC

// Payment amounts (in USDC - 6 decimals)
const PAYMENT_AMOUNTS = {
  advanced_stats: 50000, // $0.50 = 50,000 USDC (6 decimals)
  historical_data: 100000, // $1.00 = 100,000 USDC (6 decimals)
  premium_notifications: 250000, // $2.50 = 250,000 USDC (6 decimals)
} as const;

// Transaction status types
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// Payment feature types
export type PaymentFeature = keyof typeof PAYMENT_AMOUNTS;

/**
 * Initialize a micro-transaction for premium features
 */
export async function initiatePayment(
  userId: string,
  feature: PaymentFeature,
  gameId?: string
): Promise<{ chargeId: string; paymentUrl: string; amount: number }> {
  const amount = PAYMENT_AMOUNTS[feature];

  try {
    // Create Coinbase Commerce charge
    const chargeResponse = await createCoinbaseCharge(userId, feature, amount, gameId);

    if (chargeResponse.success && chargeResponse.data) {
      // Store transaction record
      await storeTransaction({
        transactionId: chargeResponse.data.id,
        userId,
        amount: amount / 1000000, // Convert from USDC units to dollars
        currency: 'USDC',
        feature,
        status: 'pending',
        timestamp: new Date().toISOString()
      });

      return {
        chargeId: chargeResponse.data.id,
        paymentUrl: chargeResponse.data.hosted_url,
        amount: amount / 1000000
      };
    }

    throw new Error('Failed to create payment charge');

  } catch (error) {
    console.error('Payment initiation error:', error);
    throw new Error('Unable to process payment request');
  }
}

/**
 * Verify payment completion
 */
export async function verifyPayment(chargeId: string): Promise<boolean> {
  try {
    const chargeResponse = await getCoinbaseCharge(chargeId);

    if (chargeResponse.success && chargeResponse.data) {
      const charge = chargeResponse.data;
      const isPaid = charge.timeline.some((event: any) =>
        event.status === 'COMPLETED' || event.status === 'RESOLVED'
      );

      if (isPaid) {
        // Update transaction status
        await updateTransactionStatus(chargeId, 'completed');
        return true;
      }

      // Check if payment failed
      const hasFailed = charge.timeline.some((event: any) =>
        event.status === 'FAILED' || event.status === 'EXPIRED' || event.status === 'CANCELLED'
      );

      if (hasFailed) {
        await updateTransactionStatus(chargeId, 'failed');
      }
    }

    return false;

  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
}

/**
 * Check if user has access to premium feature
 */
export async function checkPremiumAccess(
  userId: string,
  feature: PaymentFeature,
  gameId?: string
): Promise<{ hasAccess: boolean; expiresAt?: string }> {
  try {
    // Check for recent successful transactions for this feature
    const recentTransactions = await getUserTransactions(userId, feature, 24); // Last 24 hours

    const hasValidTransaction = recentTransactions.some(tx =>
      tx.status === 'completed' &&
      (!gameId || tx.gameId === gameId) // If gameId specified, check game-specific access
    );

    if (hasValidTransaction) {
      // Access expires after 24 hours for stats, 7 days for notifications
      const expiryHours = feature === 'premium_notifications' ? 168 : 24;
      const expiresAt = new Date(Date.now() + (expiryHours * 60 * 60 * 1000)).toISOString();

      return { hasAccess: true, expiresAt };
    }

    return { hasAccess: false };

  } catch (error) {
    console.error('Premium access check error:', error);
    return { hasAccess: false };
  }
}

/**
 * Get user's transaction history
 */
export async function getUserTransactions(
  userId: string,
  feature?: PaymentFeature,
  hoursBack: number = 168 // 7 days default
): Promise<PaymentTransaction[]> {
  try {
    // In a real implementation, this would query a database
    // For now, return mock data
    const mockTransactions: PaymentTransaction[] = [
      {
        transactionId: 'mock_tx_1',
        userId,
        amount: 0.5,
        currency: 'USDC',
        feature: 'advanced_stats',
        status: 'completed',
        timestamp: new Date(Date.now() - (2 * 60 * 60 * 1000)).toISOString(), // 2 hours ago
        txHash: '0x1234567890abcdef'
      }
    ];

    return mockTransactions.filter(tx => {
      if (feature && tx.feature !== feature) return false;

      const txTime = new Date(tx.timestamp).getTime();
      const cutoffTime = Date.now() - (hoursBack * 60 * 60 * 1000);

      return txTime > cutoffTime;
    });

  } catch (error) {
    console.error('Error fetching user transactions:', error);
    return [];
  }
}

// Coinbase Commerce API functions

async function createCoinbaseCharge(
  userId: string,
  feature: PaymentFeature,
  amount: number,
  gameId?: string
): Promise<ApiResponse<any>> {
  const chargeData = {
    name: getFeatureDisplayName(feature),
    description: getFeatureDescription(feature, gameId),
    pricing_type: 'fixed_price',
    local_price: {
      amount: (amount / 1000000).toString(), // Convert to dollars
      currency: 'USD'
    },
    metadata: {
      userId,
      feature,
      gameId,
      timestamp: new Date().toISOString()
    }
  };

  return apiRequest(`${COINBASE_COMMERCE_API_URL}/charges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CC-Api-Key': COINBASE_COMMERCE_API_KEY || '',
    },
    body: JSON.stringify(chargeData)
  });
}

async function getCoinbaseCharge(chargeId: string): Promise<ApiResponse<any>> {
  return apiRequest(`${COINBASE_COMMERCE_API_URL}/charges/${chargeId}`, {
    headers: {
      'X-CC-Api-Key': COINBASE_COMMERCE_API_KEY || '',
    }
  });
}

// Database/storage functions (mock implementations)

async function storeTransaction(transaction: PaymentTransaction): Promise<void> {
  // In a real implementation, this would store in a database
  console.log('Storing transaction:', transaction);

  // Mock storage - in production, use a database
  if (typeof window !== 'undefined') {
    const transactions = JSON.parse(localStorage.getItem('farrow_transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('farrow_transactions', JSON.stringify(transactions));
  }
}

async function updateTransactionStatus(
  transactionId: string,
  status: TransactionStatus
): Promise<void> {
  // In a real implementation, this would update the database
  console.log('Updating transaction status:', transactionId, status);

  // Mock update
  if (typeof window !== 'undefined') {
    const transactions = JSON.parse(localStorage.getItem('farrow_transactions') || '[]');
    const index = transactions.findIndex((tx: PaymentTransaction) => tx.transactionId === transactionId);
    if (index !== -1) {
      transactions[index].status = status;
      localStorage.setItem('farrow_transactions', JSON.stringify(transactions));
    }
  }
}

// Utility functions

function getFeatureDisplayName(feature: PaymentFeature): string {
  const names = {
    advanced_stats: 'Advanced Player Stats',
    historical_data: 'Historical Game Data',
    premium_notifications: 'Premium Notifications'
  };
  return names[feature];
}

function getFeatureDescription(feature: PaymentFeature, gameId?: string): string {
  const baseDescriptions = {
    advanced_stats: 'Unlock detailed player statistics including passing, rushing, and defensive metrics',
    historical_data: 'Access complete historical game data and advanced analytics',
    premium_notifications: 'Receive real-time alerts for touchdowns, turnovers, and game events'
  };

  const description = baseDescriptions[feature];
  return gameId ? `${description} for this game` : description;
}

// Generic API request function
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
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
      error: error instanceof Error ? error.message : 'Unknown API error',
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substr(2, 9)
    };
  }
}

// Export payment utilities
export { PAYMENT_AMOUNTS };
export const getPaymentAmount = (feature: PaymentFeature) => PAYMENT_AMOUNTS[feature] / 1000000;

