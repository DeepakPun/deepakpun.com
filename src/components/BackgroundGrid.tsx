"use client"
import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react"

export default function BackgroundGrid() {
  // 1. Raw motion values for mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 2. Smooth them out with spring physics
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  // 3. Create the mask template
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${smoothX}px ${smoothY}px, black, transparent)`

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
      {/* Base Grid (Dim) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Spotlight Grid (Revealed by Mask) */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />

      {/* Glow Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500 blur-[120px] rounded-full" />
      </div>

      {/* Grain Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[url('https://vercel.app')]" />
    </div>
  )
}
