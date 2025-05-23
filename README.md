# AI Chargeback Manager

A frontend-only MVP built with Next.js for managing chargebacks in e-commerce with AI assistance. This application provides a modern interface for viewing and managing chargebacks, along with an AI assistant to help with dispute strategies and chargeback prevention.

![AI Chargeback Manager](https://via.placeholder.com/1200x630/EDF2F7/2D3748?text=AI+Chargeback+Manager)

## Features

### Landing Page
- Modern, responsive design with clear value proposition
- Feature highlights and benefits
- Testimonials and statistics
- Call-to-action buttons

### Dashboard
- Overview of chargeback metrics with summary cards
- Interactive charts showing chargeback distribution and reasons
- Filterable and searchable chargeback table
- Status indicators for different chargeback states

### AI Assistant
- Floating chat interface accessible from any page
- Powered by OpenAI's GPT-3.5 Turbo
- Suggested questions for new users
- Conversation history with timestamps
- Fallback responses when API is unavailable

## Pages

- **Home (/)**: Landing page with product information
- **Dashboard (/dashboard)**: Interactive dashboard with chargeback data
- **404**: Custom error page for not found routes

## Technical Details

- **Frontend**: Next.js with TypeScript and React
- **Styling**: Tailwind CSS for responsive design
- **API Routes**: Next.js API routes for OpenAI integration
- **Static Export**: Configured for static site generation with `next export`
- **Mock Data**: Includes realistic mock data for development
- **Client-side Fallback**: AI Assistant includes client-side response generation when API routes are unavailable in static export mode

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   Note: The application includes fallback mock responses if no API key is provided.

4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

This will create a static export in the `out` directory that can be deployed to any static hosting service.

## Deployment on Netlify

This project is configured for easy deployment on Netlify with OpenAI API integration:

1. Push your code to a Git repository
2. Connect the repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `out`
5. Add your `OPENAI_API_KEY` as an environment variable in Netlify's settings

**How the OpenAI API Integration Works:**
- The project uses Netlify Functions to securely call the OpenAI API
- Your API key is stored safely in Netlify's environment variables
- The AI Assistant makes requests to the serverless function
- If the API call fails, it falls back to client-side responses

For detailed deployment instructions, see [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── AIAssistant.tsx
│   │   └── Layout.tsx
│   ├── pages/           # Next.js pages
│   │   ├── api/         # API routes
│   │   │   └── ask.ts   # OpenAI integration
│   │   ├── _app.tsx     # App component
│   │   ├── 404.tsx      # Custom 404 page
│   │   ├── index.tsx    # Landing page
│   │   └── dashboard.tsx # Dashboard page
│   └── styles/          # Global styles
├── .env.local.example   # Example environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Technologies Used

- **Next.js**: React framework for production
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **OpenAI API**: AI-powered chat assistant

## License

MIT