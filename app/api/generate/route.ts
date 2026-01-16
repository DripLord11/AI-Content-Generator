import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const maxDuration = 60

// Simplified generation for demo - generates fewer assets but works fast
const DEMO_PROMPT = `You are an expert marketing content creator. Transform this customer interview into marketing content.

CUSTOMER DETAILS:
- Customer: {customerName} at {customerCompany}
- Project: {projectName}
- Product/Service: {productDetails}
- Achievements: {achievements}
- Tone: {tone}

INTERVIEW/TRANSCRIPT:
{transcript}

Generate the following marketing content in JSON format. Be concise but compelling:

{
  "caseStudy": {
    "title": "compelling title",
    "summary": "2-3 sentence executive summary",
    "challenge": "what problem did they face (2-3 sentences)",
    "solution": "how did they solve it (2-3 sentences)",
    "results": "what outcomes did they achieve (2-3 sentences)",
    "quote": "one powerful customer quote"
  },
  "socialPosts": [
    {
      "platform": "linkedin",
      "content": "LinkedIn post (under 300 chars)",
      "hashtags": ["3-4 relevant hashtags"]
    },
    {
      "platform": "twitter",
      "content": "Twitter post (under 280 chars)",
      "hashtags": ["2-3 hashtags"]
    }
  ],
  "emailBlurb": {
    "subject": "email subject line",
    "preview": "preview text (under 100 chars)",
    "body": "short email body announcing the success story"
  },
  "keyStats": [
    {"value": "percentage or number", "label": "what it measures"},
    {"value": "percentage or number", "label": "what it measures"}
  ]
}

IMPORTANT: Return ONLY valid JSON, no other text. Make content compelling and professional.`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customerName,
      customerCompany,
      projectName,
      productDetails,
      keyAchievements,
      tone,
      transcript
    } = body

    // Validate required fields
    if (!customerName || !customerCompany || !transcript) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerCompany, transcript' },
        { status: 400 }
      )
    }

    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Add GEMINI_API_KEY to .env.local' },
        { status: 500 }
      )
    }

    // Build the prompt
    const prompt = DEMO_PROMPT
      .replace('{customerName}', customerName)
      .replace('{customerCompany}', customerCompany)
      .replace('{projectName}', projectName || 'N/A')
      .replace('{productDetails}', productDetails || 'N/A')
      .replace('{achievements}', keyAchievements || 'Not specified')
      .replace('{tone}', tone || 'professional')
      .replace('{transcript}', transcript)

    // Call Gemini
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('No JSON in response:', text)
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    const content = JSON.parse(jsonMatch[0])

    return NextResponse.json({
      success: true,
      content,
      projectId: `proj_${Date.now()}`
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Content generation failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'ClientWinsAI API',
    version: '1.0.0',
    status: 'ready'
  })
}
