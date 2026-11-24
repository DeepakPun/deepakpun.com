"use client";

import { motion, type Variants } from "framer-motion";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ExternalLink, Terminal, BookOpen, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  CAPSTONE_PROJECTS,
  type CapstoneProject,
  type CapstoneTier,
} from "@/constants/capstones";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const containerVars: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TIER_STYLES: Record<
  CapstoneTier,
  {
    glow: string;
    border: string;
    shadow: string;
    orbTop: string;
    orbBottom: string;
    numberBadge: string;
    titleAccent: string;
    primaryBtn: string;
  }
> = {
  foundation: {
    glow: "from-sky-500/30 via-cyan-400/15 to-blue-500/30",
    border: "border-sky-400/25",
    shadow: "shadow-[0_0_35px_-15px_rgba(56,189,248,0.2)]",
    orbTop: "bg-sky-500/10",
    orbBottom: "bg-cyan-500/10",
    numberBadge: "bg-sky-500/15 border-sky-400/30 text-sky-300",
    titleAccent: "text-sky-400",
    primaryBtn:
      "bg-sky-600 hover:bg-sky-500 shadow-sky-600/20 border-sky-400/25",
  },
  scaled: {
    glow: "from-purple-500/40 via-indigo-400/20 to-blue-500/40",
    border: "border-purple-400/30",
    shadow: "shadow-[0_0_40px_-12px_rgba(168,85,247,0.25)]",
    orbTop: "bg-purple-500/15",
    orbBottom: "bg-indigo-500/10",
    numberBadge: "bg-purple-500/15 border-purple-400/30 text-purple-300",
    titleAccent: "text-purple-400",
    primaryBtn:
      "bg-purple-600 hover:bg-purple-500 shadow-purple-600/25 border-purple-400/25",
  },
  flagship: {
    glow: "from-emerald-500/45 via-lime-400/20 to-teal-500/45",
    border: "border-emerald-400/35",
    shadow: "shadow-[0_0_45px_-12px_rgba(16,185,129,0.3)]",
    orbTop: "bg-emerald-500/15",
    orbBottom: "bg-lime-500/10",
    numberBadge: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
    titleAccent: "text-emerald-400",
    primaryBtn:
      "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25 border-emerald-400/25",
  },
};

const STATUS_STYLES: Record<
  CapstoneProject["status"],
  { dot: string; text: string; bg: string; label: string }
> = {
  LIVE: {
    dot: "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    label: "LIVE",
  },
  ARCHIVED_FINOPS: {
    dot: "bg-amber-400",
    text: "text-amber-300",
    bg: "bg-amber-500/10 border-amber-500/20",
    label: "TEARDOWN // FINOPS",
  },
  IN_PROGRESS: {
    dot: "bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]",
    text: "text-purple-300",
    bg: "bg-purple-500/10 border-purple-500/20",
    label: "IN_PROGRESS",
  },
};

export default function EcosystemLabsMenu() {
  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 md:pt-10 pb-12 space-y-4`}
    >
      <motion.header variants={itemVars} className="space-y-2.5 max-w-2xl pb-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Production_Sandbox // Capstones
          </span>
        </div>

        <h1 className="font-(family-name:--font-display) text-2xl md:text-4xl font-bold text-white tracking-tight">
          Deployed{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Architectures.
          </span>
        </h1>

        <p className="text-xs md:text-sm text-white/60 leading-relaxed font-normal">
          End-to-end full-stack and cloud systems built from scratch, complete with
          architecture notes, CI/CD workflows, and deliberate{" "}
          <span className="text-amber-300/90 font-mono text-xs">FinOps teardowns</span>{" "}
          to keep cloud spend at $0 post-verification.
        </p>
      </motion.header>

      {CAPSTONE_PROJECTS.map((capstone) => {
        const tierStyle = TIER_STYLES[capstone.tier];
        const statusStyle = STATUS_STYLES[capstone.status];
        const titleWords = capstone.title.split(" ");
        const lastWord = titleWords.pop() ?? "";
        const leadingTitle = titleWords.join(" ");

        return (
          <motion.section
            key={capstone.id}
            variants={itemVars}
            className="relative group"
          >
            <div
              className={`absolute -inset-0.5 bg-linear-to-r ${tierStyle.glow} rounded-[1.25rem] blur-md opacity-70 group-hover:opacity-100 transition duration-500`}
            />

            <div
              className={`relative p-5 md:p-6 rounded-2xl bg-zinc-950/90 backdrop-blur-3xl border ${tierStyle.border} ${tierStyle.shadow} overflow-hidden`}
            >
              <div
                className={`absolute -top-20 -right-20 w-44 h-44 ${tierStyle.orbTop} blur-3xl rounded-full pointer-events-none`}
              />
              <div
                className={`absolute -bottom-20 -left-20 w-44 h-44 ${tierStyle.orbBottom} blur-3xl rounded-full pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full border text-xs font-mono font-bold uppercase tracking-widest ${tierStyle.numberBadge}`}
                    >
                      CAPSTONE // {capstone.capstoneNumber}
                    </span>

                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-white/80">
                        {capstone.highlightText}
                      </span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${statusStyle.bg}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                      />
                      <span
                        className={`text-xs font-mono font-bold tracking-wider ${statusStyle.text}`}
                      >
                        {statusStyle.label}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-(family-name:--font-display) text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">
                    {leadingTitle && `${leadingTitle} `}
                    <span className={tierStyle.titleAccent}>{lastWord}</span>
                  </h2>

                  <p className="text-xs text-blue-100/70 leading-relaxed font-normal max-w-xl">
                    {capstone.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {capstone.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono px-2 py-0.5 text-xs font-medium text-blue-200/80 bg-white/5 border border-white/10 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-2 w-full lg:w-60 shrink-0">
                  {capstone.liveLink ? (
                    <>
                      <motion.a
                        href={capstone.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`font-mono px-3 py-2.5 text-white font-bold text-xs uppercase tracking-wide whitespace-nowrap rounded-xl flex items-center justify-center gap-1.5 shadow-lg border group/btn transition-all duration-300 ${tierStyle.primaryBtn}`}
                      >
                        <Terminal className="w-3.5 h-3.5 text-white/80 shrink-0" />
                        <span className="whitespace-nowrap">{capstone.liveLabel || "Launch Live App"}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </motion.a>

                      <div className="flex flex-nowrap items-center gap-1.5 w-full">
                        {capstone.githubLink && (
                          <a
                            href={capstone.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-0 px-2 py-2 text-white/80 font-mono font-bold text-xs uppercase tracking-normal whitespace-nowrap rounded-xl flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                          >
                            <FaGithub className="w-3.5 h-3.5 shrink-0" />
                            <span className="whitespace-nowrap">Source</span>
                          </a>
                        )}
                        {capstone.docsLink && (
                          <a
                            href={capstone.docsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-0 px-2 py-2 text-white/80 font-mono font-bold text-xs uppercase tracking-normal whitespace-nowrap rounded-xl flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                          >
                            <BookOpen className="w-3.5 h-3.5 shrink-0" />
                            <span className="whitespace-nowrap">{capstone.docsLabel || "How I Did It"}</span>
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {capstone.docsLink && (
                        <motion.a
                          href={capstone.docsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-3 py-2.5 text-white font-bold text-xs whitespace-nowrap rounded-xl flex items-center justify-center gap-1.5 shadow-lg border group/btn transition-all duration-300 ${tierStyle.primaryBtn}`}
                        >
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span className="whitespace-nowrap">{capstone.docsLabel || "How I Did It"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </motion.a>
                      )}
                      {capstone.githubLink && (
                        <motion.a
                          href={capstone.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-3 py-2.5 text-white/80 font-mono font-bold text-xs uppercase tracking-wide whitespace-nowrap rounded-xl flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                        >
                          <FaGithub className="w-3.5 h-3.5 shrink-0" />
                          <span className="whitespace-nowrap">Inspect Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </motion.a>
                      )}
                    </>
                  )}

                  {capstone.finopsNote && (
                    <p className="font-mono text-xs leading-relaxed text-amber-300/80 bg-amber-500/5 border border-amber-500/15 rounded-lg px-2.5 py-1.5">
                      {capstone.finopsNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </motion.div>
  );
}