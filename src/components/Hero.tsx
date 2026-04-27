"use client"
import { motion } from "motion/react"

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-8 md:px-16 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400"></span>
          </span>
          <span className="font-mono text-xs tracking-[0.3em] text-lime-400 uppercase">
            System Initialized // {new Date().toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
          BUILDING THE <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            NEXT-GEN
          </span>{" "}
          WEB.
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
          I&apos;m a <span className="text-white">Systems Architect</span> and <span className="text-white">Full-stack Developer</span>.
          Dedicated to crafting distributed microservices that enable <span className="text-white">CI/CD.</span> My focus: building resilient, high-availability environments where deployment is a constant, and downtime is a legacy concept.
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4">
          <button className="cursor-pointer px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            VIEW_PROJECTS
          </button>
          <button className="cursor-pointer  px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
            CONTACT_ME
          </button>
        </div> */}
      </motion.div>
    </section>
  )
}
