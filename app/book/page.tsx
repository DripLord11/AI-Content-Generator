"use client"

import * as React from "react"
import Link from "next/link"
import Script from "next/script"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles, Calendar, Clock, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { config } from "@/lib/config"

// Check if Calendly is configured
const isCalendlyConfigured = config.calendlyUrl && config.calendlyUrl !== "https://calendly.com/your-username"

interface FormData {
  name: string
  email: string
  company: string
  caseStudyType: string
  challenges: string
  referralSource: string
}

const caseStudyTypes = [
  "Customer Success Story",
  "Product Implementation",
  "ROI/Results Story",
  "Technical Case Study",
  "Competitive Win Story",
  "Other",
]

const referralSources = [
  "Google Search",
  "LinkedIn",
  "Referral",
  "Social Media",
  "Podcast/YouTube",
  "Other",
]

export default function BookPage() {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    company: "",
    caseStudyType: "",
    challenges: "",
    referralSource: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.email.includes("@") &&
      formData.company.trim()
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary to-secondary p-1.5 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">{config.businessName}</span>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Thank You, {formData.name.split(" ")[0]}!
            </h1>
            <p className="text-lg text-foreground/60 mb-8">
              We&apos;ve received your request. Our team will reach out withInstantly to schedule your strategy call.
            </p>

            <Card className="text-left mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">What happens next:</h3>
                <ul className="space-y-3">
                  {[
                    "You'll receive a confirmation email shortly",
                    "Our team will review your information",
                    "We'll send you a calendar link to book your call",
                    "Prepare any interview recordings or transcripts you'd like to discuss",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
              <Link href="/vsl">
                <Button variant="glow" size="lg">
                  Watch How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-secondary p-1.5 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-foreground">{config.businessName}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-foreground">Book Your Free</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Strategy Call
              </span>
            </h1>
            <p className="text-lg text-foreground/60 mb-8">
              Let&apos;s discuss how we can transform your customer success stories into powerful marketing content.
            </p>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: Calendar,
                  title: "30-Minute Consultation",
                  description: "Discuss your case study needs and get personalized recommendations",
                },
                {
                  icon: Clock,
                  title: "Quick Response",
                  description: "We'll reach out withInstantly to schedule your call",
                },
                {
                  icon: CheckCircle,
                  title: "No Obligation",
                  description: "Get valuable insights even if you decide not to proceed",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-foreground/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calendly Embed */}
            {isCalendlyConfigured && (
              <Card className="bg-muted/30 overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="calendly-inline-widget"
                    data-url={config.calendlyUrl}
                    style={{ minWidth: '320px', height: '630px' }}
                  />
                  <Script
                    src="https://assets.calendly.com/assets/external/widget.js"
                    strategy="lazyOnload"
                  />
                </CardContent>
              </Card>
            )}

            {/* Fallback when Calendly not configured */}
            {!isCalendlyConfigured && (
              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-foreground/60 mb-4">
                    Calendar booking will appear here once configured.
                  </p>
                  <p className="text-sm text-foreground/50">
                    Set your Calendly URL in <code className="text-primary">config/business-config.json</code>
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Request Your Call</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll be in touch shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => updateFormData("company", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caseStudyType">Type of Case Study Needed</Label>
                    <Select
                      value={formData.caseStudyType}
                      onValueChange={(v) => updateFormData("caseStudyType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {caseStudyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenges">Current Challenges</Label>
                    <Textarea
                      id="challenges"
                      placeholder="What challenges are you facing with case studies or testimonials?"
                      value={formData.challenges}
                      onChange={(e) => updateFormData("challenges", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralSource">How did you hear about us?</Label>
                    <Select
                      value={formData.referralSource}
                      onValueChange={(v) => updateFormData("referralSource", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select source..." />
                      </SelectTrigger>
                      <SelectContent>
                        {referralSources.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Request Strategy Call
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-foreground/50">
                    By submitting, you agree to receive communications from us.
                    <br />
                    We respect your privacy and will never spam you.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
