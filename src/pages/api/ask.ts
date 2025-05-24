import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ response: '', error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ response: '', error: 'Invalid prompt' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for a chargeback management system specializing in e-commerce.
          
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
          
          Remember that your goal is to help merchants reduce chargebacks, increase dispute win rates, and protect their revenue.`
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

    return res.status(200).json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    return res.status(500).json({ 
      response: '', 
      error: 'Failed to get response from OpenAI API' 
    });
  }
}