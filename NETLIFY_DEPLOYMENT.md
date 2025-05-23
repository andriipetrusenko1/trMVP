# Netlify Deployment Guide

This guide explains how to deploy your Chargeback Management application to Netlify while keeping your OpenAI API key secure.

## Prerequisites

- A Netlify account
- Your OpenAI API key
- Your project pushed to a GitHub repository

## Deployment Steps

### 1. Connect Your Repository to Netlify

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select GitHub and authorize Netlify
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Click "Deploy site"

### 2. Set Up Environment Variables

To securely use your OpenAI API key with Netlify Functions:

1. Go to your site's dashboard in Netlify
2. Navigate to Site settings > Build & deploy > Environment
3. Click "Edit variables"
4. Add a new variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
5. Save the changes

### 3. Deploy Netlify Functions

The project is already configured to use Netlify Functions for the OpenAI API integration. The functions are located in the `netlify/functions` directory and will be automatically deployed when you push your code to GitHub.

## How It Works

1. The application is built as a static site using Next.js's static export
2. The OpenAI API key is stored securely in Netlify's environment variables
3. When a user interacts with the AI Assistant:
   - The frontend makes a request to `/api/openai`
   - This is redirected to the Netlify Function at `/.netlify/functions/openai`
   - The function uses the environment variable to make a secure API call to OpenAI
   - The response is returned to the frontend

## Testing Your Deployment

1. After deployment, open your site
2. Click on the AI Assistant icon
3. Ask a question
4. The assistant should respond using the OpenAI API via the Netlify Function

## Troubleshooting

If the AI Assistant isn't working:

1. Check Netlify Function logs:
   - Go to Functions > openai > Logs in your Netlify dashboard
   - Look for any error messages

2. Verify environment variables:
   - Make sure the `OPENAI_API_KEY` is set correctly
   - Check that the API key is valid and has sufficient credits

3. Test locally:
   - Install the Netlify CLI: `npm install -g netlify-cli`
   - Run `netlify dev` to test the functions locally
   - Check the console for any error messages

## Security Considerations

- Your OpenAI API key is stored securely in Netlify's environment variables
- The key is never exposed to the client-side code
- All API requests are made server-side via Netlify Functions
- Consider setting up API key rotation for additional security