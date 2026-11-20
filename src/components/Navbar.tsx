"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, NotebookText } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/constants/navigation";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="h-16 bg-gradient-devops border-b border-white/10 flex items-center justify-between px-6 z-50 relative">
      {/* 1. LEFT LAYER: Brand Logo */}
      <div className="font-black text-white tracking-tighter text-xl shrink-0">
        <Logo name="DEEPAK.PUN" />
      </div>

      {/* 2. CENTER LAYER: Centered Tech Notes Node (Desktop) */}
      {/* <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <a
          href="https://notes.deepakpun.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-black tracking-widest text-white hover:text-lime-300 bg-zinc-950/65 hover:bg-zinc-950/85 backdrop-blur-md border border-white/15 hover:border-lime-400/70 transition-all duration-300 shadow-md shadow-black/25 hover:shadow-[0_0_18px_rgba(163,230,53,0.25)] group relative overflow-hidden"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#a3e635]" />
          TECH_NOTES
          <ArrowUpRight
            size={14}
            className="text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out"
          />
        </a>
      </div> */}

      {/* 3. RIGHT LAYER: Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2 shrink-0 ml-auto z-20"
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
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="absolute top-16 left-0 w-full bg-gradient-devops backdrop-blur-md border-b border-white/10 rounded-b-3xl shadow-2xl z-40 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-8 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-white hover:text-lime-400 transition-colors flex items-center gap-1 group relative w-fit"
                >
                  {link.name}
                </Link>
              ))}

              {/* Separated External Tech Notes Link (Mobile Drawer) */}
              <div className="pt-4 mt-2 border-t border-white/15">
                <a
                  href="https://notes.deepakpun.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3.5 rounded-xl flex items-center justify-between bg-zinc-950/65 hover:bg-zinc-950/85 border border-white/15 hover:border-lime-400/70 transition-all duration-300 shadow-lg shadow-black/25 group"
                >
                  <span className="flex items-center gap-3 text-lg font-mono font-bold tracking-wider text-white group-hover:text-lime-300 transition-colors">
                    <NotebookText size={22} className="text-lime-400 shrink-0" />
                    TECH_NOTES
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-white/70 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-3 px-1">
                  {SOCIAL_LINKS.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:text-lime-400 hover:border-lime-400/50 hover:bg-white/15 transition-all duration-300 shadow-sm"
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
