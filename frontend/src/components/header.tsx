import { useEffect, useState } from "react"
import CTA from "./cta"

export default function Header() {
  const [isBlogs, setIsBlogs] = useState<boolean>(window.location.hash.startsWith("#/blogs"))
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    const onHash = () => setIsBlogs(window.location.hash.startsWith("#/blogs"))
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  return (
    <>
      <header className="fixed top-0 w-full px-6 py-4 flex justify-between items-center bg-black/90 backdrop-blur-lg z-50 border-b border-yellow-500/20">
        <div
          className="text-lg font-bold text-yellow-400 drop-shadow-lg"
          style={{ textShadow: "0 0 12px rgba(255, 215, 0, 0.5)", lineHeight: 1 }}
        >
          TechNova Global 🌍
        </div>

        {!isBlogs ? (
          <nav className="flex gap-4">
            <a href="#about" className="text-xs text-white font-medium leading-tight transition-all relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#impact" className="text-xs text-white font-medium leading-tight transition-all relative group">
              Impact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#mission" className="text-xs text-white font-medium leading-tight transition-all relative group">
              Mission
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#join" className="text-xs text-white font-medium leading-tight transition-all relative group">
              Join Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#/blogs" className="text-xs text-white font-medium leading-tight transition-all relative group">
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </a>
          </nav>
        ) : (
          <nav className="flex gap-4">
            <a href="#/" className="text-xs text-white font-medium leading-tight transition-all relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </a>
            <button
              onClick={() => setShowContact(true)}
              className="text-xs text-white font-medium leading-tight transition-all relative group"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </button>
          </nav>
        )}
      </header>

      {showContact && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-auto">
            <div className="flex justify-end p-2">
              <button onClick={() => setShowContact(false)} className="text-gray-600 px-3 py-1">Close</button>
            </div>
            <div className="p-6">
              <CTA />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
