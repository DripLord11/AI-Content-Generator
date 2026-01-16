# ClientWinsAI - Agency in a Box

Transform customer interviews into marketing assets with AI. A complete, white-label case study agency template you can deploy and start selling today.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## What is This?

This is a **turnkey case study agency business** that you can:
1. Clone and customize with your branding
2. Deploy to Vercel in minutes
3. Start taking clients the same day

Your clients upload customer interviews → Your AI generates 10+ marketing assets → You deliver and get paid.

## Features

### For Your Clients
- **Beautiful Landing Page** - Premium design that converts visitors into leads
- **Easy Upload System** - Drag & drop audio/video files or paste transcripts
- **Fast Delivery** - AI generates content in minutes, you deliver Instantly
- **Complete Packages** - Case studies, social posts, quote graphics, video scripts, and more

### For You (The Agency Owner)
- **White-Label Ready** - Change colors, logo, name, pricing in minutes
- **Multiple AI Providers** - Choose between Gemini (free), Claude (premium), or OpenAI
- **Admin Dashboard** - Track projects, leads, and revenue
- **Email Templates** - Pre-written outreach and follow-up sequences
- **Operations Guide** - Learn how to sell, price, and deliver

## Quick Start (5 Minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/clientwinsai.git
cd clientwinsai
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Add your API keys (at minimum, add one AI provider):

```env
# Choose at least one AI provider
GEMINI_API_KEY=your_gemini_key_here    # Free tier available
CLAUDE_API_KEY=your_claude_key_here    # Optional - premium quality
OPENAI_API_KEY=your_openai_key_here    # Optional - includes Whisper
```

### 3. Customize Your Branding

Edit `config/business-config.json`:

```json
{
  "businessName": "Your Agency Name",
  "tagline": "Your Catchy Tagline",
  "brandColors": {
    "primary": "#6366f1",
    "secondary": "#8b5cf6",
    "accent": "#ec4899"
  },
  "contactEmail": "hello@youragency.com"
}
```

### 4. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000 to see your agency!

### 5. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/clientwinsai)

Or deploy manually:

```bash
npm install -g vercel
vercel
```

## Getting API Keys

### Google Gemini (Recommended for Starting Out)
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and add to your `.env.local`

**Why Gemini?** Free tier handles transcription + generation. Great for testing and low-volume.

### Anthropic Claude (Premium Quality)
1. Go to https://console.anthropic.com/
2. Create an account and add billing
3. Generate an API key
4. Add to your `.env.local`

**Why Claude?** Superior writing quality for marketing content. Best for premium packages.

### OpenAI (GPT-5 + Whisper)
1. Go to https://platform.openai.com/
2. Create an account and add billing
3. Generate an API key
4. Add to your `.env.local`

**Why OpenAI?** Whisper transcription is industry-leading. Good all-around option.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── book/              # Booking system
│   ├── intake/            # Client submission form
│   ├── admin/             # Admin dashboard
│   ├── settings/          # White-label customization
│   └── vsl/               # Video sales letter page
├── components/
│   ├── landing/           # Landing page sections
│   ├── forms/             # Form components
│   └── ui/                # UI components (shadcn-style)
├── lib/
│   ├── ai/                # AI provider integrations
│   │   ├── providers/     # Gemini, Claude, OpenAI
│   │   └── generator.ts   # Content generation orchestrator
│   ├── config.ts          # Configuration loader
│   └── utils.ts           # Utility functions
├── config/
│   └── business-config.json  # Your business settings
├── templates/
│   ├── emails/            # Email templates for outreach
│   └── samples/           # Sample interview transcripts
└── docs/
    └── OPERATIONS.md      # How to run your agency
```

## Customization Guide

### Changing Brand Colors

1. **Via Settings UI**: Go to `/settings` and use the color pickers
2. **Via Config File**: Edit `config/business-config.json`
3. **Via CSS**: Modify `app/globals.css` for advanced customization

### Updating Pricing

Edit the `servicePackages` array in `config/business-config.json`:

```json
{
  "servicePackages": [
    {
      "id": "essential",
      "name": "Essential",
      "price": 299,
      "features": ["Case study", "5 social posts", "Email blurb"]
    }
  ]
}
```

### Adding Your Logo

1. Add your logo file to `public/images/logo.svg`
2. Update the path in `config/business-config.json`

### Customizing Generated Content

The AI prompt templates are in `lib/ai/providers/base.ts`. Modify the `getGenerationPrompt()` method to adjust the output format.

## Content Generated

Each case study package includes:

| Asset Type | Quantity | Description |
|------------|----------|-------------|
| Written Case Studies | 3 | Traditional, story-driven, data-focused formats |
| Social Media Posts | 12+ | LinkedIn, Twitter/X, Instagram ready |
| Quote Graphics | 4 | Customer testimonial cards |
| Video Script | 1 | With timestamps and clip suggestions |
| Email Blurbs | 3 | Newsletter, sales, announcement variants |
| Sales Slides | 5 | PowerPoint-ready content |
| Blog Post | 1 | 800-1200 word SEO-optimized article |
| One-Pager | 1 | Executive summary PDF |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Radix UI + Custom shadcn-style
- **AI Providers**: Google Gemini, Anthropic Claude, OpenAI
- **Animations**: Framer Motion
- **Validation**: Zod
- **Document Generation**: jsPDF, docx

## Business Model

This template is designed for a **service-based business model**:

1. **Client pays** for a case study package ($299-$999)
2. **You receive** the customer interview
3. **AI generates** the content (your cost: $0-$4)
4. **You deliver** the polished package
5. **Profit margin**: 90%+ on each project

See `docs/OPERATIONS.md` for detailed guidance on:
- How to price your services
- Finding and closing clients
- Delivering projects efficiently
- Scaling your agency

## FAQ

**Q: Do I need coding skills to use this?**
A: Basic familiarity with running npm commands helps, but most customization is done through the config file and settings UI.

**Q: Which AI provider should I start with?**
A: Gemini is recommended for starting out - it's free and handles both transcription and content generation.

**Q: Can I use this for my own case studies?**
A: Absolutely! Upload your customer interviews and generate content for your own marketing.

**Q: Is the generated content unique?**
A: Yes, each piece is generated from your specific customer interview data.

**Q: Can I modify the generated content?**
A: Yes, the delivery page allows editing before download. You can also regenerate individual pieces.

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/clientwinsai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/clientwinsai/discussions)

## License

MIT License - feel free to use this for your business!

---

Built with love for aspiring agency owners. Now go transform some customer stories!
