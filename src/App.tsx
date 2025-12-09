"use client"

import { useEffect } from "react"
import Header from "./components/header.tsx"
import Hero from "./components/hero.tsx"
import About from "./components/about.tsx"
import Impact from "./components/impact.tsx"
import Mission from "./components/mission.tsx"
import Stats from "./components/stats.tsx"
import CTA from "./components/cta.tsx"
import Footer from "./components/footer.tsx"
import ParticleBackground from "./components/particle-background"

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        const href = target.getAttribute("href")
        if (href) {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".fade-in-up")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="bg-black">
      <ParticleBackground />
      <Header />
      <Hero />
      <About />
      <Impact />
      <Mission />
      <Stats />
      <CTA />
      <Footer />
    </div>
  )
}
