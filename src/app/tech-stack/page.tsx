"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaAws, FaServer } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithubactions,
  SiDocker,
  SiEjs,
  SiJavascript,
  SiBulma,
  SiBootstrap,
  SiPostman,
  SiLinux,
  SiNginx,
  SiGit,
} from "react-icons/si";
import { JetBrains_Mono } from "next/font/google";
import { resumeData } from "@/constants/resumeData";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ICON_MAP: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  Tailwind: SiTailwindcss,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Bulma: SiBulma,
  Bootstrap: SiBootstrap,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "REST API": SiPostman,
  EJS: SiEjs,
  MongoDB: SiMongodb,
  AWS: FaAws,
  "GH Actions": SiGithubactions,
  Docker: SiDocker,
  "Docker Compose": SiDocker,
  "Linux CLI": SiLinux,
  Nginx: SiNginx,
  "Git / GitHub": SiGit,
};

const categories = [
  {
    title: "FRONTEND",
    skills: resumeData.skills.frontend,
  },
  {
    title: "BACKEND",
    skills: resumeData.skills.backend,
  },
  {
    title: "OPS & DATA",
    skills: resumeData.skills.opsAndData,
  },
];

export default function TechStack() {
  return (
    <div
      className={`${jetBrainsMono.className} min-h-full w-full p-6 md:p-12 lg:p-16 flex flex-col justify-start md:justify-center py-24 antialiased`}
    >
      <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
        SYSTEM_STACK
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6"
          >
            <h3 className="text-xs font-bold tracking-[0.3em] text-teal-400 uppercase border-b border-white/10 pb-1">
              {cat.title}
            </h3>

            <div className="grid gap-3 mt-0.5">
              {cat.skills.map((skillName) => {
                const IconComponent = ICON_MAP[skillName] || FaServer;
                return (
                  <div
                    key={skillName}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-teal-400/50 transition-colors group cursor-default"
                  >
                    <IconComponent className="text-xl text-teal-400 group-hover:text-white transition-colors shrink-0" />
                    <span className="text-xs font-bold text-white uppercase tracking-[0.18em] leading-none">
                      {skillName}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
