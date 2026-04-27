import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 border-b-4 border-blue-500 inline-block">
        About Me
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed">
        I am a software engineer focused on building modular, type-safe applications.
        I love solving complex problems with simple, elegant code.
      </p>
    </section>
  )
}

export default About
