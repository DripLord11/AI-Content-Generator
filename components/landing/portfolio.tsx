"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const portfolioItems = [
  {
    id: 1,
    company: "TechFlow Solutions",
    industry: "SaaS",
    title: "How TechFlow Increased Demo Bookings by 340%",
    description:
      "A deep dive into how implementing our case study content helped TechFlow Solutions dramatically improve their sales pipeline.",
    metrics: ["340% more demos", "50% shorter sales cycle", "$2.4M pipeline value"],
    image: "🚀",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    company: "GrowthLabs Agency",
    industry: "Marketing",
    title: "GrowthLabs' Secret to Winning Enterprise Clients",
    description:
      "How professional case studies helped this marketing agency land 12 new enterprise accounts in just 90 days.",
    metrics: ["12 new clients", "$480K ARR added", "ROI: 1,200%"],
    image: "📈",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    company: "DataVault Inc",
    industry: "Security",
    title: "Building Trust Through Customer Stories",
    description:
      "The cybersecurity company that used case studies to establish credibility and close deals 40% faster.",
    metrics: ["40% faster close", "15 testimonials", "Trust score: 9.4"],
    image: "🔐",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Our</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Real examples of how we transform customer interviews into compelling case studies
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover glow className="h-full group cursor-pointer">
                <CardContent className="p-0">
                  {/* Image/Preview Area */}
                  <div className={`relative h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center rounded-t-2xl`}>
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {item.image}
                    </span>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {item.industry}
                      </Badge>
                      <span className="text-xs text-foreground/50">{item.company}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-foreground/60 mb-4">{item.description}</p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {item.metrics.map((metric, metricIndex) => (
                        <div
                          key={metricIndex}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50"
                        >
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="text-xs font-medium text-foreground/70">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/50 text-sm">
            These are sample case studies. Replace with your own portfolio as you grow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
