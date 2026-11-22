"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, NotebookText } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/constants/navigation";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
    <header className="h-16 bg-gradient-devops border-b border-white/15 flex items-center justify-between px-6 z-50 relative shadow-md">
      {/* 1. LEFT LAYER: Brand Logo */}
      <div className="font-mono font-bold text-white tracking-tight text-xl shrink-0 drop-shadow-xs">
        <Logo name="DEEPAK.PUN" />
      </div>

      {/* 2. RIGHT LAYER: Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2 rounded-xl bg-slate-950/30 hover:bg-slate-950/50 border border-white/15 transition-colors shrink-0 ml-auto z-20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 180 }}
            className="absolute top-16 left-0 w-full bg-gradient-devops border-b border-white/15 rounded-b-3xl shadow-2xl z-40 md:hidden overflow-hidden"
          >
            {/* Subtle dark scrim for consistent readability over teal/emerald stops */}
            <div className="bg-slate-950/20 backdrop-blur-md p-6 flex flex-col gap-6">
              <nav className="flex flex-col gap-3 font-mono">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3.5 rounded-xl flex items-center gap-3.5 text-lg tracking-tight border transition-all duration-200 ${isActive
                        ? "bg-slate-950/80 text-white font-bold border-lime-400/50 shadow-lg shadow-black/25"
                        : "bg-slate-950/35 text-slate-100/90 font-medium border-white/10 hover:bg-slate-950/60 hover:text-white"
                        }`}
                    >
                      {Icon && (
                        <Icon
                          size={22}
                          className={
                            isActive ? "text-lime-400" : "text-slate-300"
                          }
                        />
                      )}
                      <span>
                        {link.name.split("/").map((segment, index) => (
                          <span key={index}>
                            {index > 0 && (
                              <span
                                className={
                                  isActive
                                    ? "text-lime-400 font-bold"
                                    : "text-slate-400"
                                }
                              >
                                /
                              </span>
                            )}
                            {segment}
                          </span>
                        ))}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Separated External Tech Notes Link (Mobile Drawer) */}
              <div className="pt-4 border-t border-white/15">
                <a
                  href="https://notes.deepakpun.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3.5 rounded-xl flex items-center justify-between bg-slate-950/75 hover:bg-slate-950/90 border border-white/15 hover:border-lime-400/70 transition-all duration-300 shadow-lg shadow-black/25 group"
                >
                  <span className="flex items-center gap-3 text-base font-mono font-bold tracking-wider text-white group-hover:text-lime-300 transition-colors">
                    <NotebookText size={20} className="text-lime-400 shrink-0" />
                    TECH_NOTES
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-white/70 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/15">
                <div className="flex items-center justify-center gap-3">
                  {SOCIAL_LINKS.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 rounded-xl bg-slate-950/35 border border-white/15 text-white hover:text-lime-400 hover:border-lime-400/50 hover:bg-slate-950/60 transition-all duration-300 shadow-sm"
                    >
                      <social.icon size={22} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
