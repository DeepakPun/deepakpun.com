"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function PronunciationTooltip() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative inline-flex items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                }}
                aria-label="Pronunciation guide: Pun is pronounced Poon"
                className="px-2 py-0.5 rounded-md font-mono text-xs bg-slate-950/35 text-slate-300 border border-white/15 hover:border-lime-400/50 hover:text-lime-300 transition-colors cursor-pointer"
            >
                /poon/
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        role="tooltip"
                        className="absolute left-0 top-full mt-2.5 w-max max-w-xs px-3 py-2 rounded-xl bg-slate-950/95 backdrop-blur-md border border-lime-400/40 shadow-xl shadow-black/40 text-xs font-mono text-slate-200 z-50 pointer-events-none"
                    >
                        {/* Tiny upward pointer arrow */}
                        <div className="absolute -top-1.5 left-4 w-2.5 h-2.5 rotate-45 bg-slate-950 border-l border-t border-lime-400/40" />

                        <span className="text-lime-400 font-bold">Pun</span>{" "}
                        <span className="text-slate-400">→</span> pronounced{" "}
                        <span className="text-white font-semibold">&ldquo;Poon&rdquo;</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
