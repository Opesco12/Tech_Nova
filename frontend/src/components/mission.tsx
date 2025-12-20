export default function Mission() {
  return (
    <section id="mission" className="relative z-10 py-32 px-12 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent">
      <h2
        className="text-5xl text-center mb-10 text-yellow-400 md:text-3xl"
        style={{ textShadow: "0 0 20px rgba(255, 215, 0, 0.4)" }}
      >
        Our Mission
      </h2>
      <div className="max-w-3xl mx-auto text-center text-xl text-gray-200 leading-relaxed md:text-lg space-y-6">
        <p className="text-2xl md:text-xl">
          <span className="text-yellow-400 font-bold">Innovation starts here. Africa builds here.</span>
        </p>
        <p>
          We believe in the power of African youth to create world-class technological solutions. Our mission is to
          foster a thriving ecosystem where young innovators can learn, collaborate, and build technologies that address
          real-world challenges.
        </p>
        <p>
          From idea to implementation, we support every step of the innovation journey, ensuring that African solutions
          are built by Africans, for Africa and the world.
        </p>
      </div>
    </section>
  )
}
