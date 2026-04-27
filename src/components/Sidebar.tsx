"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '@/constants/navigation'
import { SiGithub, SiX } from 'react-icons/si'
import { SlSocialLinkedin } from 'react-icons/sl'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-80 h-full bg-gradient-devops p-8 flex-col justify-between border-r border-white/10 shadow-2xl relative">
      <nav className="flex flex-col gap-4 relative">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative px-6 py-4 text-2xl font-black transition-colors duration-300 rounded-xl flex items-center gap-4 group ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-highlight"
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-400 shadow-[0_0_15px_#a3e635]" />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-lime-400/20 to-transparent opacity-50"
                    style={{ maskImage: 'radial-gradient(50% 100% at 50% 100%, black, transparent)' }}
                  />
                </motion.div>
              )}
              <span className="relative z-10 flex items-center gap-4">
                <Icon size={28} className={isActive ? 'text-lime-400' : 'group-hover:text-white/80'} />
                {link.name.toUpperCase()}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="relative z-10 mt-auto pt-6 border-t border-white/20">
        <div className="flex items-center justify-center gap-3 mb-4 px-1">
          {[
            { icon: SiGithub, href: "https://github.com/DeepakPun" },
            { icon: SlSocialLinkedin, href: "https://www.linkedin.com/in/mrpun/" },
            // { icon: SiX, href: "https://x.com" }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:text-lime-400 hover:border-lime-400/50 hover:bg-white/15 transition-all duration-300 shadow-sm"
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>

        <div className="px-2 mb-6">
          <Link
            href="https://deepakpun-labs.com"
            target="_blank"
            className="group flex flex-col p-4 rounded-2xl bg-[#020617]/60 backdrop-blur-2xl border border-white/10 hover:border-teal-400/50 hover:bg-[#020617]/80 transition-all duration-300 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="relative z-10 text-[10px] font-mono tracking-[0.3em] text-teal-400 mb-1 font-bold">
              EXTERNAL_NODE // 02
            </span>

            <span className="relative z-10 text-white font-black text-xl tracking-tight group-hover:text-teal-300 transition-colors">
              DEEPAK_LABS
            </span>

            <p className="relative z-10 text-[10px] text-white/50 font-mono mt-2 leading-relaxed uppercase tracking-tighter">
              R&D Sandbox: Experimental Microservices & System Prototypes.
            </p>

            {/* Visual Indicator */}
            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
          </Link>
        </div>

        <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
              <span className="text-white/50 uppercase font-bold">Build_Version</span>
              <span className="text-white font-medium">v1.01</span>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
              <span className="text-white/50 uppercase font-bold">Status</span>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lime-400 font-black drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]"
              >
                EVOLVING_UI
              </motion.span>
            </div>

            <p className="mt-1 text-[9px] leading-tight text-white/40 font-mono italic">
              * Active CI/CD: Iterative UI patches in progress.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
