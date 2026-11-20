"use client"
import { motion } from 'framer-motion'
import {
  Terminal,
  Cpu,
  HardDrive,
  ShieldCheck,
  Mountain,
  Trophy,
  Film,
  ArrowUpRight
} from 'lucide-react'
import { useSyncExternalStore } from 'react'

interface Pillar {
  title: string
  description: string
}

interface Interest {
  title: string
  description: string
  highlight?: {
    label: string
    href: string
    target: string
  }
}

interface UpdatedAboutData {
  mission: string
  pillars: Pillar[]
  interests: Interest[]
}

const pillarIcons = [Terminal, Cpu, HardDrive, ShieldCheck]
const interestIcons = [Mountain, Trophy, Film]

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const aboutData: UpdatedAboutData = {
  mission: "Architecting resilient, type-safe systems with a focus on developer experience, automated delivery, and DevSecOps.",
  pillars: [
    {
      title: "Modular Architecture",
      description: "Building scalable full-stack applications through component-driven design and resilient microservices."
    },
    {
      title: "DevSecOps Culture",
      description: "Bridging code, cloud infrastructure, and security with automated CI/CD pipelines and containerization."
    },
    {
      title: "Type Safety",
      description: "Eliminating runtime surprises and improving long-term codebase maintainability with end-to-end TypeScript."
    }
  ],
  interests: [
    {
      title: "Trail & Elevation",
      description: "Disconnecting from the terminal to explore scenic trails, chase elevation gain, and recharge outdoors."
    },
    {
      title: "The Beautiful Game",
      description: "Passionate football (soccer) fan—always down to play, break down match tactics, transfer rumors, or weekend fixtures."
    },
    {
      title: "Cinema & MCU Lore",
      description: "Big movie buff with a soft spot for Marvel storytelling, timeline rabbit holes, and fan theories—which inspired my MCU Theories project.",
      highlight: {
        label: "Explore MCU Theories",
        href: "https://www.labs.deepakpun.com",
        target: "_blank"
      }
    }
  ]
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

function AboutClient({ data }: { data: UpdatedAboutData }) {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVars}
      className='w-full max-w-6xl mx-auto py-8 px-6 space-y-8'
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
          const Icon = pillarIcons[i % pillarIcons.length]
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
                  <p className='text-sm text-blue-100/60 leading-relaxed font-medium group-hover:text-blue-100/80 transition-colors'>
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className='space-y-4 pt-2'>
        <motion.div variants={itemVars} className='flex items-center gap-3 px-2'>
          <span className='h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_var(--color-purple-400)]' />
          <h2 className='text-[10px] font-black uppercase tracking-[0.5em] text-purple-400'>
            Beyond_The_Terminal
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {data.interests.map((interest, i) => {
            const Icon = interestIcons[i % interestIcons.length]
            return (
              <motion.div
                key={interest.title}
                variants={itemVars}
                whileHover={{ y: -8, scale: 1.02 }}
                className='group relative p-8 rounded-[2.5rem] bg-zinc-950/30 backdrop-blur-xl border border-white/5 hover:border-purple-400/40 transition-all duration-500 shadow-2xl overflow-hidden flex flex-col justify-between min-h-64'
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/5 group-hover:bg-purple-600/10 blur-3xl rounded-full transition-colors" />

                <div className='relative z-10 space-y-6'>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/10 transition-all">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-3">
                    <h3 className='text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors'>
                      {interest.title}
                    </h3>
                    <p className='text-sm text-blue-100/60 leading-relaxed font-medium group-hover:text-blue-100/80 transition-colors'>
                      {interest.description}
                    </p>
                  </div>
                </div>

                {interest.highlight && (
                  <div className="relative z-10 pt-6">
                    <a
                      href={interest.highlight.href}
                      target={interest.highlight.target}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white transition-colors"
                    >
                      {interest.highlight.label}
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* <motion.div
        variants={itemVars}
        className='pt-2 px-2 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-100/50'
      >
        <p>
          Want to chat about DevSecOps, football tactics, or Marvel timelines?
        </p>
        <div className='flex items-center gap-5 font-semibold tracking-wide'>
          <a
            href="https://notes.deepakpun.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
          >
            Tech Notes <ArrowUpRight size={13} />
          </a>
          <a
            href="https://github.com/DeepakPun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors inline-flex items-center gap-1"
          >
            GitHub <ArrowUpRight size={13} />
          </a>
          <a
            href="https://linkedin.com/in/mrpun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors inline-flex items-center gap-1"
          >
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </motion.div> */}
    </motion.div>
  )
}
