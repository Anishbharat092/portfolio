'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Terminal, Cpu, Database, Server } from 'lucide-react'
import ContactButton from './ui/ContactButton'
import Cursor3DCanvas from './ui/Cursor3DCanvas'
import ScrollTextReveal from './ui/ScrollTextReveal'

export default function AboutSection() {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Scroll Physics for the Container Card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })

  // Perspective Unfolding Physics
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1])
  const glowOpacity = useTransform(scrollYProgress, [0.5, 1], [0.1, 0.4])

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28 sm:px-10 md:px-16 overflow-hidden bg-[#0A0A0C] text-zinc-100"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Cursor Background */}
      <Cursor3DCanvas />

      {/* Technical Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[800px] bg-gradient-to-tr from-purple-900/25 via-indigo-900/20 to-cyan-900/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl w-full text-center space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-4xl font-light tracking-tight text-white sm:text-6xl md:text-7xl font-sans">
            About <span className="font-semibold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Me</span>
          </h2>
        </motion.div>

        {/* 3D Spatial Unfolding Glass Card */}
        <div ref={cardRef}>
          <motion.div
            style={{
              rotateX,
              scale,
              opacity,
              transformStyle: 'preserve-3d',
            }}
            className="group relative rounded-3xl border border-white/20 bg-[#121216]/90 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] space-y-8 text-left overflow-hidden transition-colors duration-500 hover:border-purple-500/50"
          >
            {/* Dynamic Ambient Corner Glow */}
            <motion.div 
              style={{ opacity: glowOpacity }}
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple-500/30 blur-3xl pointer-events-none" 
            />

            {/* Word-by-Word Scroll Reveals */}
            <div className="space-y-6 relative z-10">
              <ScrollTextReveal
                text="I am a Backend and Full-Stack Software Engineer focused on reliable backend systems, containerized workflows, and applied AI integration. I engineer production REST APIs, complex multi-state workflows, and secure authentication systems built for scale."
                className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-zinc-100"
              />

              <ScrollTextReveal
                text="Working primarily across Node.js, NestJS, TypeScript, React, and MongoDB, I architect asynchronous task pipelines with Redis and BullMQ, containerize services using Docker, and build robust GenAI API integrations with zero data loss."
                className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-zinc-300"
              />
            </div>

            {/* Technical Capability Grid */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-xs sm:text-sm font-mono text-zinc-300 relative z-10">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-sm group-hover:border-purple-500/20 transition-colors">
                <Server className="h-4 w-4 text-purple-400" />
                <span>Backend Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-sm group-hover:border-emerald-500/20 transition-colors">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span>Docker & CI/CD</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-sm group-hover:border-indigo-500/20 transition-colors">
                <Cpu className="h-4 w-4 text-indigo-400" />
                <span>Async Queues & LLM APIs</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-sm group-hover:border-cyan-500/20 transition-colors">
                <Database className="h-4 w-4 text-cyan-400" />
                <span>MongoDB & Redis</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-2 flex justify-center"
        >
          <ContactButton label="Let's build together" />
        </motion.div>

      </div>
    </section>
  )
}