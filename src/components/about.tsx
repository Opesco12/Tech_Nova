export default function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-12 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent">
      <h2
        className="text-5xl text-center mb-12 text-yellow-400 md:text-3xl"
        style={{ textShadow: "0 0 20px rgba(255, 215, 0, 0.4)" }}
      >
        Who We Are
      </h2>
      <div className="max-w-4xl mx-auto text-xl text-center text-gray-200 leading-relaxed md:text-lg space-y-6">
        <p>
          TechNova Global is a youth-led African tech movement dedicated to harnessing the power of technology and
          artificial intelligence to address pressing challenges across the continent. We are innovators, dreamers, and
          builders committed to creating impactful solutions that matter.
        </p>
        <p>
          Our community brings together talented young minds passionate about using technology as a force for positive
          change in Africa and beyond.
        </p>
      </div>
    </section>
  )
}
