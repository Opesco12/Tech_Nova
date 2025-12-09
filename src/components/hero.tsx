export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center pt-32 px-5 relative">
      <h1
        className="font-bold mb-5 hero-title"
        style={{
          fontSize: "40px",
          fontWeight: 700,
          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Building the Future Together
      </h1>
      <p
        className="max-w-3xl mb-10 text-gray-200 hero-subtitle"
        style={{
          fontSize: "18px",
          fontWeight: 400,
        }}
      >
        A movement of young African innovators using technology and AI to solve real-world problems and transform
        communities across the continent.
      </p>
      <button
        className="text-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-bold cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hero-button"
        style={{
          padding: "14px 34px",
          fontSize: "16px",
          fontWeight: 700,
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)",
        }}
      >
        Get Started 💡
      </button>
    </section>
  )
}
