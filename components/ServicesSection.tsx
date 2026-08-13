'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Cursor3DCanvas from './ui/Cursor3DCanvas'
import ScrollTextReveal from './ui/ScrollTextReveal'

const services = [
  {
    num: '01',
    title: 'Backend System Architecture',
    body: 'Designing resilient RESTful microservices, custom Express/NestJS endpoints, and optimized database schemas built for scalability.',
    tags: ['Node.js', 'NestJS', 'Express', 'MongoDB'],
  },
  {
    num: '02',
    title: 'Full-Stack Web Applications',
    body: 'Delivering fast, responsive web applications using Next.js, React, Node.js, and MongoDB with clean client-server boundaries.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    num: '03',
    title: 'Authentication & Security',
    body: 'Implementing secure OAuth 2.0 (Google/LinkedIn), JWT tokens, RBAC permission tiers, and zero-data-loss wizard state persistence.',
    tags: ['OAuth 2.0', 'JWT', 'RBAC', 'Cybersecurity'],
  },
  {
    num: '04',
    title: 'API Performance Optimization',
    body: 'Profiling backend bottlenecks, indexing database queries, and implementing rate-limiting layers to cut response times by up to 30%.',
    tags: ['Query Optimization', 'Rate Limiting', 'Profiling'],
  },
  {
    num: '05',
    title: 'Frontend Engineering & UI Refactoring',
    body: 'Converting legacy Bootstrap structures into modular, component-driven Tailwind CSS systems.',
    tags: ['Tailwind CSS', 'Framer Motion', 'UI Refactoring'],
  },
]

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Individual scroll progress for each service card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })

  // 3D Spatial Unfolding Physics
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 1])

  return (
    <div ref={cardRef} style={{ perspective: '1000px' }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: 'preserve-3d',
        }}
        className="group p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#121216]/90 backdrop-blur-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-colors duration-500 hover:border-purple-500/50 hover:bg-[#16161c]/95 hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)]"
      >
        {/* Number & Title */}
        <div className="md:w-6/12 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/15 px-2.5 py-1 rounded-md border border-purple-500/30">
              {s.num}
            </span>
            <h3 className="text-2xl sm:text-3xl font-medium text-white group-hover:text-purple-200 transition-colors">
              {s.title}
            </h3>
          </div>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {s.tags.map((tag) => (
              <span 
                key={tag}
                className="text-xs font-mono rounded-lg border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-zinc-300 transition-colors group-hover:border-purple-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Word-by-Word Reveal Body */}
        <div className="md:w-5/12">
          <ScrollTextReveal 
            text={s.body}
            className="text-base sm:text-lg font-light text-zinc-300 leading-relaxed"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative px-6 py-28 sm:px-10 md:px-16 bg-[#08080A] text-zinc-100 overflow-hidden min-h-screen flex items-center"
    >
      {/* Dynamic 3D Cursor Canvas */}
      <Cursor3DCanvas />

      {/* Tech Background Ambient Lighting & Cyber Mesh */}
      <div className="absolute top-1/3 right-10 h-[500px] w-[500px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 h-[400px] w-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl w-full space-y-16">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono tracking-[0.25em] text-purple-400 font-semibold uppercase">
            WHAT I OFFER
          </span>
          <h2 className="text-4xl font-light tracking-tight text-white sm:text-6xl font-sans">
            Engineering <span className="font-semibold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Services</span>
          </h2>
        </motion.div>

        {/* 3D Spatial Service Cards */}
        <div className="space-y-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}