"use client"

import * as React from "react"
import {
  Navbar,
  Hero,
  Services,
  HowItWorks,
  Pricing,
  Portfolio,
  Testimonials,
  FAQ,
  Footer,
} from "@/components/landing"

export default function HomePage() {
  const [darkMode, setDarkMode] = React.useState(true)

  React.useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.setAttribute("data-theme", !darkMode ? "dark" : "light")
  }

  return (
    <main className="relative">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
