'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FrameHeader } from '@/components/FrameHeader';
import { Bell, Shield, Palette, Info } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    scoreUpdates: true,
    gameEvents: true,
    favoriteTeamsOnly: false
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <FrameHeader 
        title="Settings" 
        showBack={true}
        onBack={() => router.back()}
      />
      
      <main className="container max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Notifications */}
        <div className="card p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Score Updates</div>
                <div className="text-sm text-gray-400">Get notified when scores change</div>
              </div>
              <button
                onClick={() => handleNotificationChange('scoreUpdates')}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  notifications.scoreUpdates ? 'bg-primary' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  notifications.scoreUpdates ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Game Events</div>
                <div className="text-sm text-gray-400">Touchdowns, turnovers, etc.</div>
              </div>
              <button
                onClick={() => handleNotificationChange('gameEvents')}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  notifications.gameEvents ? 'bg-primary' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  notifications.gameEvents ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Favorite Teams Only</div>
                <div className="text-sm text-gray-400">Only notify for your teams</div>
              </div>
              <button
                onClick={() => handleNotificationChange('favoriteTeamsOnly')}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  notifications.favoriteTeamsOnly ? 'bg-primary' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  notifications.favoriteTeamsOnly ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="card p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Privacy</h3>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded-md transition-colors duration-200">
              <div className="font-medium text-white">Data Usage</div>
              <div className="text-sm text-gray-400">Manage your data preferences</div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded-md transition-colors duration-200">
              <div className="font-medium text-white">Clear Cache</div>
              <div className="text-sm text-gray-400">Clear stored game data</div>
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="card p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Palette className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Appearance</h3>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded-md transition-colors duration-200">
              <div className="font-medium text-white">Theme</div>
              <div className="text-sm text-gray-400">Dark mode (default)</div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded-md transition-colors duration-200">
              <div className="font-medium text-white">Team Colors</div>
              <div className="text-sm text-gray-400">Show team colors in scores</div>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="card p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Info className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">About</h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3">
              <div className="font-medium text-white">Farrow Score</div>
              <div className="text-sm text-gray-400">Version 1.0.0</div>
            </div>
            
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded-md transition-colors duration-200">
              <div className="font-medium text-white">Terms of Service</div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded-md transition-colors duration-200">
              <div className="font-medium text-white">Privacy Policy</div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            Powered by Base • Built with ❤️ for NFL fans
          </p>
        </div>
      </main>
    </div>
  );
}
