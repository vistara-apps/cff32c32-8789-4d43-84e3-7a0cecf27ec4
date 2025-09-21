'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-danger" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Something went wrong!
          </h2>
          <p className="text-gray-400">
            We encountered an error while loading the NFL scores. Please try again.
          </p>
        </div>
        
        <button
          onClick={reset}
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try again</span>
        </button>
      </div>
    </div>
  );
}
