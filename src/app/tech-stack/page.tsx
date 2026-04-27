"use client"
import { motion } from 'framer-motion'
import { FaAws } from 'react-icons/fa'
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript,
  SiNodedotjs, SiExpress,
  // SiFlask, SiPython,
  SiMongodb, SiGithubactions, SiDocker,
  SiEjs,
  SiJavascript,
  SiBulma,
  SiBootstrap,
  SiPostman
} from 'react-icons/si'

const categories = [
  {
    title: "FRONTEND",
    techs: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Bulma", icon: SiBulma },
      { name: "Bootstrap", icon: SiBootstrap },
    ]
  },
  {
    title: "BACKEND",
    techs: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "REST API", icon: SiPostman },
      { name: "EJS", icon: SiEjs },
      // { name: "Django", icon: SiFlask },
    ]
  },
  {
    title: "OPS & DATA",
    techs: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "AWS", icon: FaAws },
      { name: "GH Actions", icon: SiGithubactions },
      { name: "Docker", icon: SiDocker },
    ]
  }
]

export default function TechStack() {
  return (
    <div className="min-h-full w-full p-6 md:p-12 lg:p-16 flex flex-col justify-start md:justify-center py-24">
      <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter">
        SYSTEM_STACK
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6"
          >
            <h3 className="text-xs font-mono tracking-[0.3em] text-teal-400 uppercase border-b border-white/10 pb-4">
              {cat.title}
            </h3>

            <div className="grid gap-3 mt-1">
              {cat.techs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-teal-400/50 transition-colors group cursor-default"
                >
                  <tech.icon className="text-xl text-teal-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-extrabold text-white uppercase tracking-widest leading-none">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  )
}
