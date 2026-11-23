import type { Metadata } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BackgroundGrid from "@/components/BackgroundGrid"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Deepak Pun | Full-Stack Developer & Cloud Engineer",
  description:
    "Full-Stack Developer and Cloud Engineer building modern web applications and automated CI/CD pipelines across AWS and DigitalOcean.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${inter.className} font-sans h-screen overflow-hidden flex flex-col bg-[#020617]`}
      >
        <BackgroundGrid />
        <Navbar />
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
          <Sidebar />
          <main className="flex-1 overflow-hidden relative">
            <div className="h-full overflow-y-auto no-scrollbar relative">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
