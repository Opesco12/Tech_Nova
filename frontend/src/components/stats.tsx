const stats = [
  { number: "500+", label: "Young Innovators" },
  { number: "50+", label: "Projects Launched" },
  { number: "15+", label: "Countries Reached" },
  { number: "100K+", label: "Lives Impacted" },
]

export default function Stats() {
  return (
    <section className="py-32 px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="fade-in-up text-center">
            <div
              className="text-6xl font-bold text-yellow-400 mb-3 md:text-5xl"
              style={{ textShadow: "0 0 20px rgba(255, 215, 0, 0.6)" }}
            >
              {stat.number}
            </div>
            <div className="text-xl text-gray-200 md:text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
