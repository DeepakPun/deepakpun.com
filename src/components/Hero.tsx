"use client";
import { motion } from "motion/react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

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

export default function Hero() {
  const steps = [
    { title: "Local Dev", desc: "Next.js & Tailwind" },
    { title: "Push to GH", desc: "Git commit & push" },
    { title: "GH Actions", desc: "Cloud Deployment" },
  ];

  return (
    <section
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans min-h-[80vh] flex flex-col justify-center px-8 md:px-16 relative overflow-hidden py-8`}
    >
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
          <span className="font-mono text-xs tracking-[0.25em] text-lime-400 uppercase">
            System Initialized // {new Date().toLocaleDateString()}
          </span>
        </div>

        <h1 className="font-(family-name:--font-display) text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 uppercase">
          Building Modern <br />{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Full-Stack
          </span>{" "}
          Web Apps.
        </h1>

        <p className="text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed mb-8 font-normal">
          I&apos;m a <span className="text-white font-medium">Full-Stack Developer</span>{" "}
          with hands-on{" "}
          <span className="text-white font-medium">cloud infrastructure</span>{" "}
          experience. I build reliable web applications and automated{" "}
          <span className="text-white font-medium">CI/CD pipelines</span>—bridging
          clean code with scalable cloud deployments across{" "}
          <span className="text-white font-medium">AWS</span> and{" "}
          <span className="text-white font-medium">DigitalOcean</span>.
        </p>

        <div className="max-w-xl p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
            <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
              LOGS_04.01
            </span>{" "}
            <span>Deployment_Architecture</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Currently orchestrating containerized{" "}
            <span className="text-white/80 font-medium">Next.js and Node.js</span>{" "}
            environments where GitHub Actions trigger automated builds,
            syncing production releases with live cloud resources.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-xl">
          <Link
            href="/resume"
            className="font-mono cursor-pointer px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-emerald-400/40 transition-all backdrop-blur-sm uppercase text-xs tracking-widest text-center flex items-center justify-center gap-2 group"
          >
            View_Resume
            <svg
              className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
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
