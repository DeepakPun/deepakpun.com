"use client";

import { motion } from "framer-motion";
import { Roboto } from "next/font/google";
import { ExternalLink, Terminal, BookOpen, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  CAPSTONE_PROJECTS,
  CapstoneProject,
  CapstoneTier,
} from "@/constants/capstones";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
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
    shadow: "shadow-[0_0_40px_-15px_rgba(56,189,248,0.2)]",
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
    shadow: "shadow-[0_0_50px_-12px_rgba(168,85,247,0.25)]",
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
    shadow: "shadow-[0_0_55px_-12px_rgba(16,185,129,0.3)]",
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
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-20 space-y-10 ${roboto.className}`}
    >
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
            {/* Tier-Specific Outer Glow */}
            <div
              className={`absolute -inset-0.5 bg-linear-to-r ${tierStyle.glow} rounded-[2.6rem] blur-md opacity-75 group-hover:opacity-100 transition duration-500`}
            />

            {/* Main Dark Glass Card */}
            <div
              className={`relative p-8 md:p-12 rounded-[2.5rem] bg-zinc-950/90 backdrop-blur-3xl border ${tierStyle.border} ${tierStyle.shadow} overflow-hidden`}
            >
              <div
                className={`absolute -top-24 -right-24 w-72 h-72 ${tierStyle.orbTop} blur-3xl rounded-full pointer-events-none`}
              />
              <div
                className={`absolute -bottom-24 -left-24 w-72 h-72 ${tierStyle.orbBottom} blur-3xl rounded-full pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left Content Column */}
                <div className="space-y-4">
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-mono font-black uppercase tracking-widest ${tierStyle.numberBadge}`}
                    >
                      CAPSTONE // {capstone.capstoneNumber}
                    </span>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80">
                        {capstone.highlightText}
                      </span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyle.bg}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                      />
                      <span
                        className={`text-xs font-mono font-bold tracking-wider ${statusStyle.text}`}
                      >
                        {statusStyle.label}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.05] tracking-tighter">
                    {leadingTitle && `${leadingTitle} `}
                    <span className={tierStyle.titleAccent}>{lastWord}</span>
                  </h1>

                  {/* Summary */}
                  <p className="text-sm md:text-base text-blue-100/70 leading-relaxed font-medium max-w-2xl">
                    {capstone.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {capstone.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold text-blue-200/80 bg-white/5 border border-white/10 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-3 w-full lg:w-64 shrink-0">
                  {capstone.liveLink ? (
                    <>
                      {/* Primary CTA: Live Sandbox */}
                      <motion.a
                        href={capstone.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-6 py-4 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2.5 shadow-xl border group/btn transition-all duration-300 ${tierStyle.primaryBtn}`}
                      >
                        <Terminal className="w-4 h-4 text-white/80 shrink-0" />
                        <span>{capstone.liveLabel || "Launch Live App"}</span>
                        <ExternalLink className="w-4 h-4 shrink-0 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </motion.a>

                      {/* Secondary Row: Source + How I Did It */}
                      <div className="flex items-center gap-2.5">
                        {capstone.githubLink && (
                          <a
                            href={capstone.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-white/25 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 shrink-0"
                          >
                            <FaGithub className="w-3.5 h-3.5 shrink-0" />
                            <span>Source</span>
                          </a>
                        )}

                        {capstone.docsLink && (
                          <a
                            href={capstone.docsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-lime-400/10 hover:bg-lime-400/20 text-lime-300 hover:text-lime-200 border border-lime-400/25 hover:border-lime-400/50 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 whitespace-nowrap"
                          >
                            <BookOpen className="w-3.5 h-3.5 shrink-0" />
                            <span>{capstone.docsLabel || "How I Did It"}</span>
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Primary CTA when no liveLink: "How I Did It" Walkthrough */}
                      {capstone.docsLink && (
                        <motion.a
                          href={capstone.docsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-6 py-4 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2.5 shadow-xl border group/btn transition-all duration-300 ${tierStyle.primaryBtn}`}
                        >
                          <BookOpen className="w-4 h-4 text-white/80 shrink-0" />
                          <span>{capstone.docsLabel || "How I Did It"}</span>
                          <ArrowUpRight className="w-4 h-4 shrink-0 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                        </motion.a>
                      )}

                      {/* Secondary Full-Width Source Button */}
                      {capstone.githubLink && (
                        <a
                          href={capstone.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-white/25 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                        >
                          <FaGithub className="w-4 h-4 shrink-0" />
                          <span>Inspect Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      )}

                      {capstone.finopsNote && (
                        <div className="px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                          <p className="text-xs leading-relaxed font-medium text-amber-200/90">
                            {capstone.finopsNote}
                          </p>
                        </div>
                      )}
                    </>
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