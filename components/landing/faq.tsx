"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What do I need to provide for a case study?",
    answer:
      "Just a customer interview recording (audio or video) or a transcript. This can be a Zoom recording, phone call recording, or even a written interview. We handle everything else - transcription, analysis, and content generation.",
  },
  {
    question: "How long does it take to receive my content?",
    answer:
      "Our standard turnaround is 24-48 hours for the Essential and Professional packages. Premium packages include same-day rush delivery. You'll receive an email notification when your content package is ready.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept MP3, MP4, WAV, M4A, and WebM audio/video files up to 25MB. You can also paste a text transcript directly. For larger files, contact us for alternative upload options.",
  },
  {
    question: "Can I request revisions?",
    answer:
      "Absolutely! Our Professional package includes 1 round of revisions, and the Premium package includes 2 rounds. We want you to be completely satisfied with the final content.",
  },
  {
    question: "Is the content original and unique?",
    answer:
      "Yes! Each piece of content is generated specifically from your customer's interview. The AI analyzes the unique details, metrics, and quotes from your customer's story to create completely original content.",
  },
  {
    question: "Do you offer volume discounts?",
    answer:
      "Yes! We offer discounts for packages of 5+ case studies. Contact us for custom pricing on larger volumes or ongoing content needs.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy with the content quality, we'll work with you to make it right or provide a full refund.",
  },
  {
    question: "Can I white-label the content?",
    answer:
      "Of course! All content we create is yours to use however you like. There's no attribution required - publish it under your brand, share it with your customers, or use it in your marketing materials.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Everything you need to know about our case study service
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-muted/30 border border-border/50 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
        >
          <h3 className="text-xl font-bold mb-2 text-foreground">Still have questions?</h3>
          <p className="text-foreground/60 mb-4">
            We&apos;re here to help. Book a call and we&apos;ll answer all your questions.
          </p>
          <a
            href="/book"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Book a Free Call →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
