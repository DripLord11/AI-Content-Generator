import { AIProvider, ProjectDetails, GeneratedContent, Project, ProjectStatus } from '@/lib/types'
import { GeminiProvider, ClaudeProvider, OpenAIProvider, TranscriptionResult, GenerationResult } from './providers'
import { config } from '@/lib/config'

export interface GeneratorConfig {
  provider: AIProvider
  geminiKey?: string
  claudeKey?: string
  openaiKey?: string
  fallbackEnabled?: boolean
}

export interface ProgressCallback {
  (status: ProjectStatus, message: string): void
}

export class ContentGenerator {
  private config: GeneratorConfig
  private onProgress?: ProgressCallback

  constructor(generatorConfig?: Partial<GeneratorConfig>) {
    this.config = {
      provider: generatorConfig?.provider || (config.aiProvider.default as AIProvider),
      geminiKey: generatorConfig?.geminiKey || process.env.GEMINI_API_KEY || config.aiProvider.geminiKey,
      claudeKey: generatorConfig?.claudeKey || process.env.CLAUDE_API_KEY || config.aiProvider.claudeKey,
      openaiKey: generatorConfig?.openaiKey || process.env.OPENAI_API_KEY || config.aiProvider.openaiKey,
      fallbackEnabled: generatorConfig?.fallbackEnabled ?? config.aiProvider.fallbackEnabled,
    }
  }

  setProgressCallback(callback: ProgressCallback) {
    this.onProgress = callback
  }

  private updateProgress(status: ProjectStatus, message: string) {
    if (this.onProgress) {
      this.onProgress(status, message)
    }
  }

  private getProvider(provider: AIProvider) {
    switch (provider) {
      case 'gemini':
        if (!this.config.geminiKey) throw new Error('Gemini API key not configured')
        return new GeminiProvider({ apiKey: this.config.geminiKey })
      case 'claude':
        if (!this.config.claudeKey) throw new Error('Claude API key not configured')
        return new ClaudeProvider({ apiKey: this.config.claudeKey })
      case 'openai':
        if (!this.config.openaiKey) throw new Error('OpenAI API key not configured')
        return new OpenAIProvider({ apiKey: this.config.openaiKey })
      default:
        throw new Error(`Unknown provider: ${provider}`)
    }
  }

  private getTranscriptionProvider(): AIProvider {
    // For transcription, prefer Gemini (free) or OpenAI Whisper
    if (this.config.geminiKey) return 'gemini'
    if (this.config.openaiKey) return 'openai'
    throw new Error('No transcription provider available. Please configure Gemini or OpenAI API key.')
  }

  async transcribeAudio(audioBuffer: Buffer, mimeType: string): Promise<TranscriptionResult> {
    this.updateProgress('transcribing', 'Transcribing audio file...')

    const providerName = this.getTranscriptionProvider()
    const provider = this.getProvider(providerName)

    try {
      const result = await provider.transcribeAudio(audioBuffer, mimeType)
      this.updateProgress('transcribing', 'Transcription complete!')
      return result
    } catch (error) {
      // Try fallback if enabled
      if (this.config.fallbackEnabled && providerName !== 'openai' && this.config.openaiKey) {
        console.log('Trying OpenAI Whisper as fallback for transcription...')
        const fallbackProvider = this.getProvider('openai')
        return fallbackProvider.transcribeAudio(audioBuffer, mimeType)
      }
      throw error
    }
  }

  async generateContent(transcript: string, details: ProjectDetails): Promise<GenerationResult> {
    this.updateProgress('analyzing', 'Analyzing interview content...')

    const provider = this.getProvider(this.config.provider)
    const fallbackOrder: AIProvider[] = ['gemini', 'claude', 'openai'].filter(
      p => p !== this.config.provider
    ) as AIProvider[]

    try {
      this.updateProgress('generating', `Generating content with ${this.config.provider}...`)
      const result = await provider.generateContent(transcript, details)
      this.updateProgress('completed', 'Content generation complete!')
      return result
    } catch (error) {
      console.error(`Primary provider (${this.config.provider}) failed:`, error)

      if (this.config.fallbackEnabled) {
        for (const fallbackProvider of fallbackOrder) {
          const apiKey = this.config[`${fallbackProvider}Key` as keyof GeneratorConfig] as string
          if (!apiKey) continue

          try {
            console.log(`Trying ${fallbackProvider} as fallback...`)
            this.updateProgress('generating', `Trying ${fallbackProvider} as fallback...`)
            const fallback = this.getProvider(fallbackProvider)
            const result = await fallback.generateContent(transcript, details)
            this.updateProgress('completed', 'Content generation complete!')
            return result
          } catch (fallbackError) {
            console.error(`Fallback provider (${fallbackProvider}) failed:`, fallbackError)
          }
        }
      }

      throw error
    }
  }

  async processProject(
    input: { type: 'file'; buffer: Buffer; mimeType: string } | { type: 'text'; content: string },
    details: ProjectDetails
  ): Promise<{ content: GeneratedContent; transcript: string; cost: number }> {
    let transcript: string

    if (input.type === 'file') {
      const transcriptionResult = await this.transcribeAudio(input.buffer, input.mimeType)
      transcript = transcriptionResult.text
    } else {
      transcript = input.content
      this.updateProgress('analyzing', 'Processing transcript...')
    }

    const generationResult = await this.generateContent(transcript, details)

    return {
      content: generationResult.content,
      transcript,
      cost: generationResult.cost,
    }
  }

  async testProvider(provider: AIProvider): Promise<boolean> {
    try {
      const providerInstance = this.getProvider(provider)
      if ('testConnection' in providerInstance) {
        return await (providerInstance as any).testConnection()
      }
      return true
    } catch {
      return false
    }
  }

  static getProviderInfo(provider: AIProvider): {
    name: string
    description: string
    pros: string[]
    cons: string[]
    costEstimate: string
  } {
    const info = {
      gemini: {
        name: 'Google Gemini',
        description: 'Google\'s multimodal AI with excellent transcription support',
        pros: [
          'Free tier available',
          'Native audio/video transcription',
          'Fast processing',
          'Good quality output',
        ],
        cons: [
          'Rate limits on free tier',
          'Less refined for marketing copy',
        ],
        costEstimate: '$0.00 - $0.50 per case study',
      },
      claude: {
        name: 'Anthropic Claude',
        description: 'Advanced AI known for nuanced, high-quality writing',
        pros: [
          'Superior writing quality',
          'Better at nuanced marketing copy',
          'Excellent at following complex instructions',
        ],
        cons: [
          'Higher cost',
          'No native transcription',
          'Requires separate transcription provider',
        ],
        costEstimate: '$1.00 - $3.00 per case study',
      },
      openai: {
        name: 'OpenAI GPT-5',
        description: 'Industry-standard AI with Whisper transcription',
        pros: [
          'Excellent Whisper transcription',
          'Good writing quality',
          'Reliable and well-documented',
        ],
        cons: [
          'Higher cost',
          'Rate limits apply',
        ],
        costEstimate: '$1.50 - $4.00 per case study',
      },
    }

    return info[provider]
  }
}
