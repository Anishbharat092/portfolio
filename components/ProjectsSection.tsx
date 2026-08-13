'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'motion/react'
import SourceButton from './ui/SourceButton'
import Cursor3DCanvas from './ui/Cursor3DCanvas'
import ScrollTextReveal from './ui/ScrollTextReveal'

interface Project {
  index: string
  title: string
  category: string
  stack: string[]
  features: string
}

const projects: Project[] = [
  {
    index: '01',
    title: 'Whisprai',
    category: 'Full-Stack & AI Integration',
    stack: ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    features:
      'Built a full-stack platform with custom REST APIs and JWT auth. Optimized backend query execution and payload structures, cutting API response time by 30%.',
  },
  {
    index: '02',
    title: 'Swift Book',
    category: 'Full-Stack Booking Engine',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features:
      'Engineered listing management REST APIs, user authentication, and schema designs to handle property bookings efficiently.',
  },
  {
    index: '03',
    title: 'Amazon Clone',
    category: 'Frontend UI Engineering',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)'],
    features:
      'Built a responsive e-commerce web interface with dynamic client-side filtering and an interactive shopping cart system.',
  },
]

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)

  // Track card viewport scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Measure global scroll speed and direction for momentum tilt
  const scrollVelocity = useVelocity(scrollYProgress)
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 180, damping: 24 })

  // 1. Stack Scale (Shrinks as next cards stack over it)
  const targetScale = 1 - (total - 1 - index) * 0.04
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [0.92, 1, targetScale])

  // 2. 3D Unfolding Tilt (Tilts 16deg back on entry, levels flat, and reacts to scroll speed)
  const entryRotateX = useTransform(scrollYProgress, [0, 0.7], [16, 0])
  const velocityRotateX = useTransform(smoothVelocity, [-1, 1], [6, -8])

  // 3. Z-Plane Depth Push (Pushes back -80px into screen on entry)
  const zDepth = useTransform(scrollYProgress, [0, 0.7], [-80, 0])

  // 4. Dynamic Specular Light Glare
  const sheenX = useTransform(scrollYProgress, [0, 1], ['-100%', '200%'])

  // 5. Card Opacity Ramp
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.4, 1, 1, 0.85])

  return (
    <div ref={ref} className="sticky top-24 md:top-32" style={{ perspective: '1200px' }}>
      <motion.article
        style={{
          scale,
          rotateX: entryRotateX,
          z: zDepth,
          opacity: cardOpacity,
          top: `${index * 1.75}rem`,
          transformStyle: 'preserve-3d',
        }}
        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-[#121216]/90 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.85)] space-y-8 transition-colors duration-500 hover:border-purple-500/50 hover:shadow-[0_30px_70px_rgba(168,85,247,0.18)]"
      >
        {/* Dynamic Light Sheen Glare (Sweeps across card on scroll) */}
        <motion.div
          style={{ x: sheenX }}
          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        />

        {/* Ambient Corner Glow */}
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        {/* Top Row */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/15 text-xs font-mono font-bold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              {project.index}
            </span>
            <div>
              <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                {project.category}
              </p>
              <h3 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
          <SourceButton />
        </div>

        {/* Bottom Details Row */}
        <div className="relative z-10 mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-mono tracking-wider text-zinc-500 uppercase">Tech Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-1 text-zinc-300 transition-colors hover:border-purple-500/30 hover:text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono tracking-wider text-zinc-500 uppercase mb-2">Core Features</p>
            {/* Smooth 3D Word Reveal for Core Features */}
            <ScrollTextReveal
              text={project.features}
              className="text-sm sm:text-base font-light leading-relaxed text-zinc-300"
            />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32 overflow-hidden bg-[#08080A] text-zinc-100 min-h-screen"
    >
      {/* 3D Cursor Mesh Background */}
      <Cursor3DCanvas />

      {/* Technical Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[800px] bg-gradient-to-tr from-purple-900/20 via-indigo-900/15 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight text-white/90"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>

        <div className="mt-12 md:mt-16 flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  )
}