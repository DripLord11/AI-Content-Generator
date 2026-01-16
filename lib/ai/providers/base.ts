import { AIProvider, ProjectDetails, GeneratedContent } from '@/lib/types'

export interface AIProviderConfig {
  apiKey: string
  model?: string
}

export interface TranscriptionResult {
  text: string
  confidence?: number
  duration?: number
}

export interface GenerationResult {
  content: GeneratedContent
  tokensUsed: {
    input: number
    output: number
  }
  cost: number
}

export abstract class BaseAIProvider {
  protected apiKey: string
  protected model: string

  constructor(config: AIProviderConfig) {
    this.apiKey = config.apiKey
    this.model = config.model || this.getDefaultModel()
  }

  abstract get name(): AIProvider
  abstract getDefaultModel(): string

  abstract transcribeAudio(
    audioBuffer: Buffer,
    mimeType: string
  ): Promise<TranscriptionResult>

  abstract generateContent(
    transcript: string,
    details: ProjectDetails
  ): Promise<GenerationResult>

  protected getSystemPrompt(): string {
    return `You are an expert marketing content creator specializing in B2B case studies and customer success stories.
Your job is to transform customer interview transcripts into compelling marketing assets.
You write in a clear, professional tone that highlights business value and measurable results.
Always focus on the transformation journey: Challenge → Solution → Results.
Extract specific metrics and quotes when available.
Create content that is ready for publication with minimal editing.`
  }

  protected getGenerationPrompt(transcript: string, details: ProjectDetails): string {
    return `Transform this customer interview into a complete marketing content package.

## CUSTOMER DETAILS
- Customer Name: ${details.customerName}
- Company: ${details.customerCompany}
- Project: ${details.projectName}
- Product/Service Details: ${details.productDetails}
- Key Achievements to Highlight: ${details.keyAchievements.join(', ')}
- Target Audience: ${details.targetAudience}
- Tone: ${details.tone}
${details.specialRequests ? `- Special Requests: ${details.specialRequests}` : ''}

## INTERVIEW TRANSCRIPT
${transcript}

## REQUIRED OUTPUTS
Generate all of the following in JSON format:

1. **Three Case Studies** (traditional, story-driven, data-focused styles)
2. **12 Social Media Posts** (4 LinkedIn, 4 Twitter, 4 Instagram)
3. **4 Quote Graphics** (memorable customer quotes)
4. **Video Script** with timestamps and clip suggestions
5. **3 Email Blurbs** (different angles: announcement, nurture, sales)
6. **5 Sales Slides** (PowerPoint-ready)
7. **Blog Post** (800-1200 words)
8. **One-Pager Summary**

Respond ONLY with valid JSON matching this exact structure:
{
  "caseStudies": [
    {
      "style": "traditional|story-driven|data-focused",
      "title": "string",
      "summary": "string",
      "challenge": "string",
      "solution": "string",
      "results": "string",
      "quote": "string",
      "fullContent": "string (full formatted case study)"
    }
  ],
  "socialPosts": [
    {
      "platform": "linkedin|twitter|instagram",
      "angle": "string (what makes this post unique)",
      "content": "string",
      "hashtags": ["string"],
      "characterCount": number
    }
  ],
  "quoteGraphics": [
    {
      "quote": "string",
      "attribution": "string",
      "backgroundColor": "#hex",
      "textColor": "#hex"
    }
  ],
  "videoScript": {
    "introduction": "string",
    "keyMoments": [
      {
        "timestamp": "string",
        "description": "string",
        "suggestedText": "string"
      }
    ],
    "conclusion": "string",
    "suggestedClips": [
      {
        "startTime": "string",
        "endTime": "string",
        "purpose": "string",
        "transcriptExcerpt": "string"
      }
    ],
    "totalDuration": "string"
  },
  "emailBlurbs": [
    {
      "variant": "string",
      "subject": "string",
      "preview": "string",
      "body": "string"
    }
  ],
  "salesSlides": [
    {
      "slideNumber": number,
      "title": "string",
      "bullets": ["string"],
      "speakerNotes": "string",
      "visualSuggestion": "string"
    }
  ],
  "blogPost": {
    "title": "string",
    "metaDescription": "string",
    "content": "string (full HTML-formatted blog post)",
    "wordCount": number,
    "suggestedImages": ["string"]
  },
  "onePager": {
    "headline": "string",
    "subheadline": "string",
    "keyStats": [
      {
        "value": "string",
        "label": "string"
      }
    ],
    "challenge": "string",
    "solution": "string",
    "results": "string",
    "testimonialQuote": "string",
    "callToAction": "string"
  }
}`
  }
}
