import OpenAI from 'openai'
import { BaseAIProvider, AIProviderConfig, TranscriptionResult, GenerationResult } from './base'
import { AIProvider, ProjectDetails, GeneratedContent } from '@/lib/types'
import { estimateCost } from '@/lib/utils'

export class OpenAIProvider extends BaseAIProvider {
  private client: OpenAI

  constructor(config: AIProviderConfig) {
    super(config)
    this.client = new OpenAI({ apiKey: this.apiKey })
  }

  get name(): AIProvider {
    return 'openai'
  }

  getDefaultModel(): string {
    return 'GPT-5o'
  }

  async transcribeAudio(audioBuffer: Buffer, mimeType: string): Promise<TranscriptionResult> {
    try {
      // Determine file extension from mime type
      const extensionMap: Record<string, string> = {
        'audio/mpeg': 'mp3',
        'audio/mp3': 'mp3',
        'audio/wav': 'wav',
        'audio/x-wav': 'wav',
        'audio/webm': 'webm',
        'audio/m4a': 'm4a',
        'audio/x-m4a': 'm4a',
        'audio/mp4': 'm4a',
        'video/mp4': 'mp4',
        'video/webm': 'webm',
      }

      const extension = extensionMap[mimeType] || 'mp3'

      // Create a File for the OpenAI API using type assertion for Node.js Buffer compatibility
      const file = new File([audioBuffer as unknown as BlobPart], `audio.${extension}`, { type: mimeType })

      const response = await this.client.audio.transcriptions.create({
        model: 'whisper-1',
        file: file,
        response_format: 'verbose_json',
      })

      return {
        text: response.text,
        duration: response.duration,
        confidence: 0.95,
      }
    } catch (error) {
      console.error('OpenAI transcription error:', error)
      throw new Error(`Failed to transcribe audio with OpenAI Whisper: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateContent(transcript: string, details: ProjectDetails): Promise<GenerationResult> {
    try {
      const systemPrompt = this.getSystemPrompt()
      const userPrompt = this.getGenerationPrompt(transcript, details)

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 16000,
        response_format: { type: 'json_object' },
      })

      const text = response.choices[0]?.message?.content
      if (!text) {
        throw new Error('No content in response')
      }

      const content: GeneratedContent = JSON.parse(text)

      const inputTokens = response.usage?.prompt_tokens || 0
      const outputTokens = response.usage?.completion_tokens || 0

      return {
        content,
        tokensUsed: {
          input: inputTokens,
          output: outputTokens,
        },
        cost: estimateCost('openai', inputTokens, outputTokens),
      }
    } catch (error) {
      console.error('OpenAI generation error:', error)
      throw new Error(`Failed to generate content with OpenAI: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Say "Connection successful" and nothing else.',
          },
        ],
        max_tokens: 50,
      })

      const text = response.choices[0]?.message?.content || ''
      return text.toLowerCase().includes('successful')
    } catch (error) {
      console.error('OpenAI connection test failed:', error)
      return false
    }
  }
}
