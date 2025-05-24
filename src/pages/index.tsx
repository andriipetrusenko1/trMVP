import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AIAssistant from '@/components/AIAssistant';
import { ArrowRight, TrendingUp, BarChart3, Shield, Zap } from 'lucide-react';

export default function Home() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0F0E] text-white">
      <Head>
        <title>AI Trading Platform | Smart Trading Made Simple</title>
        <meta name="description" content="AI-powered trading platform for smart and efficient trading" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-[#0C0F0E]/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#00C805]">AI Trading Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-full text-sm font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105">
                Start Trading
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Developer Introduction Section */}
      <section className="py-24 bg-[#0C0F0E]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Hi, I'm Andriia
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            A full-stack developer with 6+ years of experience building advanced, AI-powered platforms. I'm new to Upwork but bring deep expertise in crafting smart, reliable web applications.
          </p>
        </div>
      </section>

      {/* Trading Platform Hero Section */}
      <section className="py-24 bg-[#1A1D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Experience the Future of Trading
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Our AI-powered platform helps you make smarter trading decisions with real-time market analysis and predictive insights.
            </p>
            <Link href="/dashboard" className="px-8 py-4 rounded-full text-lg font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105 inline-flex items-center">
              Start Trading Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Market Stats Section */}
      <section className="py-24 bg-[#0C0F0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-[#00C805]" />
              </div>
              <p className="text-4xl font-bold text-[#00C805]">$2.5B+</p>
              <p className="mt-4 text-xl text-gray-400">Trading Volume</p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <BarChart3 className="h-10 w-10 text-[#00C805]" />
              </div>
              <p className="text-4xl font-bold text-[#00C805]">50K+</p>
              <p className="mt-4 text-xl text-gray-400">Active Traders</p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <Shield className="h-10 w-10 text-[#00C805]" />
              </div>
              <p className="text-4xl font-bold text-[#00C805]">99.9%</p>
              <p className="mt-4 text-xl text-gray-400">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#1A1D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Why Choose Our Platform</h2>
            <p className="mt-4 text-xl text-gray-400">Experience the power of AI-driven trading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800">
              <div className="w-14 h-14 rounded-full bg-[#00C805]/20 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-[#00C805]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real-Time Analysis</h3>
              <p className="text-gray-400">Get instant market insights and trading signals powered by advanced AI algorithms.</p>
            </div>
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800">
              <div className="w-14 h-14 rounded-full bg-[#00C805]/20 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-[#00C805]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Predictions</h3>
              <p className="text-gray-400">Our AI analyzes market patterns to predict potential price movements and opportunities.</p>
            </div>
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800">
              <div className="w-14 h-14 rounded-full bg-[#00C805]/20 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-[#00C805]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure Trading</h3>
              <p className="text-gray-400">Trade with confidence using our secure platform with advanced encryption and protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0C0F0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-400 mb-12">Join our platform today and experience the future of trading</p>
          <Link href="/dashboard" className="px-8 py-4 rounded-full text-lg font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105 inline-flex items-center">
            Start Trading Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Modern AI Assistant Button */}
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