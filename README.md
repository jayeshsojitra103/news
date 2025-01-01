# News Aggregator

A React-based news aggregator that pulls articles from multiple sources into a clean, responsive interface.

## Setup project

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Docker

## Prerequisites

- Docker
- Docker Compose
- Node.js 18+ (for local development)

## Environment Variables

Create `.env` file in root:

```
VITE_NEWSAPI_KEY=your_news_api_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NEWS_API_URL=https://newsapi.org/v2/everything
VITE_GUARDIAN_API_URL=https://content.guardianapis.com/search
```

## Docker Setup

Development:
```bash
docker-compose up dev
```
Access at http://localhost:5173

Production:
```bash
docker-compose up prod
```
Access at http://localhost:80

## Local Development

```bash
npm install
npm run dev
```

## Features

- Article search with keyword filtering
- Date, category, and source filters
- Customizable news feed
- Mobile-responsive design
- Integration with multiple news APIs

## Project Structure

```
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API integration
│   ├── store/         # Vuex store
│   ├── utils/         # Utility functions
├── .env               # Environment variables
│   ├── types/         # TypeScript definitions
│   └── utils/         # Helper functions
├── docker/            # Docker configuration
└── docker-compose.yml # Docker compose configuration
```

## API Integration

Supported news sources:
- NewsAPI
- The Guardian
- BBC (BBC News API is not publicly available, so it is a mock implementation)

