"use client";
import { motion } from "motion/react";

export default function Hero() {
  const steps = [
    { title: "Local Dev", desc: "Next.js & Tailwind" },
    { title: "Push to GH", desc: "Git commit & push" },
    { title: "GH Actions", desc: "Cloud Deployment" },
  ];

  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-8 md:px-16 relative overflow-hidden py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400"></span>
          </span>
          <span className="font-mono text-xs tracking-[0.3em] text-lime-400 uppercase">
            System Initialized // {new Date().toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 uppercase">
          Building the <br />{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Next-Gen
          </span>{" "}
          Web.
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
          I&apos;m a <span className="text-white">Full-Stack Developer</span>{" "}
          and <span className="text-white">Cloud Engineer</span>. Dedicated to
          building robust web applications and automated{" "}
          <span className="text-white">CI/CD pipelines</span>. My focus:
          bridging the gap between clean code and reliable infrastructure using{" "}
          <span className="text-white">AWS</span> and{" "}
          <span className="text-white">DigitalOcean</span> to ensure seamless
          deployments.
        </p>

        <div className="max-w-xl p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
            <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
              LOGS_04.01
            </span>{" "}
            <span>Deployment_Architecture</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed italic">
            Currently orchestrating unified{" "}
            <span className="text-white/70">Next.js environments</span> where
            automated webhooks trigger isolated container runs, seamlessly
            syncing production builds with live cloud resources.
          </p>
        </div>

        {/* <div className="max-w-xl p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
            <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
              LOGS_04.01
            </span>{" "}
            <span>Architecture_Overview</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed italic">
            Currently orchestrating a{" "}
            <span className="text-white/70">multi-container ecosystem</span>{" "}
            where an Express-driven{" "}
            <span className="text-white/70">API Gateway</span> intelligently
            directs traffic to isolated logic services and persistent NoSQL
            clusters.
          </p>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-3 max-w-xl">
          {/* <button className="cursor-pointer px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase text-sm tracking-wide">
            View_Projects
          </button> */}
          <a
            href="https://flowcv.com/resume/ssi26sqrov46"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm uppercase text-sm tracking-wide text-center flex items-center justify-center gap-2"
          >
            View_Resume
            <svg
              className="w-3.5 h-3.5 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        {/* DevOps Pipeline Section */}
        <div className="w-full max-w-3xl pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center flex-1 gap-4 md:gap-3"
              >
                {/* Step Box */}
                <div className="flex-1 p-3 rounded-xl bg-white/2 border border-white/10 backdrop-blur-xs font-mono">
                  <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                    0{index + 1} {"//"} STEP
                  </div>
                  <div className="text-sm font-bold text-white uppercase tracking-wide">
                    {step.title}
                  </div>
                  <div className="text-xs text-white/50 lowercase mt-0.5">
                    {step.desc}
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center items-center text-white font-mono text-xs md:rotate-0 rotate-90 py-1 md:py-0">
                  {index === steps.length - 1 ? (
                    <span className="text-[10px] tracking-widest text-lime-400/50 animate-pulse uppercase hidden md:inline ml-2">
                      &rarr; repeat
                    </span>
                  ) : (
                    <span>&rarr;</span>
                  )}
                </div>
              </div>
            ))}

            {/* Mobile-only repeat indicator */}
            <div className="text-center font-mono text-[10px] tracking-widest text-lime-400/50 animate-pulse uppercase md:hidden pt-1">
              &darr; repeat cycle
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
