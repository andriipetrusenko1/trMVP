import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AIAssistant from '@/components/AIAssistant';
import { ArrowRight, Code, Cpu, Shield, Zap, TrendingUp, BarChart3 } from 'lucide-react';

export default function Home() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0F0E] text-white">
      <Head>
        <title>Andriia | Full-Stack Developer</title>
        <meta name="description" content="Full-stack developer with 6+ years of experience building AI-powered platforms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-[#0C0F0E]/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#00C805]">Andriia.dev</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#about" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#projects" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="px-4 py-2 rounded-full text-sm font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Introduction and SVG */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C0F0E] via-[#1A1D1C] to-[#0C0F0E]" />
        {/* Decorative SVG */}
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-30">
          <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="500" cy="400" rx="300" ry="400" fill="#00C805" fillOpacity="0.08"/>
            <ellipse cx="400" cy="300" rx="200" ry="250" fill="#00C805" fillOpacity="0.12"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold">
                  <span className="block text-white">Hi, I'm</span>
                  <span className="block text-[#00C805]">Andriia</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  A full-stack developer with 6+ years of experience building advanced, AI-powered platforms. I'm new to Upwork but bring deep expertise in crafting smart, reliable web applications.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#projects" className="px-8 py-4 rounded-full text-lg font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105 flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="#contact" className="px-8 py-4 rounded-full text-lg font-medium text-white border border-gray-700 hover:border-gray-600 transition-colors">
                  Contact Me
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300">React</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300">Node.js</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300">AI/ML</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300">TypeScript</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300">Next.js</span>
              </div>
            </div>
            {/* SVG Illustration */}
            <div className="flex justify-center items-center">
              <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="170" cy="170" r="170" fill="#00C805" fillOpacity="0.08"/>
                <rect x="60" y="120" width="220" height="120" rx="24" fill="#23272b"/>
                <rect x="80" y="140" width="60" height="20" rx="6" fill="#00C805" fillOpacity="0.7"/>
                <rect x="80" y="170" width="180" height="12" rx="6" fill="#00C805" fillOpacity="0.2"/>
                <rect x="80" y="190" width="120" height="12" rx="6" fill="#00C805" fillOpacity="0.2"/>
                <rect x="80" y="210" width="100" height="12" rx="6" fill="#00C805" fillOpacity="0.2"/>
                <BarChart3 x={200} y={150} className="text-[#00C805]" width={40} height={40} />
                <TrendingUp x={240} y={200} className="text-[#00C805]" width={40} height={40} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-[#1A1D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">My Expertise</h2>
            <p className="mt-4 text-xl text-gray-400">Building modern, scalable applications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800 hover:border-[#00C805] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#00C805]/20 flex items-center justify-center mb-6">
                <Code className="h-7 w-7 text-[#00C805]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Full-Stack Development</h3>
              <p className="text-gray-400">Building robust web applications with modern frameworks and best practices.</p>
            </div>
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800 hover:border-[#00C805] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#00C805]/20 flex items-center justify-center mb-6">
                <Cpu className="h-7 w-7 text-[#00C805]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI Integration</h3>
              <p className="text-gray-400">Implementing AI and machine learning solutions to enhance application capabilities.</p>
            </div>
            <div className="bg-[#0C0F0E] rounded-2xl p-8 border border-gray-800 hover:border-[#00C805] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#00C805]/20 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-[#00C805]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure Architecture</h3>
              <p className="text-gray-400">Designing and implementing secure, scalable system architectures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-[#0C0F0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
            <p className="mt-4 text-xl text-gray-400">Some of my recent work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group bg-gradient-to-br from-[#00C805]/10 to-[#23272b] rounded-2xl shadow-2xl p-8 flex flex-col justify-end min-h-[340px]">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Trading Platform</h3>
                <p className="text-gray-300 mb-4">A modern trading platform powered by AI and real-time market data.</p>
                <Link href="/dashboard" className="text-[#00C805] hover:text-[#00B305] font-medium flex items-center">
                  View Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="absolute right-6 top-6 opacity-20">
                <TrendingUp className="w-20 h-20 text-[#00C805]" />
              </div>
            </div>
            <div className="relative group bg-gradient-to-br from-[#00C805]/10 to-[#23272b] rounded-2xl shadow-2xl p-8 flex flex-col justify-end min-h-[340px]">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Assistant</h3>
                <p className="text-gray-300 mb-4">An intelligent assistant powered by OpenAI for real-time support.</p>
                <button
                  onClick={() => setIsAssistantOpen(true)}
                  className="text-[#00C805] hover:text-[#00B305] font-medium flex items-center"
                >
                  Try Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
              <div className="absolute right-6 top-6 opacity-20">
                <Cpu className="w-20 h-20 text-[#00C805]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#1A1D1C]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
          <p className="text-xl text-gray-400 mb-12">
            Interested in working together or have a project in mind? Reach out and let's build something amazing!
          </p>
          <a
            href="mailto:andriia@example.com"
            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-white bg-[#00C805] hover:bg-[#00B305] transition-all transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            Email Me
          </a>
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