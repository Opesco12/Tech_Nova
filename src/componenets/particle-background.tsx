import { useEffect } from "react"

export default function ParticleBackground() {
  useEffect(() => {
    const bgAnimation = document.getElementById("bgAnimation")
    if (!bgAnimation) return

    // Generate animated particles with flowing motion
    for (let i = 0; i < 80; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 4 + 2 + "px"
      particle.style.height = particle.style.width
      particle.style.background = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`
      particle.style.borderRadius = "50%"
      particle.style.opacity = String(Math.random() * 0.7 + 0.2)
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 20 + "s"
      particle.style.animationDuration = Math.random() * 10 + 15 + "s"
      particle.style.filter = "blur(0.5px)"
      bgAnimation.appendChild(particle)
    }
  }, [])

  return (
    <>
      <div
        className="animated-bg fixed top-0 left-0 w-full h-full z-0"
        style={{
          background: "linear-gradient(45deg, #000000, #1a0033, #003366, #001a00, #330000, #000000)",
          backgroundSize: "400% 400%",
          animation: "backgroundShift 15s ease infinite",
        }}
      />
      <div id="bgAnimation" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
    </>
  )
}
