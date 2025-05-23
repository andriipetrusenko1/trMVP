// Netlify serverless function to handle OpenAI API requests
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: { "Allow": "POST" }
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const { prompt, model = "gpt-3.5-turbo", maxTokens = 500 } = body;

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt is required" })
      };
    }

    // Initialize OpenAI API with the API key from environment variables
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Create the messages array for the chat completion
    const messages = [
      { role: "system", content: "You are a helpful trading assistant that provides information about chargebacks, trading strategies, and financial markets." },
      { role: "user", content: prompt }
    ];

    // Call the OpenAI API
    const response = await openai.createChatCompletion({
      model: model,
      messages: messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    // Return the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response.data.choices[0].message.content,
        usage: response.data.usage
      })
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Error calling OpenAI API", 
        details: error.message 
      })
    };
  }
};