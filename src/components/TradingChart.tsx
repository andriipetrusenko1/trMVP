import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data for the chart
const data = [
  { time: '00:00', price: 45000 },
  { time: '04:00', price: 46500 },
  { time: '08:00', price: 45800 },
  { time: '12:00', price: 47200 },
  { time: '16:00', price: 46800 },
  { time: '20:00', price: 47500 },
  { time: '24:00', price: 48200 },
];

export default function TradingChart() {
  const [activeTimeframe, setActiveTimeframe] = useState('1D');

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-white">BTC/USD</h3>
          <span className="text-[#00C805] text-sm">+2.5%</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTimeframe('1D')}
            className={`px-3 py-1 rounded-lg text-sm ${
              activeTimeframe === '1D' 
                ? 'bg-[#00C805] text-white' 
                : 'bg-[#1A1D1C] text-gray-400'
            }`}
          >
            1D
          </button>
          <button 
            onClick={() => setActiveTimeframe('1W')}
            className={`px-3 py-1 rounded-lg text-sm ${
              activeTimeframe === '1W' 
                ? 'bg-[#00C805] text-white' 
                : 'bg-[#1A1D1C] text-gray-400'
            }`}
          >
            1W
          </button>
          <button 
            onClick={() => setActiveTimeframe('1M')}
            className={`px-3 py-1 rounded-lg text-sm ${
              activeTimeframe === '1M' 
                ? 'bg-[#00C805] text-white' 
                : 'bg-[#1A1D1C] text-gray-400'
            }`}
          >
            1M
          </button>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C805" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00C805" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#2A2D2C" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1D1C',
                border: '1px solid #2A2D2C',
                borderRadius: '8px',
                color: '#fff'
              }}
              labelStyle={{ color: '#6B7280' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00C805"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Price Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-[#0C0F0E] rounded-xl p-4">
          <p className="text-gray-400 text-sm">Open</p>
          <p className="text-white font-medium mt-1">$45,000</p>
        </div>
        <div className="bg-[#0C0F0E] rounded-xl p-4">
          <p className="text-gray-400 text-sm">High</p>
          <p className="text-white font-medium mt-1">$48,200</p>
        </div>
        <div className="bg-[#0C0F0E] rounded-xl p-4">
          <p className="text-gray-400 text-sm">Low</p>
          <p className="text-white font-medium mt-1">$45,000</p>
        </div>
      </div>
    </div>
  );
} 