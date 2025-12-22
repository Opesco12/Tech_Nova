
import { useEffect, useState, Suspense, lazy } from "react"
import Header from "./components/header.tsx"
import Hero from "./components/hero.tsx"
import About from "./components/about.tsx"
import Impact from "./components/impact.tsx"
import Mission from "./components/mission.tsx"
import Stats from "./components/stats.tsx"
import CTA from "./components/cta.tsx"
import Footer from "./components/footer.tsx"
import ParticleBackground from "./components/particle-background"

const BlogsPage = lazy(() => import("./pages/BlogsPage"))
const BlogPage = lazy(() => import("./pages/BlogPage"))

function LandingContent() {
  useEffect(() => {
    // Smooth-scroll for in-page anchors (ignore hash routes like #/blogs)
    const handler = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      const href = target?.getAttribute?.("href") || ""
      if (!href.startsWith("#") || href.startsWith("#/")) return
      e.preventDefault()
      try {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
      } catch (err) {
        /* ignore invalid selectors */
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((el) => el.addEventListener("click", handler))
    return () => document.querySelectorAll('a[href^="#"]').forEach((el) => el.removeEventListener("click", handler))
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )
    document.querySelectorAll(".fade-in-up").forEach((el) => obs.observe(el))
    return () => document.querySelectorAll(".fade-in-up").forEach((el) => obs.unobserve(el))
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

export default function HomeRouter() {
  const [route, setRoute] = useState<string>(window.location.hash || "#/")

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/")
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  if (route.startsWith("#/blogs/")) {
    const id = route.split("/")[2]
    return (
      <>
        <Header />
        <Suspense fallback={<div className="p-8 text-center">Loading post…</div>}>
          <BlogPage id={id} />
        </Suspense>
      </>
    )
  }

  if (route === "#/blogs") {
    return (
      <>
        <Header />
        <Suspense fallback={<div className="p-8 text-center">Loading blogs…</div>}>
          <BlogsPage />
        </Suspense>
      </>
    )
  }

  return <LandingContent />
}