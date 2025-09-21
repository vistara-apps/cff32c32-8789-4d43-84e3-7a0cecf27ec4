'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface WinProbChartProps {
  data: Array<{
    time: string
    homeWinProb: number
    awayWinProb: number
  }>
  homeTeam: string
  awayTeam: string
}

export function WinProbChart({ data, homeTeam, awayTeam }: WinProbChartProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Win Probability</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{ value: 'Win %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value.toFixed(1)}%`,
                name === 'homeWinProb' ? homeTeam : awayTeam
              ]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="homeWinProb"
              stroke="#3B82F6"
              strokeWidth={2}
              name="homeWinProb"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="awayWinProb"
              stroke="#EF4444"
              strokeWidth={2}
              name="awayWinProb"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium">{homeTeam}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm font-medium">{awayTeam}</span>
        </div>
      </div>
    </div>
  )
}

