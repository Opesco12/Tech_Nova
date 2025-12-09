export default function CTA() {
  return (
    <section
      id="join"
      className="py-32 px-12 text-center bg-gradient-to-b from-transparent via-blue-950/30 to-transparent"
    >
      <h2
        className="text-5xl mb-8 text-yellow-400 md:text-3xl"
        style={{ textShadow: "0 0 20px rgba(255, 215, 0, 0.4)" }}
      >
        Join the Movement
      </h2>
      <p className="text-2xl mb-10 text-gray-200 md:text-xl">
        Be part of Africa's technological revolution. Together, we're building solutions that matter.
      </p>
      <button
        className="px-10 py-4 text-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-bold cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
        style={{ boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)" }}
      >
        Join TechNova Global
      </button>
    </section>
  )
}
