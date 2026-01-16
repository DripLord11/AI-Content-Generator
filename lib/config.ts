import { z } from 'zod'
import configData from '@/config/business-config.json'

const ServicePackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  features: z.array(z.string()),
  highlighted: z.boolean().optional(),
})

const BrandColorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  background: z.string(),
  foreground: z.string(),
  muted: z.string(),
  border: z.string(),
})

const AIProviderSchema = z.object({
  default: z.enum(['gemini', 'claude', 'openai']),
  geminiKey: z.string(),
  claudeKey: z.string(),
  openaiKey: z.string(),
  fallbackEnabled: z.boolean(),
})

const SocialSchema = z.object({
  twitter: z.string(),
  linkedin: z.string(),
  instagram: z.string(),
  youtube: z.string(),
})

const AnalyticsSchema = z.object({
  googleAnalyticsId: z.string(),
  facebookPixelId: z.string(),
})

const FeaturesSchema = z.object({
  darkModeDefault: z.boolean(),
  showPricing: z.boolean(),
  showPortfolio: z.boolean(),
  showTestimonials: z.boolean(),
  enableBooking: z.boolean(),
})

export const BusinessConfigSchema = z.object({
  businessName: z.string(),
  tagline: z.string(),
  description: z.string(),
  logo: z.string(),
  favicon: z.string(),
  brandColors: BrandColorsSchema,
  contactEmail: z.string(),
  bookingUrl: z.string(),
  calendlyUrl: z.string(),
  servicePackages: z.array(ServicePackageSchema),
  aiProvider: AIProviderSchema,
  social: SocialSchema,
  analytics: AnalyticsSchema,
  features: FeaturesSchema,
})

export type BusinessConfig = z.infer<typeof BusinessConfigSchema>
export type ServicePackage = z.infer<typeof ServicePackageSchema>
export type BrandColors = z.infer<typeof BrandColorsSchema>

export function getConfig(): BusinessConfig {
  const result = BusinessConfigSchema.safeParse(configData)
  if (!result.success) {
    console.error('Invalid configuration:', result.error)
    throw new Error('Invalid business configuration')
  }
  return result.data
}

export function getPackageById(id: string): ServicePackage | undefined {
  const config = getConfig()
  return config.servicePackages.find(pkg => pkg.id === id)
}

export function getCSSVariables(colors: BrandColors): Record<string, string> {
  return {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
    '--color-foreground': colors.foreground,
    '--color-muted': colors.muted,
    '--color-border': colors.border,
  }
}

export const config = getConfig()
