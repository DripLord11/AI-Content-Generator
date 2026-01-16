import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'
import { BaseAIProvider, AIProviderConfig, TranscriptionResult, GenerationResult } from './base'
import { AIProvider, ProjectDetails, GeneratedContent } from '@/lib/types'
import { estimateCost } from '@/lib/utils'

export class GeminiProvider extends BaseAIProvider {
  private client: GoogleGenerativeAI
  private generativeModel: GenerativeModel

  constructor(config: AIProviderConfig) {
    super(config)
    this.client = new GoogleGenerativeAI(this.apiKey)
    this.generativeModel = this.client.getGenerativeModel({ model: this.model })
  }

  get name(): AIProvider {
    return 'gemini'
  }

  getDefaultModel(): string {
    return 'gemini-1.5-pro'
  }

  async transcribeAudio(audioBuffer: Buffer, mimeType: string): Promise<TranscriptionResult> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const audioPart = {
        inlineData: {
          data: audioBuffer.toString('base64'),
          mimeType: mimeType,
        },
      }

      const result = await model.generateContent([
        'Please transcribe this audio file accurately. Include speaker labels if you can identify different speakers. Format the transcript with timestamps if possible. Output only the transcript text, no additional commentary.',
        audioPart,
      ])

      const response = result.response
      const text = response.text()

      return {
        text,
        confidence: 0.95,
      }
    } catch (error) {
      console.error('Gemini transcription error:', error)
      throw new Error(`Failed to transcribe audio with Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateContent(transcript: string, details: ProjectDetails): Promise<GenerationResult> {
    try {
      const systemPrompt = this.getSystemPrompt()
      const userPrompt = this.getGenerationPrompt(transcript, details)

      const chat = this.generativeModel.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          {
            role: 'model',
            parts: [{ text: 'I understand. I am ready to transform customer interviews into comprehensive marketing content packages. I will generate all required outputs in the exact JSON format specified.' }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 32000,
        },
      })

      const result = await chat.sendMessage(userPrompt)
      const response = result.response
      const text = response.text()

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }

      const content: GeneratedContent = JSON.parse(jsonMatch[0])

      // Estimate token usage (rough approximation)
      const inputTokens = Math.ceil((systemPrompt.length + userPrompt.length) / 4)
      const outputTokens = Math.ceil(text.length / 4)

      return {
        content,
        tokensUsed: {
          input: inputTokens,
          output: outputTokens,
        },
        cost: estimateCost('gemini', inputTokens, outputTokens),
      }
    } catch (error) {
      console.error('Gemini generation error:', error)
      throw new Error(`Failed to generate content with Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent('Say "Connection successful" and nothing else.')
      return result.response.text().toLowerCase().includes('successful')
    } catch (error) {
      console.error('Gemini connection test failed:', error)
      return false
    }
  }
}
