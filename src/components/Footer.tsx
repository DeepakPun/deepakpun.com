export default function Footer() {
  const currentYear = new Date().getFullYear()
  const techs = ["Next.js", "Tailwind", "Motion"]

  return (
    <footer className="w-full py-6 px-8 bg-gradient-devops flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 shrink-0 relative z-20">
      <div className="text-white font-medium text-sm">
        DEEPAK.PUN
        <span className="mx-2 opacity-50">|</span>
        <span
          className="tracking-wider opacity-80"
          suppressHydrationWarning
        >
          © {currentYear}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {techs.map((tech) => (
          <span key={tech} className="px-3 py-1 text-[10px] uppercase tracking-widest text-white/90 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
            {tech}
          </span>
        ))}
      </div>
    </footer>
  )
}
