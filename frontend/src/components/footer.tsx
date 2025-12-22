export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 bg-black/95 border-t border-yellow-500/20 text-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold text-yellow-400 mb-2">TechNova Global 🌍</div>
          <p className="text-sm text-gray-300 mb-3">Building the future together — empowering African youth through technology, education and community.</p>
          <p className="text-xs text-gray-400">© 2025 TechNova Global.</p>
        </div>

        <div className="flex flex-col sm:items-start">
          <h4 className="font-semibold mb-3">Quick links</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <a href="#/" className="hover:underline">Home</a>
            <a href="#/blogs" className="hover:underline">Blogs</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#join" className="hover:underline">Join Us</a>
          </nav>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-300">Email: <a href="mailto:hello@technova.example" className="text-yellow-400 hover:underline">hello@technova.example</a></p>
          <p className="text-sm text-gray-300">Phone: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a></p>

          <div className="mt-4">
            <h5 className="font-medium text-sm mb-2">Follow us</h5>
            <div className="flex gap-4">
              <a href="#" title="X / Twitter" className="text-yellow-400 text-xl transition-all hover:scale-110">𝕏</a>
              <a href="#" title="LinkedIn" className="text-yellow-400 text-xl transition-all hover:scale-110">in</a>
              <a href="#" title="Instagram" className="text-yellow-400 text-xl transition-all hover:scale-110">📷</a>
              <a href="#" title="GitHub" className="text-yellow-400 text-xl transition-all hover:scale-110">⌘</a>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="font-medium text-sm mb-2">Newsletter</h5>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input aria-label="Email" type="email" placeholder="you@company.com" className="px-3 py-2 rounded bg-white/5 text-sm w-full" />
              <button className="px-3 py-2 bg-yellow-400 text-black rounded text-sm font-semibold">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-500">
        <p>Designed with ❤️ • Privacy • Terms</p>
      </div>
    </footer>
  )
}
