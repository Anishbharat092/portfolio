'use client'

import { motion } from 'framer-motion'

export default function Interactive3DBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0A0A0C]">
      {/* Radial Gradient Glows */}
      <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 h-[350px] w-[350px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

      {/* Perspective 3D Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 80%)',
        }}
      />

      {/* Animated 3D Floating Cyber Objects in Right Area */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:block w-[450px] h-[450px] pointer-events-none">
        
        {/* Outer Rotating Wireframe Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-purple-500/30 border-dashed"
        />

        {/* Inner Counter-Rotating Hexagon */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-12 rounded-3xl border border-indigo-400/20"
        />

        {/* Central Floating Glowing Core */}
        <motion.div
          animate={{ y: [-15, 15, -15], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-2xl bg-gradient-to-tr from-purple-900/40 via-indigo-900/30 to-purple-500/20 border border-purple-400/40 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.25)] flex items-center justify-center"
        >
          <div className="h-20 w-20 rounded-xl border border-purple-300/40 bg-purple-500/10 rotate-45 flex items-center justify-center">
            <div className="h-8 w-8 rounded-md bg-purple-400/60 blur-[2px]" />
          </div>
        </motion.div>

        {/* Floating Node Badges */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-10 left-6 rounded-lg border border-purple-500/30 bg-zinc-900/80 px-3 py-1.5 text-[10px] font-mono text-purple-300 backdrop-blur-md shadow-lg"
        >
          REST API :: 200 OK
        </motion.div>

        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-12 right-6 rounded-lg border border-indigo-500/30 bg-zinc-900/80 px-3 py-1.5 text-[10px] font-mono text-indigo-300 backdrop-blur-md shadow-lg"
        >
          JWT AUTH_VALIDATED
        </motion.div>
      </div>

    </div>
  )
}