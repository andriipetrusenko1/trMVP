import { useState, useEffect, useRef } from 'react';

interface AIAssistantProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Sample suggestions for the AI Assistant
const suggestions = [
  "How can I reduce my chargeback rate?",
  "What evidence should I collect for item not received disputes?",
  "How to respond to fraudulent transaction claims?",
  "What are the most common reasons for chargebacks?",
  "How to identify potential friendly fraud?"
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
      content: 'Hello! I\'m your AI Chargeback Assistant. How can I help you today with chargeback management?',
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden flex flex-col" style={{ maxHeight: '80vh' }}>
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center mr-3">
              <span className="text-xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold">AI Chargeback Assistant</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
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
                className={`max-w-3/4 rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : message.role === 'system'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div 
                  className={`text-xs mt-1 ${
                    message.role === 'user' 
                      ? 'text-blue-100' 
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
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white text-gray-800 rounded-lg p-3 border border-gray-200 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
          <div className="relative">
            <textarea
              className="w-full p-3 pr-12 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="Ask about chargeback management..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`absolute right-2 bottom-2 p-2 rounded-full ${
                isLoading || !prompt.trim()
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:bg-blue-100'
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