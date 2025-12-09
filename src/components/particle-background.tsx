import { useEffect } from "react"

export default function ParticleBackground() {
  useEffect(() => {
    const bgAnimation = document.getElementById("bgAnimation")
    if (!bgAnimation) return

    // Clear existing particles
    bgAnimation.innerHTML = ""

    // Subtle, small golden particles spread across the screen
    const count = 120
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.position = "absolute"
      const size = Math.random() * 2 + 1 // 1px - 3px
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.background = `#ffd54a` // soft gold
      particle.style.borderRadius = "50%"
      particle.style.opacity = String(Math.random() * 0.6 + 0.2)
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 10 + "s"
      particle.style.animationDuration = Math.random() * 10 + 12 + "s"
      particle.style.filter = "blur(0.3px)"
      bgAnimation.appendChild(particle)
    }
  }, [])

  return (
    <>
      <div
        className="animated-bg fixed top-0 left-0 w-full h-full z-0"
        style={{
          background: "radial-gradient(ellipse at center, #07233a 0%, #031726 15%, #00060c 100%)",
          backgroundSize: "400% 400%",
          animation: "backgroundShift 20s ease infinite",
        }}
      />
      <div id="bgAnimation" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
    </>
  )
}
