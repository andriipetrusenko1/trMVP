# Deployment Guide

This guide explains how to deploy the Chargeback Management application to GitHub and Netlify while keeping your API keys secure.

## GitHub Setup

1. Create a new GitHub repository
2. Initialize your local repository and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## Netlify Deployment

### Option 1: Deploy from GitHub

1. Log in to Netlify and click "New site from Git"
2. Select GitHub and authorize Netlify
3. Select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
5. Click "Deploy site"

### Option 2: Deploy using Netlify CLI

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build your project: `npm run build`
3. Deploy to Netlify: `netlify deploy --prod`

## Environment Variables

Since the application is deployed as a static site, the OpenAI API key won't be used on the deployed site. The AI Assistant will use client-side fallback responses.

If you want to use the OpenAI API in production, you'll need to:

1. Deploy the application as a server-side rendered Next.js app (not static export)
2. Set the `OPENAI_API_KEY` environment variable in Netlify:
   - Go to Site settings > Build & deploy > Environment
   - Add the environment variable: `OPENAI_API_KEY`

## Local Development vs. Production

- **Local Development**: You can use the OpenAI API by setting up `.env.local` with your API key
- **Production (Static Export)**: The AI Assistant will use client-side fallback responses
- **Production (Server-side)**: You'll need to set up environment variables in Netlify

## Security Notes

- Never commit your `.env.local` file to GitHub
- Always use environment variables for API keys
- Regularly rotate your API keys for security
- Consider using Netlify's environment variable encryption for added security