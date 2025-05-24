import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AIAssistant from '@/components/AIAssistant';
import { 
  LayoutDashboard, 
  LineChart, 
  Wallet, 
  Settings, 
  Bell, 
  Globe, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Star,
  MessageSquare,
  Newspaper,
  ChevronDown,
  Search,
  Menu,
  ArrowLeft
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock trading data
const mockTradingData = {
  portfolioValue: '$125,430.50',
  dailyChange: '+2.5%',
  totalProfit: '+$12,430.50',
  openPositions: 8,
  watchlist: [
    { symbol: 'BTC/USD', price: '$45,230.50', change: '+3.2%' },
    { symbol: 'ETH/USD', price: '$3,245.75', change: '+1.8%' },
    { symbol: 'AAPL', price: '$175.25', change: '-0.5%' },
    { symbol: 'TSLA', price: '$245.80', change: '+2.1%' },
  ],
  recentTrades: [
    { id: 'TR-001', symbol: 'BTC/USD', type: 'Buy', amount: '0.5 BTC', price: '$44,500', time: '10:30 AM' },
    { id: 'TR-002', symbol: 'ETH/USD', type: 'Sell', amount: '2.5 ETH', price: '$3,200', time: '09:45 AM' },
    { id: 'TR-003', symbol: 'AAPL', type: 'Buy', amount: '10 shares', price: '$174.50', time: '09:30 AM' },
  ]
};

// Sample data for the chart
const chartData = [
  { time: '00:00', price: 43000 },
  { time: '04:00', price: 43500 },
  { time: '08:00', price: 43200 },
  { time: '12:00', price: 43800 },
  { time: '16:00', price: 44100 },
  { time: '20:00', price: 43900 },
  { time: '24:00', price: 44200 },
];

// Mock data with visible variation
const marketData = [
  { time: '09:00', price: 100 },
  { time: '10:00', price: 102 },
  { time: '11:00', price: 98 },
  { time: '12:00', price: 105 },
  { time: '13:00', price: 103 },
  { time: '14:00', price: 108 },
  { time: '15:00', price: 104 },
];

export default function Dashboard() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0F0E] text-white">
      <Head>
        <title>Dashboard | AI Trading Platform</title>
        <meta name="description" content="AI-powered trading dashboard" />
      </Head>

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-[#1A1D1C] border-r border-gray-800 flex flex-col items-center py-6">
        <div className="mb-8">
          <span className="text-2xl font-bold text-[#00C805]">AT</span>
        </div>
        <nav className="flex-1 flex flex-col items-center space-y-8">
          <button className="p-3 rounded-xl bg-[#00C805]/10 text-[#00C805] hover:bg-[#00C805]/20 transition-colors">
            <LayoutDashboard className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
            <LineChart className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
            <Wallet className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-20">
        {/* Top Navbar */}
        <nav className="h-16 bg-[#1A1D1C] border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Search markets..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C805] w-64"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <Globe className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <span className="text-sm font-medium text-[#00C805]">JD</span>
              </div>
              <span className="text-sm font-medium text-gray-300">John Doe</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Market Overview */}
            <div className="lg:col-span-2 bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Market Overview</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded-lg bg-[#00C805]/10 text-[#00C805] text-sm">1D</button>
                  <button className="px-3 py-1 rounded-lg text-gray-400 hover:text-white text-sm">1W</button>
                  <button className="px-3 py-1 rounded-lg text-gray-400 hover:text-white text-sm">1M</button>
                </div>
              </div>
              <div className="h-[300px] bg-gray-800/50 rounded-xl flex items-center justify-center">
                <ResponsiveContainer width="100%" height="90%">
                  <RechartsLineChart data={marketData}>
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ background: '#222', border: 'none', borderRadius: 8 }}
                      labelStyle={{ color: '#00C805' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#00C805"
                      strokeWidth={2}
                      dot={false}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Portfolio Snapshot */}
            <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Portfolio</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Balance</span>
                  <span className="text-xl font-semibold">$24,500.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">24h Change</span>
                  <span className="text-[#00C805] flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.5%
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">BTC</span>
                    <span className="text-[#00C805]">+1.2%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">ETH</span>
                    <span className="text-[#00C805]">+3.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">SOL</span>
                    <span className="text-red-500">-0.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="lg:col-span-2 bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">AI Insights</h2>
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#00C805] font-medium">BTC/USD</span>
                    <span className="text-gray-400 text-sm">2 hours ago</span>
                  </div>
                  <p className="text-gray-300">Potential breakout pattern detected. Consider monitoring resistance levels.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#00C805] font-medium">ETH/USD</span>
                    <span className="text-gray-400 text-sm">4 hours ago</span>
                  </div>
                  <p className="text-gray-300">Volume spike detected. Increased volatility expected in next 24 hours.</p>
                </div>
              </div>
            </div>

            {/* Watchlist */}
            <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Watchlist</h2>
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-[#00C805]">BTC</span>
                    <span className="text-gray-400">Bitcoin</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white">$43,250.00</div>
                    <div className="text-[#00C805] text-sm">+2.5%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-[#00C805]">ETH</span>
                    <span className="text-gray-400">Ethereum</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white">$2,850.00</div>
                    <div className="text-[#00C805] text-sm">+1.8%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade Panel */}
            <div className="lg:col-span-2 bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Trade</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Amount</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-[#00C805]"
                      placeholder="0.00"
                    />
                  </div>
                  <button className="w-full px-4 py-2 rounded-lg bg-[#00C805] text-white font-medium hover:bg-[#00B305] transition-colors">
                    Buy
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Price</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-[#00C805]"
                      placeholder="0.00"
                    />
                  </div>
                  <button className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">
                    Sell
                  </button>
                </div>
              </div>
            </div>

            {/* News Feed */}
            <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">News</h2>
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <Newspaper className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <h3 className="text-white font-medium mb-2">Bitcoin Surges Past $43,000</h3>
                  <p className="text-gray-400 text-sm">Market analysts predict continued growth...</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <h3 className="text-white font-medium mb-2">Ethereum 2.0 Update</h3>
                  <p className="text-gray-400 text-sm">Major network upgrade scheduled for next month...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Button */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 bg-[#00C805] hover:bg-[#00B305] text-white font-medium py-3 px-6 rounded-full shadow-lg flex items-center transition-all transform hover:scale-105"
      >
        <span className="mr-2">💬</span> AI Assistant
      </button>

      {/* AI Assistant Modal */}
      {isAssistantOpen && (
        <AIAssistant onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
  );
}