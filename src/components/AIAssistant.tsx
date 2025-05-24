import { useState, useEffect, useRef } from 'react';

interface AIAssistantProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Updated suggestions for the Trading AI Assistant
const suggestions = [
  "What are the current market trends?",
  "How can I analyze trading patterns?",
  "What are the best risk management strategies?",
  "How to identify profitable trading opportunities?",
  "What indicators should I watch for market analysis?"
];

// Updated mock responses for trading context
const mockResponses: Record<string, string> = {
  default: "I'm your AI Trading Assistant. I can help you with market analysis, trading strategies, risk management, and identifying profitable opportunities.",
  trends: "Current market trends show: 1) Increased volatility in tech stocks, 2) Strong performance in renewable energy sector, 3) Growing interest in cryptocurrency markets, 4) Shift towards sustainable investments, and 5) Emerging opportunities in AI-driven companies.",
  patterns: "Key trading patterns to watch: 1) Support and resistance levels, 2) Moving average crossovers, 3) Volume patterns, 4) Price action formations, and 5) Market sentiment indicators.",
  risk: "Effective risk management strategies include: 1) Setting stop-loss orders, 2) Diversifying your portfolio, 3) Position sizing based on risk tolerance, 4) Regular portfolio rebalancing, and 5) Using hedging techniques when appropriate.",
  opportunities: "To identify profitable opportunities: 1) Monitor market news and events, 2) Analyze technical indicators, 3) Study sector performance, 4) Track institutional movements, and 5) Consider market sentiment.",
  analysis: "Essential market analysis tools: 1) Technical analysis charts, 2) Fundamental analysis metrics, 3) Market sentiment indicators, 4) Volume analysis, and 5) Economic calendar events."
};

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Hello! I\'m your AI Trading Assistant. How can I help you today with trading strategies, market analysis, or risk management?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper function to get mock response based on prompt content
  const getMockResponse = (promptText: string): string => {
    const lowerPrompt = promptText.toLowerCase();
    
    if (lowerPrompt.includes('trends')) {
      return mockResponses.trends;
    } else if (lowerPrompt.includes('patterns')) {
      return mockResponses.patterns;
    } else if (lowerPrompt.includes('risk')) {
      return mockResponses.risk;
    } else if (lowerPrompt.includes('opportunities')) {
      return mockResponses.opportunities;
    } else if (lowerPrompt.includes('analysis')) {
      return mockResponses.analysis;
    }
    
    return mockResponses.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);
    setError('');
    
    // Store the prompt text before clearing it
    const promptText = prompt;
    
    try {
      // First try to use the API if available
      try {
        // Create an AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: promptText }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data || !data.response) {
          throw new Error('Invalid response format from API');
        }
        
        // Add assistant response to chat
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        return; // Exit early if API call was successful
      } catch (apiError) {
        console.warn('API call failed, falling back to client-side implementation:', apiError);
        // Continue to fallback implementation
      }
      
      // Client-side fallback implementation
      // Add a slight delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get mock response based on prompt content
      const mockResponse = getMockResponse(promptText);
      
      // For static deployments, add a note about using client-side responses
      const isStaticDeployment = window.location.hostname !== 'localhost' && 
                                window.location.hostname !== '127.0.0.1';
      
      const responseContent = isStaticDeployment 
        ? `[Using pre-defined responses in static deployment mode]\n\n${mockResponse}`
        : mockResponse;
      
      // Add assistant response to chat
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err) {
      console.error('Error in AI assistant:', err);
      
      // Create a more specific error message based on the error
      const errorMsg = err instanceof Error 
        ? err.message 
        : 'Failed to get a response. Please try again.';
      
      setError(errorMsg);
      
      // Add more detailed error message to chat
      const errorMessage: Message = {
        role: 'system',
        content: `Sorry, I encountered an error: ${errorMsg}
        
If you're seeing this message repeatedly, please check:
1. Your OpenAI API key is correctly set in .env.local (not .env.local.example)
2. The Next.js app is running in development mode (not static export)
3. The API key has sufficient credits and permissions
4. Your network connection is stable`,
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden flex flex-col" style={{ maxHeight: '85vh' }}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#00C805] to-[#00B305]">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-md">
              <span className="text-xl text-[#00C805]">📈</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Trading Assistant</h3>
              <p className="text-xs text-white/80">Online • Ready to help</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  message.role === 'user' 
                    ? 'bg-[#00C805] text-white' 
                    : message.role === 'system'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                <div 
                  className={`text-xs mt-2 ${
                    message.role === 'user' 
                      ? 'text-white/80' 
                      : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-200">
              {error}
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#00C805] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#00C805] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#00C805] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-gray-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
          <div className="relative">
            <textarea
              className="w-full p-4 pr-12 bg-gray-50 text-gray-800 rounded-xl resize-none focus:ring-2 focus:ring-[#00C805] focus:border-transparent placeholder-gray-400 border border-gray-200"
              rows={2}
              placeholder="Ask about trading strategies, market analysis, or risk management..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors ${
                isLoading || !prompt.trim()
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#00C805] hover:bg-[#00C805]/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}