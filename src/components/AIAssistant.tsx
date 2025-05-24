import { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, User, Clock, Sparkles, Shield, AlertCircle, HelpCircle } from 'lucide-react';

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
    category: "Prevention",
    questions: [
      "How can I reduce my chargeback rate?",
      "What are the best fraud prevention strategies?",
      "How to implement effective chargeback prevention?"
    ]
  },
  {
    category: "Evidence",
    questions: [
      "What evidence should I collect for disputes?",
      "How to document proof of delivery?",
      "What records should I keep for chargebacks?"
    ]
  },
  {
    category: "Resolution",
    questions: [
      "How to respond to fraudulent claims?",
      "What are the common chargeback reasons?",
      "How to handle friendly fraud cases?"
    ]
  }
];

// Mock responses for client-side fallback when API is not available
const mockResponses: Record<string, string> = {
  default: "I'm your AI Chargeback Assistant. I can help you with managing chargebacks, understanding dispute processes, and implementing prevention strategies.",
  rate: "To reduce your chargeback rate: 1) Implement clear billing descriptors, 2) Use fraud detection tools, 3) Maintain detailed transaction records, 4) Provide excellent customer service, and 5) Consider 3D Secure authentication for high-risk transactions.",
  evidence: "For 'item not received' disputes, collect: 1) Delivery confirmation with signature, 2) Tracking information showing delivery to the customer's address, 3) Communication records with the customer about the delivery, 4) GPS delivery confirmation if available, and 5) Photos of the packaged item before shipping.",
  fraud: "When responding to fraudulent transaction claims: 1) Provide IP address logs showing the customer's location, 2) Show device fingerprinting data, 3) Include AVS and CVV verification results, 4) Document any previous legitimate purchases from the same customer, and 5) Provide evidence that the purchased goods or services were used.",
  common: "The most common reasons for chargebacks include: 1) Fraudulent transactions (true fraud), 2) Items not received, 3) Items not as described, 4) Duplicate or incorrect charges, 5) Subscription cancellation issues, and 6) Friendly fraud where legitimate purchases are disputed.",
  friendly: "To identify potential friendly fraud: 1) Look for customers with a history of chargebacks, 2) Check if the customer attempted to contact you before filing a dispute, 3) Verify if the product was used or service accessed, 4) Compare shipping address with billing address, and 5) Review the timing of the dispute relative to the purchase date."
};

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `Welcome to your Chargeback Management Assistant! 🛡️

I'm here to help you navigate the complex world of chargeback management and fraud prevention. I can assist with:

• Chargeback prevention strategies
• Evidence collection and documentation
• Fraud detection and prevention
• Dispute resolution processes
• Best practices for e-commerce

How can I help you today?`,
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
    
    if (lowerPrompt.includes('reduce') && lowerPrompt.includes('rate')) {
      return mockResponses.rate;
    } else if (lowerPrompt.includes('evidence') && lowerPrompt.includes('not received')) {
      return mockResponses.evidence;
    } else if (lowerPrompt.includes('fraud') && lowerPrompt.includes('transaction')) {
      return mockResponses.fraud;
    } else if (lowerPrompt.includes('common') && lowerPrompt.includes('reason')) {
      return mockResponses.common;
    } else if (lowerPrompt.includes('friendly fraud')) {
      return mockResponses.friendly;
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
        const response = await fetch('/api/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: promptText }),
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.response) {
          throw new Error('Invalid response from API');
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Chargeback Management Assistant</h3>
              <p className="text-sm text-blue-100">Your AI-powered fraud prevention expert</p>
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
                    ? 'bg-blue-600 text-white' 
                    : message.role === 'system'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm'
                }`}
              >
                <div className="flex items-center mb-2">
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 mr-2" />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
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
                placeholder="Ask about chargeback management..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <HelpCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
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