import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BackgroundGrid from "@/components/BackgroundGrid"

const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Deepak Pun",
  description: "MERN, Flask, NextJS developer and open-source enthusiast.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* 
          CREDITS: 
          Favicon: Initial monogram generated via Favicon.io 
          Tech Icons: Font Awesome (Free License), Simple Icons, React Icons
        */}
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} h-screen overflow-hidden flex flex-col bg-[#020617]`}
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