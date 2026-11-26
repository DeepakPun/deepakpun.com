import {
  Activity,
  Boxes,
  Cpu,
  FileText,
  Home,
  // LayoutGrid,
  User,
  // BookOpen,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const NAV_LINKS = [
  { name: "/", href: "/", icon: Home },
  { name: "/user/me", href: "/about", icon: User },
  { name: "/api/stack", href: "/tech-stack", icon: Cpu },
  { name: "/v1/cluster", href: "/ecosystem", icon: Boxes },
  { name: "/sys/resume", href: "/resume", icon: FileText },
  { name: "/sys/status", href: "/status", icon: Activity },
  // {
  //   name: "Blog",
  //   href: "https://deepakpun-blog.vercel.app/",
  //   icon: BookOpen,
  //   isExternal: true,
  // },
  // { name: 'Ecosystem1', href: '/projects', icon: LayoutGrid },
];

export const SOCIAL_LINKS = [
  { icon: FaGithub, href: "https://github.com" },
  { icon: FaLinkedin, href: "https://linkedin.com" },
];
