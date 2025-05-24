import { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, User, Clock, Sparkles, TrendingUp, AlertCircle, HelpCircle, LineChart } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Enhanced suggestions with categories and icons
const suggestions = [
  {
    category: "Market Analysis",
    questions: [
      "What's the current market trend?",
      "How to analyze market volatility?",
      "What are the key market indicators?"
    ]
  },
  {
    category: "Trading Strategies",
    questions: [
      "What's the best strategy for day trading?",
      "How to implement risk management?",
      "What are effective entry and exit points?"
    ]
  },
  {
    category: "Technical Analysis",
    questions: [
      "How to read candlestick patterns?",
      "What are the best technical indicators?",
      "How to identify support and resistance levels?"
    ]
  }
];

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `Welcome to your AI Trading Assistant! 📈

I'm here to help you navigate the financial markets and make informed trading decisions. I can assist with:

• Market analysis and trends
• Trading strategies and techniques
• Technical analysis and indicators
• Risk management
• Portfolio optimization

How can I help you with your trading today?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.response) {
        throw new Error('Invalid response from API');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error in AI assistant:', err);
      setError(err instanceof Error ? err.message : 'Failed to get response');
      
      const errorMessage: Message = {
        role: 'system',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Trading Assistant</h3>
              <p className="text-sm text-green-100">Your intelligent market analysis expert</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 ${
                message.role === 'user' 
                  ? 'flex justify-end' 
                  : 'flex justify-start'
              }`}
            >
              <div 
                className={`max-w-3/4 rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-green-600 text-white' 
                    : message.role === 'system'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm'
                }`}
              >
                <div className="flex items-center mb-2">
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 mr-2" />
                  ) : (
                    <TrendingUp className="w-4 h-4 mr-2" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                  <Clock className="w-3 h-3 ml-2 text-gray-400" />
                  <span className="text-xs text-gray-400 ml-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Quick Suggestions
            </h4>
            <div className="space-y-3">
              {suggestions.map((category, index) => (
                <div key={index}>
                  <h5 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">
                    {category.category}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {category.questions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleSuggestionClick(question)}
                        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about market analysis, trading strategies, or technical indicators..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <LineChart className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}