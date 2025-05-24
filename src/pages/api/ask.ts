import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

type ResponseData = {
  response: string;
  error?: string;
};

// Mock responses for development without OpenAI API key
const mockResponses: Record<string, string> = {
  default: "I'm your AI Chargeback Assistant. I can help you with managing chargebacks, understanding dispute processes, and implementing prevention strategies.",
  rate: "To reduce your chargeback rate: 1) Implement clear billing descriptors, 2) Use fraud detection tools, 3) Maintain detailed transaction records, 4) Provide excellent customer service, and 5) Consider 3D Secure authentication for high-risk transactions.",
  evidence: "For 'item not received' disputes, collect: 1) Delivery confirmation with signature, 2) Tracking information showing delivery to the customer's address, 3) Communication records with the customer about the delivery, 4) GPS delivery confirmation if available, and 5) Photos of the packaged item before shipping.",
  fraud: "When responding to fraudulent transaction claims: 1) Provide IP address logs showing the customer's location, 2) Show device fingerprinting data, 3) Include AVS and CVV verification results, 4) Document any previous legitimate purchases from the same customer, and 5) Provide evidence that the purchased goods or services were used.",
  common: "The most common reasons for chargebacks include: 1) Fraudulent transactions (true fraud), 2) Items not received, 3) Items not as described, 4) Duplicate or incorrect charges, 5) Subscription cancellation issues, and 6) Friendly fraud where legitimate purchases are disputed.",
  friendly: "To identify potential friendly fraud: 1) Look for customers with a history of chargebacks, 2) Check if the customer attempted to contact you before filing a dispute, 3) Verify if the product was used or service accessed, 4) Compare shipping address with billing address, and 5) Review the timing of the dispute relative to the purchase date."
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ response: '', error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ response: '', error: 'Invalid prompt' });
  }

  // For development without an API key, use mock responses
  if (process.env.NODE_ENV === 'development' && !process.env.OPENAI_API_KEY) {
    console.log('Using mock response for development');
    
    // Simple keyword matching for mock responses
    const lowerPrompt = prompt.toLowerCase();
    let mockResponse = mockResponses.default;
    
    if (lowerPrompt.includes('reduce') && lowerPrompt.includes('rate')) {
      mockResponse = mockResponses.rate;
    } else if (lowerPrompt.includes('evidence') && lowerPrompt.includes('not received')) {
      mockResponse = mockResponses.evidence;
    } else if (lowerPrompt.includes('fraud')) {
      mockResponse = mockResponses.fraud;
    } else if (lowerPrompt.includes('common') && lowerPrompt.includes('reason')) {
      mockResponse = mockResponses.common;
    } else if (lowerPrompt.includes('friendly fraud')) {
      mockResponse = mockResponses.friendly;
    }
    
    // Add a slight delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return res.status(200).json({ response: mockResponse });
  }

  try {
    // Log environment for debugging (redact the full key in production)
    console.log('Environment:', {
      nodeEnv: process.env.NODE_ENV,
      hasApiKey: !!process.env.OPENAI_API_KEY,
      apiKeyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'none'
    });

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    console.log('OpenAI client initialized');

    // Create a system message to provide context about the application
    const systemMessage = `You are an AI assistant for a chargeback management system specializing in e-commerce.
    
    Your expertise includes:
    - Chargeback prevention strategies
    - Dispute resolution processes
    - Evidence collection best practices
    - Fraud detection and prevention
    - Card network rules and regulations
    - Customer communication strategies
    
    Provide concise, actionable advice tailored to e-commerce businesses.
    When appropriate, structure your responses with numbered lists or bullet points.
    Include specific examples and practical steps that merchants can implement.
    
    Remember that your goal is to help merchants reduce chargebacks, increase dispute win rates, and protect their revenue.`;

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    // Extract the response
    const response = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

    // Return the response
    return res.status(200).json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // If it's an OpenAI error, it might have more details
      if ('status' in error) {
        console.error('Status:', (error as any).status);
      }
      if ('headers' in error) {
        console.error('Headers:', (error as any).headers);
      }
    }
    
    // Fallback to mock responses if OpenAI API fails
    const lowerPrompt = prompt.toLowerCase();
    let mockResponse = mockResponses.default;
    
    if (lowerPrompt.includes('reduce') && lowerPrompt.includes('rate')) {
      mockResponse = mockResponses.rate;
    } else if (lowerPrompt.includes('evidence') && lowerPrompt.includes('not received')) {
      mockResponse = mockResponses.evidence;
    } else if (lowerPrompt.includes('fraud')) {
      mockResponse = mockResponses.fraud;
    } else if (lowerPrompt.includes('common') && lowerPrompt.includes('reason')) {
      mockResponse = mockResponses.common;
    } else if (lowerPrompt.includes('friendly fraud')) {
      mockResponse = mockResponses.friendly;
    }
    
    return res.status(200).json({ 
      response: `Note: Using fallback response due to API error.\n\n${mockResponse}` 
    });
  }
}