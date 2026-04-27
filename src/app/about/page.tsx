"use client"
import { motion } from 'framer-motion'
import { Terminal, Cpu, HardDrive, ShieldCheck } from 'lucide-react'
import { AboutData } from '@/types/about'
import { useSyncExternalStore } from 'react'

const iconMap = [Terminal, Cpu, HardDrive, ShieldCheck]

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const aboutData: AboutData = {
  mission: "Architecting resilient, type-safe systems with a focus on developer experience and automated delivery.",
  pillars: [
    { title: "Modular Architecture", description: "Building scalable applications through component-driven design and micro-services." },
    { title: "DevOps Culture", description: "Bridging the gap between code and infrastructure with CI/CD and containerization." },
    { title: "Type Safety", description: "Eliminating runtime errors and improving codebase maintainability with TypeScript." }
  ],
  tags: ["DOCKER", "TYPESCRIPT", "NEXT.JS", "CI/CD"]
}

const emptySubscribe = () => () => { }
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export default function AboutPage() {
  const hasMounted = useHasMounted()

  if (!hasMounted) return <div className="min-h-full flex items-center" />

  return (
    <div className="min-h-full flex items-center">
      <AboutClient data={aboutData} />
    </div>
  )
}

function AboutClient({ data }: { data: AboutData }) {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVars}
      className='w-full max-w-6xl mx-auto py-8 px-6 space-y-6'
    >
      <motion.section variants={itemVars} className='relative group'>
        <div className='relative p-8 md:p-10 rounded-[2.5rem] bg-zinc-950/40 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden'>
          <div className='absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full' />
          <div className='relative z-10'>
            <div className='flex items-center gap-3 mb-4'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_var(--color-emerald-400)]' />
              <h1 className='text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400'>
                Professional_Mission
              </h1>
            </div>
            <p className='text-2xl md:text-4xl font-black text-white leading-[1.05] tracking-tighter drop-shadow-sm max-w-4xl'>
              {data.mission}
            </p>
          </div>
        </div>
      </motion.section>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {data.pillars.map((pillar, i) => {
          const Icon = iconMap[i % iconMap.length]
          return (
            <motion.div
              key={pillar.title}
              variants={itemVars}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative p-8 rounded-[2.5rem] bg-zinc-950/30 backdrop-blur-xl border border-white/5 hover:border-blue-400/40 transition-all duration-500 shadow-2xl overflow-hidden flex flex-col min-h-70'
            >
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 group-hover:bg-blue-600/10 blur-3xl rounded-full transition-colors" />

              <div className='relative z-10 space-y-6'>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/10 transition-all">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <div className="space-y-3">
                  <h3 className='text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors'>
                    {pillar.title}
                  </h3>
                  <p className='text-sm text-blue-100/60 leading-relaxed font-medium line-clamp-5 group-hover:text-blue-100/80 transition-colors'>
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div variants={itemVars} className='flex flex-wrap gap-2 pt-4'>
        {data.tags.map(tag => (
          <span
            key={tag}
            className='text-[10px] font-black text-emerald-300 uppercase tracking-[0.2em] 
                bg-zinc-900/60 backdrop-blur-md border border-white/20 
                px-4 py-1.5 rounded-full shadow-lg shadow-black/20
                hover:bg-emerald-500 hover:text-white hover:border-emerald-400 transition-all cursor-default'
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
