"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  FileText,
  MessageSquare,
  Image,
  Video,
  Mail,
  Presentation,
  BookOpen,
  FileSpreadsheet,
  Clock,
  Repeat,
  Target,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const deliverables = [
  {
    icon: FileText,
    title: "Written Case Studies",
    description: "3 styles: traditional, story-driven, and data-focused formats",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: MessageSquare,
    title: "Social Media Posts",
    description: "12+ posts for LinkedIn, Twitter/X, and Instagram",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Image,
    title: "Quote Graphics",
    description: "4 designed quote cards with customer testimonials",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Video,
    title: "Video Script",
    description: "Testimonial script with timestamps and clip suggestions",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Mail,
    title: "Email Blurbs",
    description: "3 variations for newsletters, sales, and announcements",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Presentation,
    title: "Sales Slides",
    description: "5 PowerPoint-ready slides for your sales deck",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: BookOpen,
    title: "Blog Post",
    description: "800-1200 word SEO-optimized article",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: FileSpreadsheet,
    title: "One-Pager PDF",
    description: "Executive summary ready for sales meetings",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Save 10-20 Hours",
    description: "What takes days of writing, we deliver Instantly",
    stat: "10-20 hrs",
  },
  {
    icon: Repeat,
    title: "Consistent Quality",
    description: "Every case study follows proven frameworks",
    stat: "100%",
  },
  {
    icon: Target,
    title: "Multi-Format Output",
    description: "One interview becomes 10+ marketing assets",
    stat: "10+",
  },
  {
    icon: TrendingUp,
    title: "Publication Ready",
    description: "Content that's polished and ready to publish",
    stat: "Ready",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">One Interview.</span>{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Endless Content.
            </span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Upload your customer interview and receive a complete marketing content package
          </p>
        </motion.div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover glow className="h-full">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-4 text-foreground">Why Teams Choose Us</h3>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Stop spending days on case studies. Get professional content that converts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {benefit.stat}
              </div>
              <h4 className="font-semibold mb-1 text-foreground">{benefit.title}</h4>
              <p className="text-sm text-foreground/60">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
