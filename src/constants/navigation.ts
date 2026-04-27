import {
  // Boxes,
  Cpu,
  Home,
  // LayoutGrid,
  User
}
  from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Tech Stack', href: '/tech-stack', icon: Cpu },
  // { name: 'Projects', href: '/projects', icon: Boxes },
  // { name: 'Projects', href: '/projects', icon: LayoutGrid },
]

export const SOCIAL_LINKS = [
  { icon: FaGithub, href: 'https://github.com' },
  { icon: FaLinkedin, href: 'https://linkedin.com' },
]
