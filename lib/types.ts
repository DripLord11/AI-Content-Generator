export type AIProvider = 'gemini' | 'claude' | 'openai'

export type ProjectStatus = 'pending' | 'transcribing' | 'analyzing' | 'generating' | 'completed' | 'failed'

export type CaseStudyStyle = 'traditional' | 'story-driven' | 'data-focused'

export type ToneStyle = 'professional' | 'casual' | 'technical'

export interface InterviewInput {
  type: 'file' | 'text'
  content: string | File
  filename?: string
  mimeType?: string
}

export interface ProjectDetails {
  customerName: string
  customerCompany: string
  projectName: string
  productDetails: string
  keyAchievements: string[]
  targetAudience: string
  tone: ToneStyle
  specialRequests?: string
}

export interface Project {
  id: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
  details: ProjectDetails
  interview: {
    type: 'file' | 'text'
    filename?: string
    transcript?: string
  }
  outputs?: GeneratedContent
  error?: string
}

export interface GeneratedContent {
  caseStudies: CaseStudyOutput[]
  socialPosts: SocialPost[]
  quoteGraphics: QuoteGraphic[]
  videoScript: VideoScript
  emailBlurbs: EmailBlurb[]
  salesSlides: SalesSlide[]
  blogPost: BlogPost
  onePager: OnePager
}

export interface CaseStudyOutput {
  style: CaseStudyStyle
  title: string
  summary: string
  challenge: string
  solution: string
  results: string
  quote: string
  fullContent: string
}

export interface SocialPost {
  platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook'
  angle: string
  content: string
  hashtags: string[]
  characterCount: number
}

export interface QuoteGraphic {
  quote: string
  attribution: string
  backgroundColor: string
  textColor: string
}

export interface VideoScript {
  introduction: string
  keyMoments: VideoMoment[]
  conclusion: string
  suggestedClips: ClipSuggestion[]
  totalDuration: string
}

export interface VideoMoment {
  timestamp: string
  description: string
  suggestedText: string
}

export interface ClipSuggestion {
  startTime: string
  endTime: string
  purpose: string
  transcriptExcerpt: string
}

export interface EmailBlurb {
  variant: string
  subject: string
  preview: string
  body: string
}

export interface SalesSlide {
  slideNumber: number
  title: string
  bullets: string[]
  speakerNotes: string
  visualSuggestion: string
}

export interface BlogPost {
  title: string
  metaDescription: string
  content: string
  wordCount: number
  suggestedImages: string[]
}

export interface OnePager {
  headline: string
  subheadline: string
  keyStats: KeyStat[]
  challenge: string
  solution: string
  results: string
  testimonialQuote: string
  callToAction: string
}

export interface KeyStat {
  value: string
  label: string
}

export interface Lead {
  id: string
  name: string
  email: string
  company: string
  caseStudyType: string
  challenges: string
  referralSource: string
  createdAt: string
  bookingDate?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
}

export interface PortfolioItem {
  id: string
  title: string
  company: string
  industry: string
  thumbnail: string
  description: string
  metrics: string[]
  fullCaseStudy?: CaseStudyOutput
}
