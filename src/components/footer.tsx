export default function Footer() {
  return (
    <footer className="py-12 px-12 text-center bg-black/90 border-t border-yellow-500/20">
      <p className="text-gray-200 mb-5">© 2025 TechNova Global. Building the Future Together.</p>
      <p className="text-gray-200 mb-5">Empowering African Youth Through Technology & Innovation</p>
      <div className="flex justify-center gap-8 mt-5">
        <a
          href="#"
          title="Twitter"
          className="text-yellow-400 text-2xl transition-all hover:scale-125 hover:drop-shadow-lg"
        >
          𝕏
        </a>
        <a
          href="#"
          title="LinkedIn"
          className="text-yellow-400 text-2xl transition-all hover:scale-125 hover:drop-shadow-lg"
        >
          in
        </a>
        <a
          href="#"
          title="Instagram"
          className="text-yellow-400 text-2xl transition-all hover:scale-125 hover:drop-shadow-lg"
        >
          📷
        </a>
        <a
          href="#"
          title="GitHub"
          className="text-yellow-400 text-2xl transition-all hover:scale-125 hover:drop-shadow-lg"
        >
          ⌘
        </a>
      </div>
    </footer>
  )
}
