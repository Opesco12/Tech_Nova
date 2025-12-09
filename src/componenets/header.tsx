export default function Header() {
  return (
    <header className="fixed top-0 w-full px-12 py-5 flex justify-between items-center bg-black/90 backdrop-blur-lg z-50 border-b border-yellow-500/20">
      <div
        className="text-2xl font-bold text-yellow-400 drop-shadow-lg"
        style={{ textShadow: "0 0 20px rgba(255, 215, 0, 0.6)" }}
      >
        TechNova Global 🌍
      </div>
      <nav className="flex gap-8">
        <a href="#about" className="text-white font-medium transition-all relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </a>
        <a href="#impact" className="text-white font-medium transition-all relative group">
          Impact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </a>
        <a href="#mission" className="text-white font-medium transition-all relative group">
          Mission
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </a>
        <a href="#join" className="text-white font-medium transition-all relative group">
          Join Us
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </a>
      </nav>
    </header>
  )
}
