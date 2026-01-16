import Anthropic from '@anthropic-ai/sdk'
import { BaseAIProvider, AIProviderConfig, TranscriptionResult, GenerationResult } from './base'
import { AIProvider, ProjectDetails, GeneratedContent } from '@/lib/types'
import { estimateCost } from '@/lib/utils'

export class ClaudeProvider extends BaseAIProvider {
  private client: Anthropic

  constructor(config: AIProviderConfig) {
    super(config)
    this.client = new Anthropic({ apiKey: this.apiKey })
  }

  get name(): AIProvider {
    return 'claude'
  }

  getDefaultModel(): string {
    return 'claude-sonnet-4-20250514'
  }

  async transcribeAudio(_audioBuffer: Buffer, _mimeType: string): Promise<TranscriptionResult> {
    // Claude doesn't support direct audio transcription
    // This should be handled by using Gemini or OpenAI for transcription
    throw new Error('Claude does not support direct audio transcription. Use Gemini or OpenAI Whisper for transcription, then use Claude for content generation.')
  }

  async generateContent(transcript: string, details: ProjectDetails): Promise<GenerationResult> {
    try {
      const systemPrompt = this.getSystemPrompt()
      const userPrompt = this.getGenerationPrompt(transcript, details)

      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 16000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      })

      // Extract text content from response
      const textContent = response.content.find(block => block.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in response')
      }

      const text = textContent.text

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }

      const content: GeneratedContent = JSON.parse(jsonMatch[0])

      return {
        content,
        tokensUsed: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
        },
        cost: estimateCost('claude', response.usage.input_tokens, response.usage.output_tokens),
      }
    } catch (error) {
      console.error('Claude generation error:', error)
      throw new Error(`Failed to generate content with Claude: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: 'Say "Connection successful" and nothing else.',
          },
        ],
      })

      const textContent = response.content.find(block => block.type === 'text')
      return textContent?.type === 'text' && textContent.text.toLowerCase().includes('successful')
    } catch (error) {
      console.error('Claude connection test failed:', error)
      return false
    }
  }
}
