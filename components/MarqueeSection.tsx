'use client'

import { useEffect, useRef } from 'react'
import {
  Server,
  Boxes,
  FileCode2,
  Palette,
  Hexagon,
  Route,
  Database,
  ShieldCheck,
  Gauge,
  Container,
  GitBranch,
  Braces,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Cursor3DCanvas from './ui/Cursor3DCanvas'

interface Tech {
  name: string
  detail: string
  Icon: LucideIcon
  color: string
  glowColor: string
}

const rowOne: Tech[] = [
  { name: 'React.js', detail: 'Component UI', Icon: Hexagon, color: 'text-cyan-400', glowColor: 'hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]' },
  { name: 'Next.js', detail: 'Full-Stack Framework', Icon: Braces, color: 'text-zinc-100', glowColor: 'hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]' },
  { name: 'TypeScript', detail: 'Typed JavaScript', Icon: FileCode2, color: 'text-blue-400', glowColor: 'hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(96,165,250,0.15)]' },
  { name: 'Tailwind CSS', detail: 'Utility Styling', Icon: Palette, color: 'text-sky-400', glowColor: 'hover:border-sky-500/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]' },
  { name: 'Node.js', detail: 'Runtime', Icon: Server, color: 'text-emerald-400', glowColor: 'hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]' },
  { name: 'Express.js', detail: 'REST Layer', Icon: Route, color: 'text-purple-400', glowColor: 'hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(192,132,252,0.15)]' },
]

const rowTwo: Tech[] = [
  { name: 'NestJS', detail: 'Scalable Backend', Icon: Boxes, color: 'text-red-400', glowColor: 'hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(248,113,113,0.15)]' },
  { name: 'MongoDB', detail: 'Document Store', Icon: Database, color: 'text-emerald-500', glowColor: 'hover:border-emerald-600/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]' },
  { name: 'RESTful APIs', detail: 'HTTP Interfaces', Icon: Route, color: 'text-purple-400', glowColor: 'hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(192,132,252,0.15)]' },
  { name: 'OAuth 2.0', detail: 'Secure Auth', Icon: ShieldCheck, color: 'text-amber-400', glowColor: 'hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(251,191,36,0.15)]' },
  { name: 'Rate Limiting', detail: 'Throttling Layer', Icon: Gauge, color: 'text-indigo-400', glowColor: 'hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(129,140,248,0.15)]' },
  { name: 'Docker', detail: 'Containerization', Icon: Container, color: 'text-blue-500', glowColor: 'hover:border-blue-600/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]' },
  { name: 'Git / GitHub', detail: 'Version Control', Icon: GitBranch, color: 'text-orange-400', glowColor: 'hover:border-orange-500/40 hover:shadow-[0_0_25px_rgba(251,146,60,0.15)]' },
]

function Tile({ tech }: { tech: Tech }) {
  const { Icon } = tech
  return (
    <div
      className={`group flex h-[180px] w-[280px] sm:h-[220px] sm:w-[340px] md:h-[240px] md:w-[380px] shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-[#121216]/80 p-6 md:p-8 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] ${tech.glowColor}`}
    >
      <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/90 shadow-inner group-hover:scale-110 transition-transform">
        <Icon className={`h-6 w-6 md:h-7 md:w-7 ${tech.color}`} aria-hidden="true" />
      </div>
      <div>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white group-hover:text-purple-200 transition-colors">
          {tech.name}
        </p>
        <p className="mt-1 text-xs md:text-sm font-mono tracking-wider text-zinc-400 uppercase">
          {tech.detail}
        </p>
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowOneRef = useRef<HTMLDivElement>(null)
  const rowTwoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.offsetTop
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      if (rowOneRef.current) {
        rowOneRef.current.style.transform = `translateX(calc(-33.333% + ${offset}px))`
      }
      if (rowTwoRef.current) {
        rowTwoRef.current.style.transform = `translateX(calc(-33.333% - ${offset}px))`
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32 bg-[#08080A] text-zinc-100 border-y border-white/10"
      aria-label="Tech stack"
    >
      {/* Dynamic 3D Cursor Canvas Background */}
      <Cursor3DCanvas />

      {/* Tech Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[900px] bg-gradient-to-r from-purple-900/20 via-indigo-900/15 to-purple-900/20 blur-[150px] pointer-events-none rounded-full" />

      {/* Section Label */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-12 text-center space-y-2">
        <span className="text-xs font-mono tracking-[0.25em] text-purple-400 font-semibold uppercase">
          CORE CAPABILITIES
        </span>
        <h2 className="text-3xl font-light tracking-tight text-white sm:text-5xl font-sans">
          Powered By Modern <span className="font-semibold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Tech Stack</span>
        </h2>
      </div>

      {/* Left/Right Edge Fade Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#08080A] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#08080A] to-transparent z-20 pointer-events-none" />

      {/* Row One - Moves Right on Scroll */}
      <div ref={rowOneRef} className="mb-4 flex w-max gap-4 will-change-transform relative z-10">
        {[...rowOne, ...rowOne, ...rowOne].map((tech, i) => (
          <Tile key={`r1-${i}`} tech={tech} />
        ))}
      </div>

      {/* Row Two - Moves Left on Scroll */}
      <div ref={rowTwoRef} className="flex w-max gap-4 will-change-transform relative z-10">
        {[...rowTwo, ...rowTwo, ...rowTwo].map((tech, i) => (
          <Tile key={`r2-${i}`} tech={tech} />
        ))}
      </div>
    </section>
  )
}