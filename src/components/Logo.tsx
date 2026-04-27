import Link from 'next/link'
import { motion } from 'motion/react'

interface LogoProps {
  name: string
}

export default function Logo({ name = "DEEPAK.PUN" }: LogoProps) {
  return (
    <Link href="/">
      <motion.div
        whileHover={{
          scale: 1.05,
          color: "#a3e635"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="font-black text-white tracking-tighter text-xl cursor-pointer"
      >
        {name}
      </motion.div>
    </Link>
  )
}
