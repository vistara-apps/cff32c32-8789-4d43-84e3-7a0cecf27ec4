'use client';

import { useState } from 'react';
import { X, CreditCard, Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentFeature } from '@/lib/payments';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: PaymentFeature;
  gameId?: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  feature,
  gameId,
  onPaymentSuccess,
  onPaymentError
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const featureConfig = {
    advanced_stats: {
      title: 'Advanced Player Stats',
      description: 'Unlock detailed player statistics including passing, rushing, receiving, and defensive metrics',
      price: '$0.50',
      icon: CreditCard,
      color: 'text-blue-400'
    },
    historical_data: {
      title: 'Historical Game Data',
      description: 'Access complete historical game data, advanced analytics, and performance trends',
      price: '$1.00',
      icon: Clock,
      color: 'text-green-400'
    },
    premium_notifications: {
      title: 'Premium Notifications',
      description: 'Receive real-time alerts for touchdowns, turnovers, and important game events',
      price: '$2.50',
      icon: Zap,
      color: 'text-purple-400'
    }
  };

  const config = featureConfig[feature];
  const IconComponent = config.icon;

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Import payment functions dynamically to avoid SSR issues
      const { initiatePayment, verifyPayment } = await import('@/lib/payments');

      // For demo purposes, simulate a payment flow
      // In production, this would redirect to Coinbase Commerce or handle wallet connection

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment for demo
      setPaymentStatus('success');

      setTimeout(() => {
        onPaymentSuccess?.();
        onClose();
      }, 2000);

    } catch (error) {
      setPaymentStatus('error');
      const message = error instanceof Error ? error.message : 'Payment failed';
      setErrorMessage(message);
      onPaymentError?.(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (paymentStatus === 'processing') return; // Don't allow closing during processing
    setPaymentStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative border border-gray-700">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={paymentStatus === 'processing'}
          className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-md transition-colors duration-200 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className={cn("p-3 rounded-full bg-gray-700", config.color)}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{config.title}</h3>
            <p className="text-sm text-gray-400">{config.price}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          {config.description}
        </p>

        {/* Game-specific info */}
        {gameId && (
          <div className="bg-gray-700/50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-300">
              This purchase grants access to premium features for the current game.
            </p>
          </div>
        )}

        {/* Status messages */}
        {paymentStatus === 'success' && (
          <div className="flex items-center space-x-2 text-green-400 mb-4 p-3 bg-green-400/10 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Payment successful! Access granted.</span>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="flex items-center space-x-2 text-red-400 mb-4 p-3 bg-red-400/10 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{errorMessage || 'Payment failed. Please try again.'}</span>
          </div>
        )}

        {/* Payment button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing || paymentStatus === 'success'}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2",
            paymentStatus === 'success'
              ? "bg-green-600 text-white cursor-default"
              : paymentStatus === 'processing'
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-primary text-black hover:opacity-90"
          )}
        >
          {paymentStatus === 'processing' ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : paymentStatus === 'success' ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Access Granted</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Pay {config.price} with USDC</span>
            </>
          )}
        </button>

        {/* Footer info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Payments processed securely via Coinbase Commerce on Base Network
          </p>
          {feature !== 'premium_notifications' && (
            <p className="text-xs text-gray-500 mt-1">
              Access expires in 24 hours
            </p>
          )}
          {feature === 'premium_notifications' && (
            <p className="text-xs text-gray-500 mt-1">
              Access expires in 7 days
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

