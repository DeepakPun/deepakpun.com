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

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 uppercase">
          Building the <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Next-Gen
          </span>{" "}
          Web.
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
          I&apos;m a <span className="text-white">Systems Architect</span> and <span className="text-white">Full-stack Developer</span>.
          Dedicated to crafting distributed microservices that enable <span className="text-white">CI/CD.</span>
          My focus: building resilient, high-availability environments where deployment is a constant, and downtime is a legacy concept.
        </p>

        <div className="max-w-xl p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-10">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
            <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">LOGS_04.01</span>
            <span>Architecture_Overview</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed italic">
            Currently orchestrating a <span className="text-white/70">multi-container ecosystem</span> where an
            Express-driven <span className="text-white/70">API Gateway</span> intelligently directs traffic to
            isolated logic services and persistent NoSQL clusters.
          </p>
        </div>

        {/* <div className="flex flex-col sm:flex-row gap-4">
          <button className="cursor-pointer px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase text-sm">
            View_Projects
          </button>
          <button className="cursor-pointer px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm uppercase text-sm">
            Contact_Me
          </button>
        </div> */}
      </motion.div>
    </section>
  )
}
