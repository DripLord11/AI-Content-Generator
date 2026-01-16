"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, Twitter, Linkedin, Instagram, Mail } from "lucide-react"
import { config } from "@/lib/config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = {
    main: [
      { name: "Services", href: "#services" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "FAQ", href: "#faq" },
    ],
    company: [
      { name: "Book a Call", href: "/book" },
      { name: "Watch Demo", href: "/vsl" },
      { name: "Submit Interview", href: "/intake" },
      { name: "Admin Dashboard", href: "/admin" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: config.social.twitter || "#", label: "Twitter" },
    { icon: Linkedin, href: config.social.linkedin || "#", label: "LinkedIn" },
    { icon: Instagram, href: config.social.instagram || "#", label: "Instagram" },
  ]

  return (
    <footer className="relative border-t border-border/50">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Ready to Transform Your Customer Stories?
            </h2>
            <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
              Book a free strategy call and see how we can help you turn customer wins into marketing gold.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Book Your Free Strategy Call
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {config.businessName}
              </span>
            </Link>
            <p className="text-foreground/60 text-sm mb-4">{config.tagline}</p>
            <a
              href={`mailto:${config.contactEmail}`}
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              {config.contactEmail}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-foreground/50 hover:text-foreground/70 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-foreground/40">
            &copy; {currentYear} {config.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
