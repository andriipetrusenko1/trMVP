import { ReactNode, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AIAssistant from './AIAssistant';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = 'AI Chargeback Manager',
  description = 'AI-powered chargeback management solution'
}: LayoutProps) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                AI Chargeback Manager
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Home
              </Link>
              <Link href="/dashboard" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* AI Assistant Button */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center"
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