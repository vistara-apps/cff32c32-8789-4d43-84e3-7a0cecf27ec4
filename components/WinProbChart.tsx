'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { WinProbabilityData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WinProbChartProps {
  data: WinProbabilityData[];
  homeTeam: string;
  awayTeam: string;
  variant?: 'live';
  className?: string;
}

export function WinProbChart({ 
  data, 
  homeTeam, 
  awayTeam, 
  variant,
  className 
}: WinProbChartProps) {
  const isLive = variant === 'live';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-300 mb-2">
            Q{dataPoint.quarter} - {label}
          </p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-blue-400">{homeTeam}:</span>{' '}
              <span className="font-semibold">{dataPoint.homeWinProb}%</span>
            </p>
            <p className="text-sm">
              <span className="text-red-400">{awayTeam}:</span>{' '}
              <span className="font-semibold">{dataPoint.awayWinProb}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn('w-full h-64', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Win Probability
          {isLive && (
            <span className="ml-2 inline-flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1" />
              <span className="text-sm text-red-400">Live</span>
            </span>
          )}
        </h3>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: '#9CA3AF' }}
            formatter={(value) => value === 'homeWinProb' ? homeTeam : awayTeam}
          />
          <Line
            type="monotone"
            dataKey="homeWinProb"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#3B82F6' }}
          />
          <Line
            type="monotone"
            dataKey="awayWinProb"
            stroke="#EF4444"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#EF4444' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
