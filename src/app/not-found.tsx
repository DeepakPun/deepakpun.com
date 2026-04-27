import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
        <Search className="w-24 h-24 text-red-500 animate-pulse relative z-10" strokeWidth={1.5} />
      </div>

      <h2 className="text-9xl font-black text-red-500 mb-4 tracking-tighter">404</h2>

      <p className="text-xl text-slate-600 mb-8 max-w-xs">
        Oops! We looked everywhere but this page doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-600/20"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </div>
  )
}
