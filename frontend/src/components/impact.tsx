const impactCards = [
  {
    icon: "🚗",
    title: "Road Safety",
    description:
      "Developing intelligent systems to reduce accidents and save lives on African roads through AI-powered monitoring and analytics.",
  },
  {
    icon: "📚",
    title: "Education",
    description:
      "Creating accessible learning platforms and tools that empower students and educators with cutting-edge technology.",
  },
  {
    icon: "🌾",
    title: "Agriculture",
    description:
      "Building smart farming solutions that help farmers increase yields, reduce waste, and optimize resources using data-driven insights.",
  },
  {
    icon: "🔒",
    title: "Security",
    description:
      "Innovating security technologies that protect communities and businesses through advanced AI and surveillance systems.",
  },
]

export default function Impact() {
  return (
    <section id="impact" className="py-32 px-12">
      <h2 className="fade-in-up visible text-5xl md:text-3xl text-center mb-16 text-yellow-400">
        Our Impact Areas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {impactCards.map((card, index) => (
          <div
            key={index}
            className="fade-in-up bg-blue-950/60 p-8 rounded-3xl border border-yellow-500/30 transition-all hover:translate-y-2 hover:border-yellow-500/80 hover:shadow-lg backdrop-blur-lg"
          >
            <div className="text-2xl mb-4">{card.icon}</div>

            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              {card.title}
            </h3>

            <p className="text-gray-200 leading-relaxed text-sm">
              {card.description}
            </p>
          </div>

        ))}
      </div>
    </section>
  )
}
