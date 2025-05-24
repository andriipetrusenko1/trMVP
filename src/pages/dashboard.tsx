import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AIAssistant from '@/components/AIAssistant';
import TradingChart from '@/components/TradingChart';

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

export default function Dashboard() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0F0E] text-white">
      <Head>
        <title>Trading Dashboard | AI Trading Platform</title>
        <meta name="description" content="AI-powered trading dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-[#0C0F0E]/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#00C805]">
                AI Trading Platform
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-full text-sm font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Portfolio Overview */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Portfolio Overview</h1>
          <p className="text-gray-400">Welcome back! Here's your trading summary</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800 hover:border-[#00C805] transition-all transform hover:scale-105 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Portfolio Value</p>
                <p className="text-2xl font-bold text-white mt-1">{mockTradingData.portfolioValue}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-[#00C805] text-sm font-medium">{mockTradingData.dailyChange}</span>
              <span className="text-gray-400 text-sm ml-2">Today</span>
            </div>
          </div>

          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800 hover:border-[#00C805] transition-all transform hover:scale-105 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Profit</p>
                <p className="text-2xl font-bold text-white mt-1">{mockTradingData.totalProfit}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-[#00C805] text-sm font-medium">+15.2%</span>
              <span className="text-gray-400 text-sm ml-2">All Time</span>
            </div>
          </div>

          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800 hover:border-[#00C805] transition-all transform hover:scale-105 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Open Positions</p>
                <p className="text-2xl font-bold text-white mt-1">{mockTradingData.openPositions}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-[#00C805] text-sm font-medium">Active</span>
            </div>
          </div>

          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800 hover:border-[#00C805] transition-all transform hover:scale-105 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">AI Predictions</p>
                <p className="text-2xl font-bold text-white mt-1">85%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-[#00C805] text-sm font-medium">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Chart */}
          <div className="lg:col-span-2">
            <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <TradingChart />
            </div>
          </div>

          {/* Watchlist */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-6">Watchlist</h2>
              <div className="space-y-4">
                {mockTradingData.watchlist.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0C0F0E] rounded-xl hover:bg-[#0C0F0E]/80 transition-colors">
                    <div>
                      <p className="text-white font-medium">{item.symbol}</p>
                      <p className="text-gray-400 text-sm">{item.price}</p>
                    </div>
                    <span className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-[#00C805]' : 'text-red-500'}`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="mt-8">
          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Trades</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {mockTradingData.recentTrades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-[#0C0F0E] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{trade.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{trade.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trade.type === 'Buy' ? 'bg-[#00C805]/20 text-[#00C805]' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{trade.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{trade.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{trade.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="bg-[#1A1D1C] hover:bg-[#00C805]/10 border border-gray-800 rounded-xl p-4 flex items-center space-x-3 transition-all transform hover:scale-105">
            <div className="bg-[#00C805] rounded-lg p-2">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-white font-medium">New Trade</span>
          </button>
          <button className="bg-[#1A1D1C] hover:bg-[#00C805]/10 border border-gray-800 rounded-xl p-4 flex items-center space-x-3 transition-all transform hover:scale-105">
            <div className="bg-[#00C805] rounded-lg p-2">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-white font-medium">Generate Report</span>
          </button>
          <button className="bg-[#1A1D1C] hover:bg-[#00C805]/10 border border-gray-800 rounded-xl p-4 flex items-center space-x-3 transition-all transform hover:scale-105">
            <div className="bg-[#00C805] rounded-lg p-2">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-white font-medium">View Analytics</span>
          </button>
        </div>

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
      </main>
    </div>
  );
}