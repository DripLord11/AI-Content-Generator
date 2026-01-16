"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Sparkles,
  Palette,
  Key,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save,
  TestTube,
  Calendar,
  Rocket,
  Copy,
  ExternalLink,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useConfig } from "@/lib/config-context"

export default function SettingsPage() {
  const { config, updateConfig, isLoaded } = useConfig()
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)
  const [testingProvider, setTestingProvider] = React.useState<string | null>(null)
  const [providerStatus, setProviderStatus] = React.useState<Record<string, "success" | "error" | null>>({})
  const [copiedCommand, setCopiedCommand] = React.useState<string | null>(null)

  // Local form state
  const [businessName, setBusinessName] = React.useState("")
  const [tagline, setTagline] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [contactEmail, setContactEmail] = React.useState("")
  const [calendlyUrl, setCalendlyUrl] = React.useState("")
  const [primaryColor, setPrimaryColor] = React.useState("")
  const [secondaryColor, setSecondaryColor] = React.useState("")
  const [accentColor, setAccentColor] = React.useState("")
  const [defaultProvider, setDefaultProvider] = React.useState<'gemini' | 'claude' | 'openai'>('gemini')
  const [fallbackEnabled, setFallbackEnabled] = React.useState(true)
  const [twitter, setTwitter] = React.useState("")
  const [linkedin, setLinkedin] = React.useState("")
  const [instagram, setInstagram] = React.useState("")
  const [showPricing, setShowPricing] = React.useState(true)
  const [showPortfolio, setShowPortfolio] = React.useState(true)
  const [showTestimonials, setShowTestimonials] = React.useState(true)
  const [enableBooking, setEnableBooking] = React.useState(true)
  const [blotatoApiKey, setBlotatoApiKey] = React.useState("")

  // Sync local state with config when loaded
  React.useEffect(() => {
    if (isLoaded) {
      setBusinessName(config.businessName)
      setTagline(config.tagline)
      setDescription(config.description)
      setContactEmail(config.contactEmail)
      setCalendlyUrl(config.calendlyUrl)
      setPrimaryColor(config.brandColors.primary)
      setSecondaryColor(config.brandColors.secondary)
      setAccentColor(config.brandColors.accent)
      setDefaultProvider(config.aiProvider.default)
      setFallbackEnabled(config.aiProvider.fallbackEnabled)
      setTwitter(config.social.twitter)
      setLinkedin(config.social.linkedin)
      setInstagram(config.social.instagram)
      setShowPricing(config.features.showPricing)
      setShowPortfolio(config.features.showPortfolio)
      setShowTestimonials(config.features.showTestimonials)
      setEnableBooking(config.features.enableBooking)
      setBlotatoApiKey(config.blotatoApiKey || "")
    }
  }, [isLoaded, config])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    // Update the global config context (which also saves to localStorage)
    updateConfig({
      businessName,
      tagline,
      description,
      contactEmail,
      calendlyUrl,
      brandColors: {
        ...config.brandColors,
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
      },
      aiProvider: {
        ...config.aiProvider,
        default: defaultProvider,
        fallbackEnabled,
      },
      social: {
        ...config.social,
        twitter,
        linkedin,
        instagram,
      },
      features: {
        ...config.features,
        showPricing,
        showPortfolio,
        showTestimonials,
        enableBooking,
      },
      blotatoApiKey,
    })

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    setSaveSuccess(true)
    setIsSaving(false)

    // Reset success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const testProvider = async (provider: string) => {
    setTestingProvider(provider)
    setProviderStatus((prev) => ({ ...prev, [provider]: null }))

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Test User',
          customerCompany: 'Test Company',
          projectName: 'Test Project',
          productDetails: 'Test product',
          transcript: 'This is a test transcript to verify the AI provider is working correctly.',
          tone: 'professional'
        })
      })

      if (response.ok) {
        setProviderStatus((prev) => ({ ...prev, [provider]: "success" }))
      } else {
        setProviderStatus((prev) => ({ ...prev, [provider]: "error" }))
      }
    } catch {
      setProviderStatus((prev) => ({ ...prev, [provider]: "error" }))
    }

    setTestingProvider(null)
  }

  const copyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command)
    setCopiedCommand(id)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center space-x-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-secondary p-1.5 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-foreground">Settings</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Business Settings</h1>
          <p className="text-foreground/60">
            Customize your agency&apos;s branding, AI providers, and features. Changes apply instantly!
          </p>
        </motion.div>

        {/* Success Message */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-500">Settings saved and applied successfully!</span>
          </motion.div>
        )}

        <Tabs defaultValue="branding" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="branding">
              <Palette className="w-4 h-4 mr-2" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Key className="w-4 h-4 mr-2" />
              AI Providers
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Calendar className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="deploy">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy
            </TabsTrigger>
          </TabsList>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>
                    Set your business name, tagline, and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your Business Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Your catchy tagline"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your service..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Colors</CardTitle>
                  <CardDescription>
                    Customize your brand&apos;s color scheme (changes apply instantly)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          placeholder="#6366f1"
                        />
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          placeholder="#8b5cf6"
                        />
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="accentColor"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          placeholder="#ec4899"
                        />
                        <input
                          type="color"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                    <p className="text-sm text-foreground/60 mb-4">Live Preview:</p>
                    <div className="flex gap-4">
                      <div
                        className="px-6 py-3 rounded-xl text-white font-medium"
                        style={{
                          background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                        }}
                      >
                        Primary Button
                      </div>
                      <div
                        className="px-6 py-3 rounded-xl text-white font-medium"
                        style={{ backgroundColor: accentColor }}
                      >
                        Accent Button
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Add your social media profile links</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter/X</Label>
                      <Input
                        id="twitter"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Toggles</CardTitle>
                  <CardDescription>
                    Enable or disable features on your website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      label: "Show Pricing Section",
                      description: "Display pricing packages on the landing page",
                      checked: showPricing,
                      onChange: setShowPricing,
                    },
                    {
                      label: "Show Portfolio Section",
                      description: "Display sample case studies and portfolio items",
                      checked: showPortfolio,
                      onChange: setShowPortfolio,
                    },
                    {
                      label: "Show Testimonials",
                      description: "Display customer testimonials on the landing page",
                      checked: showTestimonials,
                      onChange: setShowTestimonials,
                    },
                    {
                      label: "Enable Booking System",
                      description: "Allow visitors to book strategy calls",
                      checked: enableBooking,
                      onChange: setEnableBooking,
                    },
                  ].map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div>
                        <p className="font-medium text-foreground">{feature.label}</p>
                        <p className="text-sm text-foreground/60">{feature.description}</p>
                      </div>
                      <Switch checked={feature.checked} onCheckedChange={feature.onChange} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Providers Tab */}
          <TabsContent value="ai">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Provider Configuration</CardTitle>
                  <CardDescription>
                    Configure your AI providers for content generation. API keys are stored in .env.local for security.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultProvider">Default Provider</Label>
                    <Select value={defaultProvider} onValueChange={(v) => setDefaultProvider(v as 'gemini' | 'claude' | 'openai')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Google Gemini (Recommended - Free Tier)</SelectItem>
                        <SelectItem value="claude">Anthropic Claude (Premium Quality)</SelectItem>
                        <SelectItem value="openai">OpenAI GPT-5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div>
                      <p className="font-medium text-foreground">Enable Fallback</p>
                      <p className="text-sm text-foreground/60">
                        Automatically try another provider if the primary fails
                      </p>
                    </div>
                    <Switch checked={fallbackEnabled} onCheckedChange={setFallbackEnabled} />
                  </div>
                </CardContent>
              </Card>

              {/* Provider Cards */}
              {[
                {
                  name: "Google Gemini",
                  key: "gemini",
                  description: "Free tier available, fast generation",
                  cost: "$0.00 - $0.50 per case study",
                  badge: "Recommended",
                  badgeVariant: "success" as const,
                },
                {
                  name: "Anthropic Claude",
                  key: "claude",
                  description: "Superior writing quality for marketing content",
                  cost: "$1.00 - $3.00 per case study",
                  badge: "Premium",
                  badgeVariant: "default" as const,
                },
                {
                  name: "OpenAI",
                  key: "openai",
                  description: "GPT-5 generation with Whisper transcription",
                  cost: "$1.50 - $4.00 per case study",
                  badge: "Popular",
                  badgeVariant: "secondary" as const,
                },
              ].map((provider) => (
                <Card key={provider.key}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {provider.name}
                          <Badge variant={provider.badgeVariant}>{provider.badge}</Badge>
                          {providerStatus[provider.key] === "success" && (
                            <Badge variant="success">Connected</Badge>
                          )}
                          {providerStatus[provider.key] === "error" && (
                            <Badge variant="destructive">Error</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{provider.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{provider.cost}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <p className="text-sm text-foreground/60 mb-2">
                          API Key is configured in <code className="text-primary">.env.local</code> file
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => testProvider(provider.key)}
                        disabled={testingProvider === provider.key}
                      >
                        {testingProvider === provider.key ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <TestTube className="w-4 h-4 mr-2" />
                            Test Connection
                          </>
                        )}
                      </Button>
                    </div>
                    {providerStatus[provider.key] === "error" && (
                      <div className="flex items-center gap-2 mt-4 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Connection failed. Check your API key in .env.local
                      </div>
                    )}
                    {providerStatus[provider.key] === "success" && (
                      <div className="flex items-center gap-2 mt-4 text-green-500 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Connection successful! Provider is ready to use.
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Calendly Integration
                  </CardTitle>
                  <CardDescription>
                    Connect your Calendly account to enable booking on the /book page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calendlyUrl">Calendly Event URL</Label>
                    <Input
                      id="calendlyUrl"
                      value={calendlyUrl}
                      onChange={(e) => setCalendlyUrl(e.target.value)}
                      placeholder="https://calendly.com/your-username/30min"
                    />
                    <p className="text-xs text-foreground/50">
                      Get your event URL from Calendly: calendly.com → Event Types → Copy Link
                    </p>
                  </div>

                  {calendlyUrl && calendlyUrl !== "https://calendly.com/your-username" && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">Calendly Connected</span>
                      </div>
                      <p className="text-sm text-foreground/60 mt-1">
                        Your booking widget will appear on the /book page
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Calendly
                      </Button>
                    </a>
                    <Link href="/book">
                      <Button variant="outline">
                        Preview Booking Page
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Blotato - Auto-Post to Social Media
                  </CardTitle>
                  <CardDescription>
                    Automatically post generated social content to your connected platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="blotatoApiKey">Blotato API Key</Label>
                    <Input
                      id="blotatoApiKey"
                      type="password"
                      value={blotatoApiKey}
                      onChange={(e) => setBlotatoApiKey(e.target.value)}
                      placeholder="Enter your Blotato API key"
                    />
                    <p className="text-xs text-foreground/50">
                      Get your API key from blotato.com → Settings → API
                    </p>
                  </div>

                  {blotatoApiKey && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">Blotato Connected</span>
                      </div>
                      <p className="text-sm text-foreground/60 mt-1">
                        Auto-post button will appear when generating content
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <a href="https://blotato.com" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Blotato
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coming Soon</CardTitle>
                  <CardDescription>
                    Additional integrations we&apos;re working on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Google Calendar", status: "Coming Soon" },
                      { name: "Stripe Payments", status: "Coming Soon" },
                      { name: "Email (Resend)", status: "Coming Soon" },
                      { name: "Zapier", status: "Coming Soon" },
                    ].map((integration) => (
                      <div
                        key={integration.name}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50"
                      >
                        <span className="text-foreground">{integration.name}</span>
                        <Badge variant="outline">{integration.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deploy Tab */}
          <TabsContent value="deploy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Deploy to Production
                  </CardTitle>
                  <CardDescription>
                    Deploy your agency website to the cloud in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Vercel */}
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                        <span className="text-white font-bold text-lg">▲</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Vercel (Recommended)</h3>
                        <p className="text-sm text-foreground/60">Free tier available, automatic deployments</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-3 rounded-lg bg-background text-sm font-mono">
                          npm install -g vercel && vercel
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyCommand("npm install -g vercel && vercel", "vercel")}
                        >
                          {copiedCommand === "vercel" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <a
                        href="https://vercel.com/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button variant="default">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Deploy on Vercel
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Netlify */}
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#00AD9F] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">N</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Netlify</h3>
                        <p className="text-sm text-foreground/60">Free tier available, simple setup</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-3 rounded-lg bg-background text-sm font-mono">
                          npm run build && npx netlify deploy --prod
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyCommand("npm run build && npx netlify deploy --prod", "netlify")}
                        >
                          {copiedCommand === "netlify" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Environment Variables Note */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-500">Important: Environment Variables</h4>
                        <p className="text-sm text-foreground/60 mt-1">
                          Don&apos;t forget to add your environment variables (GEMINI_API_KEY, etc.) in your deployment platform&apos;s settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Build Commands</CardTitle>
                  <CardDescription>
                    Commands for building and running your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "Development", command: "npm run dev", id: "dev" },
                      { label: "Production Build", command: "npm run build", id: "build" },
                      { label: "Start Production", command: "npm start", id: "start" },
                      { label: "Type Check", command: "npm run type-check", id: "typecheck" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <span className="w-32 text-sm text-foreground/60">{item.label}</span>
                        <code className="flex-1 p-2 rounded-lg bg-muted/50 text-sm font-mono">
                          {item.command}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyCommand(item.command, item.id)}
                        >
                          {copiedCommand === item.id ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button variant="glow" size="lg" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save All Settings
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
