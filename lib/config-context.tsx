"use client"

import * as React from "react"
import { config as defaultConfig, type BusinessConfig } from "./config"

const STORAGE_KEY = "clientwinsai_settings"

interface ExtendedConfig extends BusinessConfig {
  blotatoApiKey?: string
}

interface ConfigContextType {
  config: ExtendedConfig
  updateConfig: (updates: Partial<ExtendedConfig>) => void
  isLoaded: boolean
  blotatoApiKey: string
}

const ConfigContext = React.createContext<ConfigContextType | null>(null)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = React.useState<ExtendedConfig>({ ...defaultConfig, blotatoApiKey: '' })
  const [isLoaded, setIsLoaded] = React.useState(false)

  // Load config from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const settings = JSON.parse(saved)
        setConfig(prev => ({
          ...prev,
          businessName: settings.businessName || prev.businessName,
          tagline: settings.tagline || prev.tagline,
          description: settings.description || prev.description,
          contactEmail: settings.contactEmail || prev.contactEmail,
          calendlyUrl: settings.calendlyUrl || prev.calendlyUrl,
          brandColors: {
            ...prev.brandColors,
            primary: settings.primaryColor || prev.brandColors.primary,
            secondary: settings.secondaryColor || prev.brandColors.secondary,
            accent: settings.accentColor || prev.brandColors.accent,
          },
          aiProvider: {
            ...prev.aiProvider,
            default: settings.defaultProvider || prev.aiProvider.default,
            fallbackEnabled: settings.fallbackEnabled ?? prev.aiProvider.fallbackEnabled,
          },
          social: {
            ...prev.social,
            twitter: settings.twitter || prev.social.twitter,
            linkedin: settings.linkedin || prev.social.linkedin,
            instagram: settings.instagram || prev.social.instagram,
          },
          features: {
            ...prev.features,
            showPricing: settings.showPricing ?? prev.features.showPricing,
            showPortfolio: settings.showPortfolio ?? prev.features.showPortfolio,
            showTestimonials: settings.showTestimonials ?? prev.features.showTestimonials,
            enableBooking: settings.enableBooking ?? prev.features.enableBooking,
          },
          blotatoApiKey: settings.blotatoApiKey || '',
        }))
      } catch (e) {
        console.error("Failed to load settings:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Apply CSS variables when brand colors change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--color-primary-dynamic', config.brandColors.primary)
      document.documentElement.style.setProperty('--color-secondary-dynamic', config.brandColors.secondary)
      document.documentElement.style.setProperty('--color-accent-dynamic', config.brandColors.accent)
    }
  }, [config.brandColors])

  const updateConfig = React.useCallback((updates: Partial<ExtendedConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates }

      // Also save to localStorage
      const storageData = {
        businessName: newConfig.businessName,
        tagline: newConfig.tagline,
        description: newConfig.description,
        contactEmail: newConfig.contactEmail,
        calendlyUrl: newConfig.calendlyUrl,
        primaryColor: newConfig.brandColors.primary,
        secondaryColor: newConfig.brandColors.secondary,
        accentColor: newConfig.brandColors.accent,
        defaultProvider: newConfig.aiProvider.default,
        fallbackEnabled: newConfig.aiProvider.fallbackEnabled,
        twitter: newConfig.social.twitter,
        linkedin: newConfig.social.linkedin,
        instagram: newConfig.social.instagram,
        showPricing: newConfig.features.showPricing,
        showPortfolio: newConfig.features.showPortfolio,
        showTestimonials: newConfig.features.showTestimonials,
        enableBooking: newConfig.features.enableBooking,
        blotatoApiKey: newConfig.blotatoApiKey || '',
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))

      return newConfig
    })
  }, [])

  return (
    <ConfigContext.Provider value={{ config, updateConfig, isLoaded, blotatoApiKey: config.blotatoApiKey || '' }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = React.useContext(ConfigContext)
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }
  return context
}
