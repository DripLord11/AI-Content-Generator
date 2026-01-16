"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Upload, Cpu, Download, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Send Your Interview",
    description:
      "Upload your customer interview recording (audio/video) or paste the transcript. We accept MP3, MP4, WAV, and text formats.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analysis & Generation",
    description:
      "Our AI analyzes the conversation, extracts key insights, metrics, and quotes, then generates 10+ unique marketing assets.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: Download,
    title: "Download & Publish",
    description:
      "Receive your complete content package Instantly. Preview everything online, download as a ZIP, or grab individual files.",
    color: "from-amber-500 to-orange-500",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">How It</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Three simple steps to transform your customer stories into marketing gold
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Arrow Between Steps (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-foreground/20" />
                  </div>
                )}

                <div className="relative bg-gradient-to-br from-muted/80 to-muted/40 rounded-3xl p-8 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow Between Steps (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="flex lg:hidden justify-center my-4">
                    <ArrowRight className="h-6 w-6 text-foreground/20 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* File Formats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-foreground/50 mb-4">Supported formats</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["MP3", "MP4", "WAV", "M4A", "WebM", "Text/Transcript"].map((format) => (
              <span
                key={format}
                className="px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm text-foreground/70"
              >
                {format}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
