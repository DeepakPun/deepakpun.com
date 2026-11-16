"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Terminal,
  FolderGit2,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { COURSE_PROJECTS, PROJECT_TYPE_STYLES } from "@/constants/projects";
import { FaGithub } from "react-icons/fa6";

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function EcosystemLabsMenu() {
  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-20 space-y-12 font-sans"
    >
      {/* 1. Highlighted Flagship DevOps Sandbox Card */}
      <motion.section variants={itemVars} className="relative group">
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/40 via-emerald-400/20 to-indigo-500/40 rounded-[2.6rem] blur-md opacity-75 group-hover:opacity-100 transition duration-500" />

        <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-zinc-950/90 backdrop-blur-3xl border border-blue-400/30 shadow-[0_0_50px_-12px_rgba(59,130,246,0.25)] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 blur- rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 blur- rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                  Flagship DevOps Sandbox
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.05] tracking-tighter">
                DeepakPun <span className="text-blue-500">Labs</span>
              </h1>

              <p className="text-sm md:text-base text-blue-100/70 leading-relaxed font-medium max-w-2xl">
                Multi-service environment built to test container virtualization,
                automated pipeline assertions, and completely decoupled cloud
                architectures.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {[
                  "Docker Microservices",
                  "MongoDB Atlas",
                  "Vitest & Supertest",
                  "DigitalOcean",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-semibold text-blue-200/80 bg-white/5 border border-white/10 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <motion.a
              href="https://labs.deepakpun.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="w-full lg:w-auto shrink-0 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/25 border border-blue-400/20 group/btn transition-all duration-300"
            >
              <Terminal className="w-4 h-4 text-blue-200" />
              <span>Launch Live Sandbox</span>
              <ExternalLink className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* 2. Engineering Blog Banner (Middle Tier) */}
      <motion.section variants={itemVars}>
        <a
          href="https://blog.deepakpun.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:px-6 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 backdrop-blur-xl border border-white/15 hover:border-lime-400/40 transition-all duration-300 shadow-lg"
        >
          <div className="flex items-start md:items-center gap-4">
            <div className="p-2.5 rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400 shrink-0 mt-0.5 md:mt-0">
              <BookOpen className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                  Engineering Blog
                </span>
                {/* <span className="text-xs text-slate-400 font-mono">
                  Latest Write-Up
                </span> */}
              </div>
              <p className="text-sm md:text-base font-semibold text-white group-hover:text-lime-300 transition-colors">
                Latest tech insights and deep dives into modern web development and DevOps practices.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime-400 shrink-0 self-end md:self-center pl-12 md:pl-0">
            <span>Read Blog</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>
      </motion.section>

      {/* 3. Course Projects Section */}
      <motion.section variants={itemVars} className="space-y-6 pt-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:px-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Course Projects
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Code-along builds and full-stack fundamentals
              </p>
            </div>
          </div>

          <span className="self-start sm:self-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            {COURSE_PROJECTS.length}{" "}
            {COURSE_PROJECTS.length === 1 ? "Project" : "Projects"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_PROJECTS.map((project) => (
            <motion.article
              key={project.id}
              variants={itemVars}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-3xl bg-zinc-900/70 backdrop-blur-xl border border-white/15 hover:border-blue-400/40 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <span
                    className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${PROJECT_TYPE_STYLES[project.type] ||
                      "bg-white/5 text-slate-300 border-white/10"
                      }`}
                  >
                    {project.type}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Links: Live Demo & GitHub Repo */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600/15 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}