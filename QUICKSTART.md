# ClientWinsAI - Quick Start Guide

Get your AI-powered case study agency running in under 5 minutes.

## Prerequisites
- Node.js 18+ installed
- A Gemini/Claude/Chat-GPT API key

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local and add your Gemini API key:
# GEMINI_API_KEY=your_api_key_here
```

**Get a FREE Gemini API key:** https://makersuite.google.com/app/apikey

### 3. Run the App
```bash
npm run dev
```

Open http://localhost:3000

## Test the AI Generation

1. Go to http://localhost:3000/intake
2. Choose "Paste Transcript" tab
3. Fill in sample data:
   - Customer Name: `John Smith`
   - Company: `Acme Corp`
   - Project Name: `Marketing Automation`
   - Product Details: `CRM software implementation`
4. Paste any text (100+ characters) as transcript
5. Click "Generate Content Package"
6. Watch AI generate your case study, social posts, and email!

## Customize Your Agency

Edit `config/business-config.json` to change:
- Business name and tagline
- Brand colors
- Pricing packages
- Calendly URL for bookings

## Key Pages

| URL | Purpose |
|-----|---------|
| `/` | Landing page |
| `/intake` | AI content generation |
| `/book` | Booking page (add your Calendly) |
| `/settings` | Admin settings |
| `/admin` | Dashboard |

## Deploy to Production

```bash
npm run build
```

Deploy to Vercel, Netlify, or any Node.js host.

---

**Need help?** Check the full README.md for detailed documentation.
