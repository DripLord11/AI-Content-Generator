"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ArrowRight, Check, Sparkles, FileText, Share2, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { config } from "@/lib/config"

const keyBenefits = [
  {
    icon: FileText,
    title: "10+ Marketing Assets",
    description: "Case studies, social posts, quote graphics, video scripts, and more",
  },
  {
    icon: Clock,
    title: "24-Hour Delivery",
    description: "Get your complete content package in just one day",
  },
  {
    icon: Share2,
    title: "Ready to Publish",
    description: "Polished content you can use immediately",
  },
  {
    icon: Mail,
    title: "Multiple Formats",
    description: "PDF, DOCX, social-ready images, and raw text",
  },
]

const whatYouGet = [
  "Written case study in 3 different styles",
  "12+ social media posts for all platforms",
  "4 designed quote graphics",
  "Video testimonial script with timestamps",
  "3 email newsletter variations",
  "5 PowerPoint-ready sales slides",
  "Full blog post (800-1200 words)",
  "One-pager executive summary",
]

export default function VSLPage() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [videoProgress, setVideoProgress] = React.useState(0)

  // Simulate video progress
  React.useEffect(() => {
    if (isPlaying && videoProgress < 100) {
      const timer = setInterval(() => {
        setVideoProgress((prev) => Math.min(prev + 1, 100))
      }, 200)
      return () => clearInterval(timer)
    }
  }, [isPlaying, videoProgress])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-secondary p-1.5 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-foreground">{config.businessName}</span>
          </Link>
          <Link href="/book">
            <Button variant="glow">Book a Call</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-6">Watch This 3-Minute Video</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">See How We Turn One Interview</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Into 10+ Marketing Assets
            </span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Stop spending weeks on case studies. Get professional content Instantly.
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              {!isPlaying ? (
                <div className="text-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/25 hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors" />
                  </button>
                  <p className="text-foreground/60 mt-6">Click to watch (3 minutes)</p>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/90">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Play className="w-8 h-8" fill="white" />
                    </div>
                    <p className="text-lg mb-2">Video Playing...</p>
                    <p className="text-sm text-white/60">
                      (Replace with your YouTube/Vimeo embed)
                    </p>
                  </div>
                </div>
              )}
            </div>
            {isPlaying && (
              <div className="px-4 py-3 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-foreground/60">Progress</span>
                  <Progress value={videoProgress} className="flex-1 h-2" />
                  <span className="text-sm text-foreground/60">{videoProgress}%</span>
                </div>
              </div>
            )}
          </Card>

          {/* Video placeholder note */}
          <p className="text-center text-sm text-foreground/40 mt-4">
            Upload your video to YouTube/Vimeo and embed it here. Use the Calendly scheduling link for CTAs.
          </p>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} hover className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-foreground/60">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* What You Get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                What You Get With Every Order
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whatYouGet.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Trusted by Marketing Teams Everywhere
            </h2>
            <p className="text-foreground/60">
              Join hundreds of companies using our AI-powered case study service
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {/* Logo placeholders - replace with real client logos */}
            {["Company A", "Company B", "Company C", "Company D", "Company E"].map((company) => (
              <div
                key={company}
                className="px-8 py-4 rounded-xl bg-muted/50 text-foreground/40 font-medium"
              >
                {company}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-foreground/40 mt-4">
            Replace with your client logos as you grow your business
          </p>
        </motion.div>

        {/* Video Transcript/Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Video Summary
              </h2>
              <div className="prose-content text-foreground/70 space-y-4">
                <p>
                  Creating compelling case studies is one of the most effective ways to build
                  trust and close deals. But it&apos;s also incredibly time-consuming.
                </p>
                <p>
                  Most marketing teams spend 2-3 weeks creating a single case study. They have
                  to conduct interviews, transcribe recordings, write multiple drafts, create
                  graphics, and format everything for different channels.
                </p>
                <p>
                  <strong>We&apos;ve automated this entire process.</strong> Our AI analyzes your
                  customer interviews and generates a complete content package in just Instantly.
                </p>
                <p>
                  You get everything you need to promote your customer success story: written
                  case studies in multiple formats, social media posts ready to publish, quote
                  graphics for your website, video scripts with timestamps, email content, sales
                  slides, and more.
                </p>
                <p>
                  <strong>The result?</strong> You save 10-20 hours per case study, maintain
                  consistent quality across all your content, and can produce more case studies
                  than ever before.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Customer Stories?
              </h2>
              <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
                Book a free strategy call and see how we can help you create compelling
                case studies that close deals.
              </p>
              <Link href="/book">
                <Button variant="glow" size="xl" className="group">
                  Book Your Free Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-sm text-foreground/50 mt-4">
                No obligation. 30-minute consultation.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-foreground/40">
            &copy; {new Date().getFullYear()} {config.businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
