// eslint-disable-next-line
import { motion } from 'framer-motion'

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <span className="text-blue-400 font-mono tracking-widest uppercase text-sm mb-4 block">
          Deploying in Q1 2026
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Master Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">Workflow.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10">
          The next-generation project management tool built for
          <strong> infinite scalability</strong> and <strong>seamless collaboration.</strong>
        </p>

        {/* <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-80 p-4 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 transition-all"
          />
          <button className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
            Join Waitlist
          </button>
        </form> */}

        {/* <p className="text-slate-500 text-sm mt-4 italic">No credit card required. Only pure productivity.</p> */}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center opacity-70">
        <div>
          <h3 className="font-bold text-white">CI/CD Ready</h3>
          <p className="text-sm">Automated AWS deployment triggers.</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Real-time Sync</h3>
          <p className="text-sm">MERN-powered collaborative engine.</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Decoupled Architecture</h3>
          <p className="text-sm">Each services work together yet, independent of one another.</p>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
