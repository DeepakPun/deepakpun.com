import React from 'react'

const skills: string[] = ["TypeScript", "React", "Next.js", "Tailwind", "Docker", "Node.js"]

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-slate-50 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="px-6 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-400 transition-colors cursor-default font-medium text-slate-800"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
