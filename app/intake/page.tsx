"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles, Loader2, CheckCircle, Copy, Download, FileText, Share2, Mail, BarChart3, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/forms/file-upload"
import { useConfig } from "@/lib/config-context"
import { ToneStyle } from "@/lib/types"

type InputMethod = "file" | "text"

interface FormData {
  customerName: string
  customerCompany: string
  projectName: string
  productDetails: string
  keyAchievements: string
  targetAudience: string
  tone: ToneStyle
  specialRequests: string
}

interface GeneratedContent {
  caseStudy: {
    title: string
    summary: string
    challenge: string
    solution: string
    results: string
    quote: string
  }
  socialPosts: Array<{
    platform: string
    content: string
    hashtags: string[]
  }>
  emailBlurb: {
    subject: string
    preview: string
    body: string
  }
  keyStats: Array<{
    value: string
    label: string
  }>
}

export default function IntakePage() {
  const { config, blotatoApiKey } = useConfig()
  const [inputMethod, setInputMethod] = React.useState<InputMethod>("file")
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [transcript, setTranscript] = React.useState("")
  const [formData, setFormData] = React.useState<FormData>({
    customerName: "",
    customerCompany: "",
    projectName: "",
    productDetails: "",
    keyAchievements: "",
    targetAudience: "",
    tone: "professional",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [status, setStatus] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [projectId, setProjectId] = React.useState<string | null>(null)
  const [generatedContent, setGeneratedContent] = React.useState<GeneratedContent | null>(null)
  const [copiedField, setCopiedField] = React.useState<string | null>(null)
  const [isPosting, setIsPosting] = React.useState(false)
  const [postStatus, setPostStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    const hasInput = inputMethod === "file" ? selectedFile !== null : transcript.trim().length > 100
    const hasRequiredFields =
      formData.customerName.trim() &&
      formData.customerCompany.trim() &&
      formData.projectName.trim() &&
      formData.productDetails.trim()
    return hasInput && hasRequiredFields
  }

  const copyToClipboard = async (text: string, fieldName: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleAutoPost = async () => {
    if (!generatedContent || !blotatoApiKey) return

    setIsPosting(true)
    setPostStatus('idle')

    try {
      const response = await fetch('/api/blotato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: blotatoApiKey,
          posts: generatedContent.socialPosts.map(post => ({
            platform: post.platform,
            content: post.content + '\n\n' + post.hashtags.map(h => h.startsWith('#') ? h : `#${h}`).join(' '),
            hashtags: post.hashtags,
          })),
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setPostStatus('success')
      } else {
        setPostStatus('error')
      }
    } catch {
      setPostStatus('error')
    }

    setIsPosting(false)
    setTimeout(() => setPostStatus('idle'), 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsSubmitting(true)
    setError(null)
    setProgress(0)
    setStatus("Preparing your interview...")
    setGeneratedContent(null)

    try {
      // Show initial progress
      setProgress(10)
      setStatus("Sending to AI...")

      // Get transcript from file or text
      let transcriptText = transcript
      if (inputMethod === "file" && selectedFile) {
        // For demo, we'll use placeholder text if it's an audio file
        // In production, this would go through a transcription service
        transcriptText = `[Interview with ${formData.customerName} from ${formData.customerCompany}]

This interview discusses their experience with ${formData.projectName}.
${formData.productDetails}

Key achievements mentioned: ${formData.keyAchievements || "Significant improvements across key metrics"}

The customer expressed satisfaction with the results and would recommend the product.`
      }

      setProgress(30)
      setStatus("AI is analyzing your content...")

      // Call the actual API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerCompany: formData.customerCompany,
          projectName: formData.projectName,
          productDetails: formData.productDetails,
          keyAchievements: formData.keyAchievements,
          tone: formData.tone,
          transcript: transcriptText
        })
      })

      setProgress(70)
      setStatus("Processing AI response...")

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content')
      }

      setProgress(100)
      setStatus("Content generated!")

      // Store the generated content and project ID
      setGeneratedContent(data.content)
      setProjectId(data.projectId)

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (projectId && generatedContent) {
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
            <Button variant="outline" size="sm" onClick={() => { setProjectId(null); setGeneratedContent(null) }}>
              Generate New
            </Button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Content Generated!
            </h1>
            <p className="text-foreground/60">
              Here&apos;s your AI-generated marketing package for {formData.customerCompany}
            </p>
          </motion.div>

          {/* Key Stats */}
          {generatedContent.keyStats && generatedContent.keyStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {generatedContent.keyStats.map((stat, idx) => (
                <Card key={idx} className="text-center">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-foreground/60">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <CardTitle>Case Study</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `${generatedContent.caseStudy.title}\n\n${generatedContent.caseStudy.summary}\n\nChallenge:\n${generatedContent.caseStudy.challenge}\n\nSolution:\n${generatedContent.caseStudy.solution}\n\nResults:\n${generatedContent.caseStudy.results}\n\n"${generatedContent.caseStudy.quote}"`,
                        'caseStudy'
                      )}
                    >
                      {copiedField === 'caseStudy' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{generatedContent.caseStudy.title}</h3>
                    <p className="text-foreground/70">{generatedContent.caseStudy.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Challenge</h4>
                    <p className="text-foreground/70 text-sm">{generatedContent.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Solution</h4>
                    <p className="text-foreground/70 text-sm">{generatedContent.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Results</h4>
                    <p className="text-foreground/70 text-sm">{generatedContent.caseStudy.results}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <blockquote className="italic text-foreground/80 border-l-4 border-primary pl-4">
                      &ldquo;{generatedContent.caseStudy.quote}&rdquo;
                    </blockquote>
                    <p className="text-sm text-foreground/50 mt-2">— {formData.customerName}, {formData.customerCompany}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Posts & Email */}
            <div className="space-y-6">
              {/* Social Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-secondary" />
                      <CardTitle>Social Posts</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generatedContent.socialPosts.map((post, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium uppercase text-primary">
                            {post.platform}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags.join(' '), `social-${idx}`)}
                          >
                            {copiedField === `social-${idx}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-foreground/80 text-sm mb-2">{post.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags.map((tag, tagIdx) => (
                            <span key={tagIdx} className="text-xs text-primary">
                              {tag.startsWith('#') ? tag : `#${tag}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Email Blurb */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-accent" />
                        <CardTitle>Email Announcement</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `Subject: ${generatedContent.emailBlurb.subject}\n\n${generatedContent.emailBlurb.body}`,
                          'email'
                        )}
                      >
                        {copiedField === 'email' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <p className="text-xs text-foreground/50 uppercase mb-1">Subject</p>
                      <p className="text-foreground font-medium">{generatedContent.emailBlurb.subject}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <p className="text-xs text-foreground/50 uppercase mb-1">Preview</p>
                      <p className="text-foreground/70 text-sm">{generatedContent.emailBlurb.preview}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <p className="text-xs text-foreground/50 uppercase mb-1">Body</p>
                      <p className="text-foreground/70 text-sm whitespace-pre-wrap">{generatedContent.emailBlurb.body}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              variant="glow"
              size="lg"
              onClick={() => {
                const allContent = `# ${generatedContent.caseStudy.title}

## Summary
${generatedContent.caseStudy.summary}

## Challenge
${generatedContent.caseStudy.challenge}

## Solution
${generatedContent.caseStudy.solution}

## Results
${generatedContent.caseStudy.results}

## Quote
"${generatedContent.caseStudy.quote}"
— ${formData.customerName}, ${formData.customerCompany}

---

## Social Posts

${generatedContent.socialPosts.map(p => `### ${p.platform}\n${p.content}\n${p.hashtags.join(' ')}`).join('\n\n')}

---

## Email

Subject: ${generatedContent.emailBlurb.subject}

${generatedContent.emailBlurb.body}
`
                const blob = new Blob([allContent], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `${formData.customerCompany.replace(/\s+/g, '-')}-case-study.md`
                a.click()
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download All Content
            </Button>
            {blotatoApiKey && (
              <Button
                variant={postStatus === 'success' ? 'default' : 'outline'}
                size="lg"
                onClick={handleAutoPost}
                disabled={isPosting}
                className={postStatus === 'success' ? 'bg-green-600 hover:bg-green-700' : postStatus === 'error' ? 'border-red-500 text-red-500' : ''}
              >
                {isPosting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : postStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Posted to Social!
                  </>
                ) : postStatus === 'error' ? (
                  <>
                    <Share2 className="w-5 h-5 mr-2" />
                    Post Failed - Retry
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Auto-Post to Social
                  </>
                )}
              </Button>
            )}
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
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
          <Link href="/" className="flex items-center space-x-2 text-foreground/70 hover:text-foreground transition-colors">
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-foreground">Submit Your</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Interview
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Upload your customer interview and we&apos;ll transform it into 10+ marketing assets
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Interview Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Interview Content</CardTitle>
                <CardDescription>
                  Upload an audio/video file or paste the transcript
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as InputMethod)}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="file">Upload File</TabsTrigger>
                    <TabsTrigger value="text">Paste Transcript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="file">
                    <FileUpload
                      onFileSelect={setSelectedFile}
                      selectedFile={selectedFile}
                    />
                  </TabsContent>
                  <TabsContent value="text">
                    <Textarea
                      placeholder="Paste your interview transcript here... (minimum 100 characters)"
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="min-h-[200px]"
                    />
                    <p className="text-xs text-foreground/50 mt-2">
                      {transcript.length} characters
                      {transcript.length > 0 && transcript.length < 100 && (
                        <span className="text-amber-500"> (minimum 100 required)</span>
                      )}
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customer Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
                <CardDescription>
                  Tell us about the customer featured in this case study
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      placeholder="John Smith"
                      value={formData.customerName}
                      onChange={(e) => updateFormData("customerName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerCompany">Company Name *</Label>
                    <Input
                      id="customerCompany"
                      placeholder="Acme Corporation"
                      value={formData.customerCompany}
                      onChange={(e) => updateFormData("customerCompany", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project/Product Name *</Label>
                  <Input
                    id="projectName"
                    placeholder="What product or project did they use?"
                    value={formData.projectName}
                    onChange={(e) => updateFormData("projectName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productDetails">Product/Service Details *</Label>
                  <Textarea
                    id="productDetails"
                    placeholder="Describe the product or service they used..."
                    value={formData.productDetails}
                    onChange={(e) => updateFormData("productDetails", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
                <CardDescription>
                  Help us tailor the content to your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="keyAchievements">Key Achievements/Metrics</Label>
                  <Textarea
                    id="keyAchievements"
                    placeholder="What results or metrics should we highlight? (e.g., 50% increase in revenue, 2x growth, etc.)"
                    value={formData.keyAchievements}
                    onChange={(e) => updateFormData("keyAchievements", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      placeholder="Who will read this case study?"
                      value={formData.targetAudience}
                      onChange={(e) => updateFormData("targetAudience", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tone">Content Tone</Label>
                    <Select
                      value={formData.tone}
                      onValueChange={(v) => updateFormData("tone", v as ToneStyle)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual & Friendly</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any specific requirements or preferences for the content?"
                    value={formData.specialRequests}
                    onChange={(e) => updateFormData("specialRequests", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
            >
              {error}
            </motion.div>
          )}

          {/* Processing State */}
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    <span className="text-foreground font-medium">{status}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-foreground/60 mt-2 text-right">{progress}%</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end"
          >
            <Button
              type="submit"
              variant="glow"
              size="xl"
              disabled={!isFormValid() || isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Content Package
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </main>
    </div>
  )
}
