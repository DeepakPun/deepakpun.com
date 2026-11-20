"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '@/constants/navigation'
import { SiGithub } from 'react-icons/si'
import { SlSocialLinkedin } from 'react-icons/sl'
import { ArrowUpRight, NotebookText } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-80 h-full bg-gradient-devops p-8 flex-col justify-between border-r border-white/10 shadow-2xl relative">
      {/* Top Section: Internal Routes + External Tech Notes */}
      <div className="flex flex-col">
        <nav className="flex flex-col gap-4 relative">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-6 py-4 text-xl font-black transition-colors duration-300 rounded-xl flex items-center gap-4 group ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
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
                  {link.name}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Separated External Link */}
        <div className="mt-6 pt-6 border-t border-white/15">
          <a
            href="https://notes.deepakpun.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-4 rounded-xl flex items-center justify-between bg-zinc-950/60 hover:bg-zinc-950/85 backdrop-blur-md border border-white/15 hover:border-lime-400/70 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]"
          >
            <span className="flex items-center gap-4 text-lg font-mono font-bold tracking-wider text-white group-hover:text-lime-300 transition-colors">
              <NotebookText size={24} className="text-lime-400 shrink-0" />
              TECH_NOTES
            </span>
            <ArrowUpRight
              size={20}
              className="text-white/60 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </a>
        </div>
      </div>

      {/* Bottom Footer: Social Icons */}
      <div className="relative z-10 mt-auto pt-6 border-t border-white/20">
        <div className="flex items-center justify-center gap-3 px-1">
          {[
            { icon: SiGithub, href: "https://github.com", label: "GitHub" },
            { icon: SlSocialLinkedin, href: "https://linkedin.com", label: "LinkedIn" }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:text-lime-400 hover:border-lime-400/50 hover:bg-white/15 transition-all duration-300 shadow-sm"
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>
      </div>
    </aside>
  )
}
