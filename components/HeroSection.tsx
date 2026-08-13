'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Shield, Cpu, ArrowUpRight, Code2 } from 'lucide-react'
import { useContact } from '@/components/ContactProvider'
import CodeTerminal3D from './ui/CodeTerminal3D'

export default function HeroSection() {
  const { openContact } = useContact()

  // Mouse tracking for dynamic interactive 3D parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden bg-[#060608] px-6 pt-36 pb-20 text-zinc-100 sm:px-12 md:px-20 flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      
      {/* 1. MOUSE-FOLLOWING AMBIENT GLOW */}
      <motion.div 
        animate={{
          x: mousePos.x * 40,
          y: mousePos.y * 40,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 180 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-purple-900/30 via-indigo-900/20 to-cyan-900/10 blur-[150px] pointer-events-none" 
      />

      {/* 2. PARALLAX PERSPECTIVE GRID */}
      <motion.div 
        animate={{
          x: mousePos.x * -15,
          y: mousePos.y * -15,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" 
      />

      {/* 3. MAIN CONTENT LAYOUT GRID */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Content & CTAs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono text-purple-300 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            FULL-STACK SOFTWARE ENGINEER
          </motion.div>

          {/* Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-light tracking-tight text-zinc-100 sm:text-6xl md:text-7xl font-sans leading-tight">
              Hi, I&apos;m <span className="font-semibold bg-gradient-to-r from-white via-zinc-100 to-purple-300 bg-clip-text text-transparent">Anish Bharat</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
              I build resilient backend architecture, multi-state workflow systems, and production REST APIs with a heavy focus on performance and clean code.
            </p>
          </motion.div>

          {/* Tech Focus Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Terminal, label: 'Node.js / Express / NestJS' },
              { icon: Cpu, label: 'Distributed Systems' },
              { icon: Code2, label: 'TypeScript & Next.js' },
              { icon: Shield, label: 'Cybersecurity & Auth' },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#121216]/80 px-3.5 py-2 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-inner transition-colors hover:border-purple-500/30"
              >
                <item.icon className="h-3.5 w-3.5 text-purple-400" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 pt-2"
          >
            <button
              onClick={openContact}
              className="group relative flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/80 px-7 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-purple-500/40 hover:text-white backdrop-blur-md"
            >
              View Projects
            </a>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Interactive 3D System Terminal (Tilted Parallax) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateX: mousePos.y * -10,
            rotateY: mousePos.x * 10,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="lg:col-span-5 relative hidden lg:flex justify-center"
        >
          <CodeTerminal3D />
        </motion.div>

      </div>
    </section>
  )
}