// eslint-disable-next-line
import { motion } from 'framer-motion'

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-tighter">
            Frontend UI: Connected to PM-API v1.0
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Master Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">Workflow.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          A high-performance <span className="text-white font-medium">React interface</span> specifically engineered to consume and visualize the <span className="text-white font-medium">Project Management API.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            href='http://localhost:3001/'
            target='_blank'
          >
            Explore Documentation
          </a>
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
            View GitHub Repository
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-500 font-mono text-sm border-t border-slate-800/50 pt-8">
          <span className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-default">
            <span className="text-blue-400">/</span> React 19
          </span>
          <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-default">
            <span className="text-emerald-400">/</span> Node 24
          </span>
          <span className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-default">
            <span className="text-blue-400">/</span> MongoDB Atlas
          </span>
          <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-default">
            <span className="text-emerald-400">/</span> AWS EC2
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 max-w-5xl w-full border-t border-slate-800 pt-12">

        <div className="space-y-2 group">
          <div className="text-blue-400 font-mono text-xs mb-1 uppercase">service_1</div>
          <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
            Independent UI Service
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            A stateless React 19 interface. It is architecturally agnostic,
            communicating with the backend strictly via secured REST endpoints.
          </p>
        </div>

        <div className="space-y-2 group">
          <div className="text-emerald-400 font-mono text-xs mb-1 uppercase">service_2</div>
          <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
            Decoupled API Logic
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            The Node/Express core operates as a standalone resource provider.
            It functions independently of the UI, ready for multi-platform consumption.
          </p>
        </div>

        <div className="space-y-2 group">
          <div className="text-purple-400 font-mono text-xs mb-1">INFRASTRUCTURE</div>
          <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">
            Containerized Orchestration
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Docker-managed environments ensure each service remains isolated.
            Independent deployments with zero cross-service dependency.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Landing

