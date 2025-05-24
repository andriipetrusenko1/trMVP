import { useState } from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  Wallet, 
  Settings,
  Bell,
  Globe,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  MessageSquare
} from 'lucide-react';
import AIAssistant from '@/components/AIAssistant';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for charts
const marketData = [
  { time: '00:00', price: 4000 },
  { time: '04:00', price: 4200 },
  { time: '08:00', price: 4100 },
  { time: '12:00', price: 4300 },
  { time: '16:00', price: 4500 },
  { time: '20:00', price: 4400 },
];

export default function Dashboard() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0F0E] text-white">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-[#1A1D1C] border-r border-gray-800 flex flex-col items-center py-6">
        <div className="space-y-8">
          <button className="p-3 rounded-xl bg-[#00C805] text-white">
            <LayoutDashboard className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-[#2A2D2C] transition-colors">
            <LineChart className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-[#2A2D2C] transition-colors">
            <Wallet className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-[#2A2D2C] transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-20 p-6">
        {/* Top Navbar */}
        <nav className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search markets..."
                className="pl-10 pr-4 py-2 bg-[#1A1D1C] border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00C805]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <Globe className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#00C805] flex items-center justify-center">
              <span className="text-white font-medium">A</span>
            </div>
          </div>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Market Overview Card */}
          <div className="col-span-2 bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Market Overview</h2>
              <div className="flex items-center space-x-2">
                <span className="text-[#00C805]">+2.5%</span>
                <TrendingUp className="w-5 h-5 text-[#00C805]" />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D2C" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1D1C',
                      border: '1px solid #2A2D2C',
                      borderRadius: '0.5rem'
                    }}
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

          {/* Portfolio Snapshot Card */}
          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Portfolio Snapshot</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Balance</span>
                <span className="text-xl font-semibold">$24,500.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Change</span>
                <span className="text-[#00C805]">+$1,200.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Profit</span>
                <span className="text-[#00C805]">+12.5%</span>
              </div>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">AI Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#2A2D2C] rounded-xl">
                <p className="text-gray-300">BTC showing strong momentum. Consider increasing position size.</p>
              </div>
              <div className="p-4 bg-[#2A2D2C] rounded-xl">
                <p className="text-gray-300">ETH volatility expected to increase. Set stop-loss orders.</p>
              </div>
            </div>
          </div>

          {/* Watchlist Card */}
          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Watchlist</h2>
              <button className="p-2 text-gray-400 hover:text-white">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">BTC/USD</p>
                  <p className="text-sm text-gray-400">Bitcoin</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$45,000</p>
                  <p className="text-sm text-[#00C805]">+2.5%</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">ETH/USD</p>
                  <p className="text-sm text-gray-400">Ethereum</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$3,200</p>
                  <p className="text-sm text-[#00C805]">+1.8%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Action Card */}
          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Trade</h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button className="flex-1 py-2 bg-[#00C805] text-white rounded-xl font-medium">
                  Buy
                </button>
                <button className="flex-1 py-2 bg-[#2A2D2C] text-white rounded-xl font-medium">
                  Sell
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-[#2A2D2C] border border-gray-800 rounded-xl text-white"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-[#2A2D2C] border border-gray-800 rounded-xl text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* News Feed Card */}
          <div className="bg-[#1A1D1C] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">News Feed</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#2A2D2C] rounded-xl">
                <p className="text-gray-300">Bitcoin breaks $45,000 as market sentiment improves</p>
                <p className="text-sm text-gray-400 mt-2">2 hours ago</p>
              </div>
              <div className="p-4 bg-[#2A2D2C] rounded-xl">
                <p className="text-gray-300">Ethereum 2.0 upgrade scheduled for next month</p>
                <p className="text-sm text-gray-400 mt-2">4 hours ago</p>
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
        <MessageSquare className="w-5 h-5 mr-2" />
        AI Assistant
      </button>

      {/* AI Assistant Modal */}
      {isAssistantOpen && (
        <AIAssistant onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
  );
}