"use client"
import { motion } from 'framer-motion'
import { Server, Database, Activity, Rocket } from 'lucide-react'

const iconMap = [Server, Database, Activity, Rocket]

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const labSpecs = [
  { metric: "Architecture", value: "Docker Microservices" },
  { metric: "Persistence Layer", value: "MongoDB Atlas Cloud" },
  { metric: "Testing Matrix", value: "Vitest & Supertest" },
  { metric: "Target Engine", value: "DigitalOcean Droplet" }
]

export default function EcosystemLabsMenu() {
  return (
    <motion.div
      variants={itemVars}
      className="w-full max-w-6xl mx-auto space-y-6 font-sans"
    >
      {/* Primary Feature Card Section */}
      <section className="relative group">
        <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-zinc-950/40 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Subtle background glow node ambient effect */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_var(--color-emerald-400)]" />
                <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400">
                  Active_Subsystem
                </h1>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.05] tracking-tighter drop-shadow-sm max-w-2xl">
                DeepakPun <span className="text-blue-500">Labs</span>
              </h2>
              <p className="text-sm md:text-base text-blue-100/60 leading-relaxed font-medium max-w-2xl">
                Multi-service environment built to test container virtualization, automated pipeline assertions, and completely decoupled cloud architectures.
              </p>
            </div>

            {/* Scale aligned CTA Outbound Button Link */}
            <motion.a
              href="https://deepakpun-labs.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto shrink-0 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 group transition-all duration-300"
            >
              <span>Launch Live Sandbox</span>
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Grid Spec Block Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {labSpecs.map((spec, i) => {
          const Icon = iconMap[i % iconMap.length]
          return (
            <motion.div
              key={spec.metric}
              variants={itemVars}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-[2.5rem] bg-zinc-950/30 backdrop-blur-xl border border-white/5 hover:border-blue-400/40 transition-all duration-500 shadow-2xl overflow-hidden flex flex-col justify-between min-h-48"
            >
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 group-hover:bg-blue-600/10 blur-3xl rounded-full transition-colors" />

              <div className="relative z-10 space-y-4 w-full">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/10 transition-all">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {spec.metric}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                    {spec.value}
                  </h3>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
