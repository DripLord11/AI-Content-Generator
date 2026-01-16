import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ClientWinsAI | Transform Customer Wins Into Marketing Gold",
  description:
    "AI-powered case study service that generates marketing assets from a single customer interview. Get case studies, social posts, and more instantly.",
  keywords: [
    "case study",
    "customer success story",
    "B2B marketing",
    "testimonials",
    "social proof",
    "content generation",
    "AI writing",
  ],
  authors: [{ name: "ClientWinsAI" }],
  openGraph: {
    title: "ClientWinsAI | Transform Customer Wins Into Marketing Gold",
    description:
      "AI-powered case study service that generates marketing assets from a single customer interview.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientWinsAI",
    description:
      "Transform customer interviews into marketing assets instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
