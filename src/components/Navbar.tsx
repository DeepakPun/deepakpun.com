"use client"
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants/navigation'
import Logo from './Logo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <header className="h-16 bg-gradient-devops border-b border-white/10 flex items-center justify-between px-6 z-50 relative">
      <div className="font-black text-white tracking-tighter text-xl">
        {/* <Link href="/" className="group"> */}
        {/* <div className="font-black text-white tracking-tighter text-xl group-hover:text-lime-400 transition-colors">
          DEEPAK.PUN
        </div> */}
        <Logo name='DEEPAK.PUN' />
        {/* </Link> */}
      </div>

      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="absolute top-16 left-0 w-full bg-gradient-devops backdrop-blur-md border-b border-white/10 rounded-b-3xl shadow-2xl z-40 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-8 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-white hover:text-lime-400 transition-colors"
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}

              <div className="relative z-10 mt-auto pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-3 mb-4 px-1">
                  {SOCIAL_LINKS.map((social, i) => (
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
