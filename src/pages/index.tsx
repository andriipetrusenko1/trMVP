import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AIAssistant from '@/components/AIAssistant';

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

      {/* Hero Section with Introduction */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Introduction Text */}
            <div className="max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Hi, I'm Andriia
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                A full-stack developer with 6+ years of experience building advanced, AI-powered platforms. 
                I'm new to Upwork but bring deep expertise in crafting smart, reliable web applications.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/dashboard" 
                className="px-8 py-4 rounded-full text-lg font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105"
              >
                View My Work
              </Link>
              <Link 
                href="#contact" 
                className="px-8 py-4 rounded-full text-lg font-medium text-white border border-[#00C805] hover:bg-[#00C805]/10 transition-all transform hover:scale-105"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F0E] to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
      </section>

      {/* Market Stats Section */}
      <section className="py-24 bg-[#1A1D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <svg className="h-10 w-10 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-[#00C805]">$2.5B+</p>
              <p className="mt-4 text-xl text-gray-400">Trading Volume</p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <svg className="h-10 w-10 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-[#00C805]">50K+</p>
              <p className="mt-4 text-xl text-gray-400">Active Traders</p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                <svg className="h-10 w-10 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-[#00C805]">99.9%</p>
              <p className="mt-4 text-xl text-gray-400">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-24 bg-[#0C0F0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Why Choose Our Platform</h2>
            <p className="mt-4 text-xl text-gray-400">Experience the power of AI-driven trading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                    <svg className="h-6 w-6 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Real-Time Trading</h3>
                  <p className="mt-2 text-gray-400">Execute trades instantly with our advanced trading engine and real-time market data.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-[#00C805]/20 flex items-center justify-center">
                    <svg className="h-6 w-6 text-[#00C805]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Secure Platform</h3>
                  <p className="mt-2 text-gray-400">Trade with confidence using our secure platform with advanced encryption and protection.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-[#0C0F0E] to-[#1A1D1C] rounded-xl mb-6 p-6 flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Trading Chart Line */}
                  <path
                    d="M50 150 C 100 50, 150 180, 200 100 C 250 20, 300 150, 350 80"
                    stroke="#00C805"
                    strokeWidth="3"
                    fill="none"
                  />
                  
                  {/* AI Brain with Circuit Pattern */}
                  <g transform="translate(200, 100)">
                    <circle cx="0" cy="0" r="40" fill="#00C805" fillOpacity="0.1" />
                    <path
                      d="M-20 -20 L20 -20 M-20 0 L20 0 M-20 20 L20 20 M0 -20 L0 20"
                      stroke="#00C805"
                      strokeWidth="2"
                    />
                    <circle cx="0" cy="0" r="8" fill="#00C805" />
                    
                    {/* Circuit Lines */}
                    <path
                      d="M-30 -30 L-20 -20 M30 -30 L20 -20 M-30 30 L-20 20 M30 30 L20 20"
                      stroke="#00C805"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                  </g>
                  
                  {/* Data Points */}
                  <g>
                    <circle cx="100" cy="120" r="4" fill="#00C805" />
                    <circle cx="150" cy="80" r="4" fill="#00C805" />
                    <circle cx="200" cy="130" r="4" fill="#00C805" />
                    <circle cx="250" cy="70" r="4" fill="#00C805" />
                    <circle cx="300" cy="110" r="4" fill="#00C805" />
                  </g>
                  
                  {/* Connection Lines */}
                  <g stroke="#00C805" strokeWidth="1.5" strokeOpacity="0.4">
                    <line x1="100" y1="120" x2="150" y2="80" />
                    <line x1="150" y1="80" x2="200" y2="130" />
                    <line x1="200" y1="130" x2="250" y2="70" />
                    <line x1="250" y1="70" x2="300" y2="110" />
                  </g>
                  
                  {/* Prediction Arrow */}
                  <g transform="translate(320, 90)">
                    <path
                      d="M0 0 L25 0 L20 -5 M25 0 L20 5"
                      stroke="#00C805"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  </g>
                  
                  {/* Glowing Effect */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  {/* Apply glow to main elements */}
                  <g filter="url(#glow)">
                    <path
                      d="M50 150 C 100 50, 150 180, 200 100 C 250 20, 300 150, 350 80"
                      stroke="#00C805"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle cx="200" cy="100" r="8" fill="#00C805" />
                  </g>
                </svg>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-[#00C805] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-24 bg-[#1A1D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">AI-Powered Trading</h2>
            <p className="mt-4 text-xl text-gray-400">Let our AI help you make better trading decisions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI-Powered Analysis Card */}
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800 hover:border-[#00C805]/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00C805] to-[#00B305] text-white flex items-center justify-center mb-6">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-400">Our AI analyzes market patterns to identify trading opportunities and provide actionable insights.</p>
            </div>

            {/* Secure Platform Card */}
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800 hover:border-[#00C805]/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00C805] to-[#00B305] text-white flex items-center justify-center mb-6">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure Platform</h3>
              <p className="text-gray-400">Trade with confidence using our secure platform with advanced encryption and protection.</p>
            </div>

            {/* Market Predictions Card */}
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800 hover:border-[#00C805]/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00C805] to-[#00B305] text-white flex items-center justify-center mb-6">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Market Predictions</h3>
              <p className="text-gray-400">Our AI analyzes market patterns to predict potential price movements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#0C0F0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">What Our Traders Say</h2>
            <p className="mt-4 text-xl text-gray-400">Join thousands of satisfied traders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ... (testimonials) ... */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1A1D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-400 mb-12">Join our platform today and experience the future of trading</p>
          <Link href="/dashboard" className="px-8 py-4 rounded-full text-lg font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105">
            Start Trading Now
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